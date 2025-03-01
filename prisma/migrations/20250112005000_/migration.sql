-- DropForeignKey
ALTER TABLE `company` DROP FOREIGN KEY `Company_superAdminId_fkey`;

-- DropIndex
DROP INDEX `Company_superAdminId_fkey` ON `company`;

-- AlterTable
ALTER TABLE `company` MODIFY `superAdminId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_superAdminId_fkey` FOREIGN KEY (`superAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
