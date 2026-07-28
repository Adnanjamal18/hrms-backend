import type { PrismaClient } from "@prisma/client";

export class ChecklistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getChecklistByUserId(userId: string) {
    const checklist = await this.prisma.joiningChecklist.findUnique({
      where: { userId },
    });

    if (!checklist) {
      return await this.prisma.joiningChecklist.create({
        data: { userId },
      });
    }

    return checklist;
  }

  async updateChecklist(userId: string, data: any) {
    await this.getChecklistByUserId(userId);

    return await this.prisma.joiningChecklist.update({
      where: { userId },
      data,
    });
  }

  async getAllChecklists() {
    return await this.prisma.joiningChecklist.findMany({
      include: {
        user: true,
      },
    });
  }
}
