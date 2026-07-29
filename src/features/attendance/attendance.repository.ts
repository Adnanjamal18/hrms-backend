import type { PrismaClient } from "@prisma/client";

export class AttendanceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getTodayAttendance(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.prisma.attendance.findFirst({
      where: { userId, date: today },
    });
  }

  async checkIn(userId: string, notes?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const now = new Date();
    const status = now.getHours() >= 10 ? "LATE" : "PRESENT";

    return await this.prisma.attendance.create({
      data: {
        userId,
        date: today,
        checkIn: now,
        status,
        notes: notes || null,
      },
    });
  }

  async checkOut(userId: string) {
    const existing = await this.getTodayAttendance(userId);
    if (!existing) throw new Error("No check-in record found today");
    if (existing.checkOut) throw new Error("Already checked out today");

    const now = new Date();
    const workHours =
      (now.getTime() - new Date(existing.checkIn).getTime()) /
      (1000 * 60 * 60);

    return await this.prisma.attendance.update({
      where: { id: existing.id },
      data: {
        checkOut: now,
        workHours: Number(workHours.toFixed(2)),
      },
    });
  }

  async getAttendanceHistory(userId?: string) {
    return await this.prisma.attendance.findMany({
      where: userId ? { userId } : {},
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAttendanceReport(userId?: string) {
    const records = await this.getAttendanceHistory(userId);
    return {
      totalDaysWorked: records.length,
      records,
    };
  }
}
