/*
  Warnings:

  - A unique constraint covering the columns `[nameRoom,companyId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_nameRoomId_fkey`;

-- DropIndex
DROP INDEX `Post_nameRoomId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Room_nameRoom_key` ON `room`;

-- CreateIndex
CREATE UNIQUE INDEX `Room_nameRoom_companyId_key` ON `Room`(`nameRoom`, `companyId`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_nameRoomId_companyId_fkey` FOREIGN KEY (`nameRoomId`, `companyId`) REFERENCES `Room`(`nameRoom`, `companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
