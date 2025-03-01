/*
  Warnings:

  - Added the required column `typeRoom` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `typeRoom` ENUM('BASIC', 'PREMIUM', 'SUITE') NOT NULL;
