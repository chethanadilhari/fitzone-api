/*
  Warnings:

  - You are about to drop the column `content` on the `replies` table. All the data in the column will be lost.
  - Added the required column `message` to the `replies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `replies` DROP COLUMN `content`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL;
