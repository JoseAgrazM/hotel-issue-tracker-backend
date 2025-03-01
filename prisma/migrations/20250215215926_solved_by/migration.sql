/*
  Warnings:

  - You are about to drop the column `solvedBy` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `solvedBy`,
    ADD COLUMN `solvedById` VARCHAR(191) NULL,
    ADD COLUMN `solvedByName` VARCHAR(191) NULL;
