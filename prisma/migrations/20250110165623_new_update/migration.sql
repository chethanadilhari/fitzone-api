-- AlterTable
ALTER TABLE `blogs` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tickets` MODIFY `subject` TEXT NOT NULL,
    MODIFY `message` TEXT NOT NULL;
