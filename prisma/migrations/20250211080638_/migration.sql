/*
  Warnings:

  - You are about to drop the column `roomId` on the `post` table. All the data in the column will be lost.
  - Added the required column `nameRoomId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_roomId_fkey`;

-- DropIndex
DROP INDEX `Post_roomId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `roomId`,
    ADD COLUMN `nameRoomId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_nameRoomId_fkey` FOREIGN KEY (`nameRoomId`) REFERENCES `Room`(`nameRoom`) ON DELETE RESTRICT ON UPDATE CASCADE;
