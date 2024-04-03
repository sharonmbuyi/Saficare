

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running on 3001");
});



// const server = http.createServer(app);
// const io = socketIo(server);


// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("send_message", (data) => {
//     console.log("Received message:", data);
//     io.emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });









const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// Route pour l'inscription
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    // Générer un token JWT
    const token = jwt.sign(
      { userId: newUser.id, userEmail: newUser.email },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    // Renvoyer une réponse avec le token
    res.status(201).json({ message: 'Inscription réussie', token });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription' });
  }
});

// Route pour la connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Adresse email ou mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    // Renvoyer une réponse avec le token
    res.status(201).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
