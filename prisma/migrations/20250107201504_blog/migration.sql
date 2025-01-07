/*
  Warnings:

  - You are about to drop the column `submitted_at` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `blogs` table. All the data in the column will be lost.
  - The values [SUBMITTED] on the enum `blogs_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `description` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `submitted_at`,
    DROP COLUMN `subtitle`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL;
