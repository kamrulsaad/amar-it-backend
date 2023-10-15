/*
  Warnings:

  - The primary key for the `permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `permissions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_permissionId_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
