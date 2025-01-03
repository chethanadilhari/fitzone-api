/*
  Warnings:

  - You are about to drop the column `Nutrition_consultaions` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `personal_traing_count` on the `packages` table. All the data in the column will be lost.
  - Added the required column `nutrition_consultaions` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personal_training_count` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packages` DROP COLUMN `Nutrition_consultaions`,
    DROP COLUMN `personal_traing_count`,
    ADD COLUMN `nutrition_consultaions` INTEGER NOT NULL,
    ADD COLUMN `personal_training_count` INTEGER NOT NULL;
