-- AlterTable
ALTER TABLE `Tasks` ADD COLUMN `localEndDate` VARCHAR(64) NULL,
    ADD COLUMN `localEndHour` INTEGER NULL,
    ADD COLUMN `localStartDate` VARCHAR(64) NULL,
    ADD COLUMN `localStartHour` INTEGER NULL;
