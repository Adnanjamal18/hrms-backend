import type { PrismaClient } from "@prisma/client";

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createEmployee(data: any) {
    try {
      const { username, fullName, email, password, mobile, roleId } = data;
      const user = await this.prisma.user.create({
        data: {
          username,
          fullName,
          email,
          password,
          mobile,
          roleId,
        },
      });
      return {
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(userId: string, data: any) {
    try {
      const updated = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(userId: string) {
    try {
      const deleted = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(userId: string) {
    try {
      const find = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          role: true,
          departments: {
            include: {
              department: true,
            },
          },
        },
      });
      return find;
    } catch (error) {
      throw error;
    }
  }

  async getAllEmployees() {
    try {
      const findAll = await this.prisma.user.findMany({
        include: {
          role: true,
          departments: {
            include: {
              department: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return findAll;
    } catch (error) {
      throw error;
    }
  }

  async assignDepartment(userId: string, departmentId: number) {
    try {
      const existing = await this.prisma.departmentUser.findFirst({
        where: {
          userId,
          departmentId,
        },
      });

      if (existing) {
        return existing;
      }

      const assigned = await this.prisma.departmentUser.create({
        data: {
          userId,
          departmentId,
        },
      });
      return assigned;
    } catch (error) {
      throw error;
    }
  }
}
