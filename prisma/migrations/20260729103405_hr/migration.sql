/*
  Warnings:

  - You are about to drop the `EmployementType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmployementType";

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PRESENT',
    "work_hours" DOUBLE PRECISION DEFAULT 0,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "joining_checklists" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "documents_submitted" BOOLEAN NOT NULL DEFAULT false,
    "bank_details_verified" BOOLEAN NOT NULL DEFAULT false,
    "id_card_issued" BOOLEAN NOT NULL DEFAULT false,
    "asset_assigned" BOOLEAN NOT NULL DEFAULT false,
    "orientation_done" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "joining_checklists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_user_id_date_key" ON "attendance"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "joining_checklists_user_id_key" ON "joining_checklists"("user_id");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "joining_checklists" ADD CONSTRAINT "joining_checklists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
