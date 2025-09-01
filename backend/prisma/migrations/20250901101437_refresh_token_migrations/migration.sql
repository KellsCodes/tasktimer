/*
  Warnings:

  - You are about to drop the column `RefreshToken` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshToken]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshToken` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `RefreshToken_RefreshToken_key` ON `RefreshToken`;

-- AlterTable
ALTER TABLE `RefreshToken` DROP COLUMN `RefreshToken`,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RefreshToken_refreshToken_key` ON `RefreshToken`(`refreshToken`);
