import type { AttendanceRepository } from "./attendance.repository.js";

export class AttendanceService {
  constructor(private readonly repository: AttendanceRepository) {}

  async checkIn(userId: string, notes?: string) {
    const todayRecord = await this.repository.getTodayAttendance(userId);
    if (todayRecord) {
      throw new Error("Already checked in today");
    }
    return await this.repository.checkIn(userId, notes);
  }

  async checkOut(userId: string) {
    return await this.repository.checkOut(userId);
  }

  async getTodayStatus(userId: string) {
    const record = await this.repository.getTodayAttendance(userId);
    return {
      isCheckedIn: !!record,
      isCheckedOut: !!record?.checkOut,
      record,
    };
  }

  async getHistory(userId?: string) {
    return await this.repository.getAttendanceHistory(userId);
  }

  async getReport(userId?: string) {
    return await this.repository.getAttendanceReport(userId);
  }
}
