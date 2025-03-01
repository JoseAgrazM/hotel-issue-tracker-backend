/*
  Warnings:

  - You are about to drop the column `phone` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `phoneCompany` on the `superadmin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `phone`,
    ADD COLUMN `phoneCompany` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `superadmin` DROP COLUMN `phoneCompany`,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL DEFAULT '';
