-- CreateTable
CREATE TABLE "Docteur" (
    "idDoct" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "nomDoc" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Docteur_pkey" PRIMARY KEY ("idDoct")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "idPatient" SERIAL NOT NULL,
    "nomDoc" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("idPatient")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
