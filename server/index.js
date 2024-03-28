// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   })

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// server.listen(3001, () => {
//   console.log("server running on 3001");
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

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await prisma.user.findUnique({ 
      where: { 
        email:email, 
        password:password, 
      } });
    if (!user) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe existant' });
    }

    // Vérifier si le mot de passe est correct
    if (!password) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    // Générer le jeton JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        userEmail: user.email
      }, 'your-secret-key', { expiresIn: '1h' });

    // Renvoyer le jeton JWT
    res.status(200).json({ error: 'connexion reussie', token: token });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion' });
  }
});



app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Créer l'utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        email,
        password
      },
    });

    // Renvoyer une réponse avec les données de l'utilisateur créé
    res.json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création du compte:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du compte' });
  }
});




app.listen(3001, () => {
  console.log('Serveur à l\'écoute sur le port 3001');
});
