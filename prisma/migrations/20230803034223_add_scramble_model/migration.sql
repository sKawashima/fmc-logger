-- CreateTable
CREATE TABLE "Scramble" (
    "id" SERIAL NOT NULL,
    "scramble" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scramble_pkey" PRIMARY KEY ("id")
);
