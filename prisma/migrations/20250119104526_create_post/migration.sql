/*
  Warnings:

  - You are about to drop the column `name` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameRoom]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namePost` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `name`,
    ADD COLUMN `namePost` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Room_nameRoom_key` ON `Room`(`nameRoom`);
