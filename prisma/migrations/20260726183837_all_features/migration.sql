/*
  Warnings:

  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "department_users" DROP CONSTRAINT "department_users_department_id_fkey";

-- DropForeignKey
ALTER TABLE "department_users" DROP CONSTRAINT "department_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_designation_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_employment_type_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_user_id_fkey";

-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "manager_id" TEXT;

-- DropTable
DROP TABLE "employee";

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_users" ADD CONSTRAINT "department_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_users" ADD CONSTRAINT "department_users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
