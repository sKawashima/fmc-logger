/*
  Warnings:

  - A unique constraint covering the columns `[idForShow]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idForShow" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_idForShow_key" ON "User"("idForShow");
