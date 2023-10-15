/*
  Warnings:

  - You are about to drop the `super_admins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "super_admins" DROP CONSTRAINT "super_admins_username_fkey";

-- DropTable
DROP TABLE "super_admins";
