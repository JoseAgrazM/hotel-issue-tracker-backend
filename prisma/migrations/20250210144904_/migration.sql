/*
  Warnings:

  - You are about to alter the column `roomId` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_roomId_fkey`;

-- DropIndex
DROP INDEX `Post_roomId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `roomId` INTEGER NOT NULL,
    MODIFY `postStatus` ENUM('PENDING', 'URGENT', 'PROCESS', 'DONE') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `superadmin` MODIFY `role` ENUM('SUPERADMIN', 'RECEPTION', 'MAINTENANCE', 'CLEANING') NOT NULL DEFAULT 'SUPERADMIN';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SUPERADMIN', 'RECEPTION', 'MAINTENANCE', 'CLEANING') NOT NULL DEFAULT 'MAINTENANCE';

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
