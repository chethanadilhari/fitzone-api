/*
  Warnings:

  - You are about to drop the column `expired_at` on the `memberships` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `memberships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `memberships` DROP COLUMN `expired_at`,
    DROP COLUMN `started_at`,
    MODIFY `status` ENUM('PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED') NOT NULL;
