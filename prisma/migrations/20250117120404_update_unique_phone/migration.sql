/*
  Warnings:

  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneCompany]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameRoom` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyId` on table `room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_companyId_fkey`;

-- DropIndex
DROP INDEX `Post_roomId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Room_companyId_fkey` ON `room`;

-- AlterTable
ALTER TABLE `post` MODIFY `roomId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    ADD COLUMN `nameRoom` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `companyId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Company_phoneCompany_key` ON `Company`(`phoneCompany`);

-- CreateIndex
CREATE UNIQUE INDEX `SuperAdmin_phone_key` ON `SuperAdmin`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `User`(`phone`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
