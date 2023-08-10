/*
  Warnings:

  - You are about to drop the column `idForShow` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[showId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_idForShow_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idForShow",
ADD COLUMN     "showId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_showId_key" ON "User"("showId");
