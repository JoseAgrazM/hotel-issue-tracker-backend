/*
  Warnings:

  - The values [ADMIN] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `athorName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `athorName` VARCHAR(191) NOT NULL,
    ADD COLUMN `postStatus` ENUM('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `superadmin` MODIFY `role` ENUM('SUPERADMIN', 'RECEPTION', 'MAINTENANCE') NOT NULL DEFAULT 'SUPERADMIN';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SUPERADMIN', 'RECEPTION', 'MAINTENANCE') NOT NULL DEFAULT 'MAINTENANCE';
