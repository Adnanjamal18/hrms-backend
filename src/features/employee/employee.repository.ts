import type { PrismaClient } from "@prisma/client";

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createEmployee(data: any) {
    try {
      const { username, fullName, email, password, mobile, roleId } = data;
      const {
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
      } = data;
      const users = await this.prisma.user.create({
        data: {
          username,
          fullName,
          email,
          password,
          mobile,
          roleId,
        },
      });
      const employee = await this.prisma.employee.create({
        data: {
          experience,
          resumeLink,
          linkedinUrl,
          address,
          accountNumber,
          ifscCode,
          bankName,
          branch,
          userId: users.id,
        },
      });
      return {
        user: users,
        employee: employee,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(userId: number, data: any) {
    try {
      const updated = await this.prisma.employee.update({
        where: {
          userId,
        },
        data,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(userId: number) {
    try {
      const deleted = await this.prisma.employee.delete({
        where: {
          userId,
        },
      });
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(userId: number) {
    try {
      const find = await this.prisma.employee.findUnique({
        where: {
          userId,
        },
      });
      return find;
    } catch (error) {
      throw error;
    }
  }

  async getAllEmployees() {
    try {
      const findAll = await this.prisma.employee.findMany();
      return findAll;
    } catch (error) {
      throw error;
    }
  }

  async assignDepartment(userId: number, departmentId: number) {
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
