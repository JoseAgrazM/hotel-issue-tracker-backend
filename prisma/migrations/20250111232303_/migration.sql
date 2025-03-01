/*
  Warnings:

  - You are about to drop the column `solvetAt` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `solvetAt`,
    ADD COLUMN `solvedAt` DATETIME(3) NULL;
