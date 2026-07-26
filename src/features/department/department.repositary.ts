import { PrismaClient } from "@prisma/client";

export class DepartmentRepositary {
  constructor(private readonly prisma: PrismaClient) {}
  async createDepartment(data: any) {
    try {
      return await this.prisma.department.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateDepartment(id: number, data: any) {
    try {
      return await this.prisma.department.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteDepartment(id: number) {
    try {
      return await this.prisma.department.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllDepartments(
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    sortOrder: string,
    filtering: string,
  ) {
    try {
      const skip = (page - 1) * limit;
      const take = limit;
      const where: any = {
        OR: [
          { departmentName: { contains: search, mode: "insensitive" } },
          { departmentUrl: { contains: search, mode: "insensitive" } },
        ],
      };

      if (filtering) {
        where.AND = [
          {
            departmentName: filtering,
          },
        ];
      }

      return await this.prisma.department.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async assignManager(departmentId: number, managerId: string) {
    try {
      return await this.prisma.department.update({
        where: {
          id: departmentId,
        },
        data: {
          managerId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
