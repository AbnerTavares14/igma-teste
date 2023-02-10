/*
  Warnings:

  - Changed the type of `birthdate` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "birthdate",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
