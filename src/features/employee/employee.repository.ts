import type { PrismaClient } from "@prisma/client";

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createEmployee(data: any) {
    try {
      const { 
        username, fullName, email, password, mobile, roleId, 
        experience, resumeLink, linkedinUrl, address, 
        accountNumber, ifscCode, bankName, branch
      } = data;
      
      const user = await this.prisma.user.create({
        data: {
          username,
          fullName,
          email,
          password,
          mobile,
          roleId,
          employee: {
            create: {
              experience: experience || 0,
              resumeLink,
              linkedinUrl,
              address,
              accountNumber,
              ifscCode,
              bankName,
              branch,
            }
          }
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
      const { 
        experience, resumeLink, linkedinUrl, address, 
        accountNumber, ifscCode, bankName, branch,
        ...userData 
      } = data;

      const updated = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...userData,
          employee: {
            upsert: {
              create: {
                experience: experience || 0,
                resumeLink, linkedinUrl, address,
                accountNumber, ifscCode, bankName, branch
              },
              update: {
                experience, resumeLink, linkedinUrl, address,
                accountNumber, ifscCode, bankName, branch
              }
            }
          }
        }
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
          employee: true,
          departments: {
            include: {
              department: true,
            },
          },
        },
      });
      
      if (!find) return null;
      
      // Flatten the employee data onto the user object to maintain API compatibility
      const { employee, ...userData } = find;
      
      // Exclude employee.id to avoid overwriting user.id
      const { id: employeeId, userId: employeeUserId, ...employeeData } = employee || {};
      
      return {
        ...userData,
        ...employeeData,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllEmployees() {
    try {
      const findAll = await this.prisma.user.findMany({
        include: {
          role: true,
          employee: true,
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

      return findAll.map(user => {
        const { employee, ...userData } = user;
        
        const { id: employeeId, userId: employeeUserId, ...employeeData } = employee || {};
        
        return {
          ...userData,
          ...employeeData,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async assignDepartment(userId: string, departmentId: number) {
    try {
      const existing = await this.prisma.departmentUser.findFirst({
        where: {
          userId,
        },
      });

      if (existing) {
        if (existing.departmentId === departmentId) {
          return existing;
        }
        
        // Update their current department
        const updated = await this.prisma.departmentUser.update({
          where: { id: existing.id },
          data: { departmentId },
        });
        return updated;
      }

      // Assign them to a department for the first time
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

  async deleteResume(userId: string) {
    try {
      const updated = await this.prisma.employee.update({
        where: {
          userId: userId,
        },
        data: {
          resumeLink: null,
        },
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async verifyUserEmail(userId: string) {
    try {
      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: { emailVerified: true },
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }
}
