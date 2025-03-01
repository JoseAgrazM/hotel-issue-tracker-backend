/*
  Warnings:

  - Made the column `phone` on table `superadmin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `superadmin` MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '';
