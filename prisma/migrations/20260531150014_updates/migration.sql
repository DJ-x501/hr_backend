/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminID]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `SuperAdmmin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `SuperAdmmin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminID` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ORGANIZATION', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "adminID" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ORGANIZATION';

-- AlterTable
ALTER TABLE "SuperAdmmin" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SUPERADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_contact_key" ON "Employee"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_contact_key" ON "Organization"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_adminID_key" ON "Organization"("adminID");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmmin_email_key" ON "SuperAdmmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmmin_contact_key" ON "SuperAdmmin"("contact");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "SuperAdmmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
