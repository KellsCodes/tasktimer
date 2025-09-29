/*
  Warnings:

  - You are about to alter the column `googleId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(191)`.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `googleId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_googleId_key` ON `User`(`googleId`);
