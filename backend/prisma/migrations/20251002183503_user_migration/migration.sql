/*
  Warnings:

  - You are about to drop the column `localEndDate` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `localEndHour` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `localStartDate` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `localStartHour` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Profile` MODIFY `firstname` VARCHAR(50) NULL,
    MODIFY `lastname` VARCHAR(50) NULL,
    MODIFY `profession` VARCHAR(100) NULL,
    MODIFY `profileImage` VARCHAR(256) NULL;

-- AlterTable
ALTER TABLE `Tasks` DROP COLUMN `localEndDate`,
    DROP COLUMN `localEndHour`,
    DROP COLUMN `localStartDate`,
    DROP COLUMN `localStartHour`;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(50) NULL;
