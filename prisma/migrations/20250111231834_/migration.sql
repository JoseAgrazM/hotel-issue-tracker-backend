/*
  Warnings:

  - You are about to drop the column `role` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `superadmin` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `surname` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_companyId_fkey`;

-- DropIndex
DROP INDEX `Post_authorAdminId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Room_companyId_fkey` ON `room`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `role`,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `post` MODIFY `authorAdminId` VARCHAR(191) NULL,
    MODIFY `authorId` VARCHAR(191) NULL,
    MODIFY `solvetAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `room` MODIFY `companyId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `superadmin` DROP COLUMN `lastName`,
    ADD COLUMN `surname` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `lastName`,
    ADD COLUMN `surname` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorAdminId_fkey` FOREIGN KEY (`authorAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
