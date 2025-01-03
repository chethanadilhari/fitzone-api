/*
  Warnings:

  - You are about to drop the column `nutrition_consultaions` on the `packages` table. All the data in the column will be lost.
  - Added the required column `nutrition_consultations` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packages` DROP COLUMN `nutrition_consultaions`,
    ADD COLUMN `nutrition_consultations` INTEGER NOT NULL;
