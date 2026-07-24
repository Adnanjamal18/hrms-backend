import type { DepartmentRepositary } from "./department.repositary.js";

export class DepartmentService {
  constructor(private readonly Repositary: DepartmentRepositary) {}
  async createDepartment(data: any) {
    try {
      return await this.Repositary.createDepartment(data);
    } catch (error) {
      throw error;
    }
  }

  async updateDepartment(id: number, data: any) {
    try {
      return await this.Repositary.updateDepartment(id, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteDepartment(id: number) {
    try {
      return await this.Repositary.deleteDepartment(id);
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
      return await this.Repositary.getAllDepartments(
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        filtering,
      );
    } catch (error) {
      throw error;
    }
  }

  async assignManager(departmentId: number, managerId: number) {
    try {
      const assign = await this.Repositary.assignManager(
        departmentId,
        managerId,
      );
      return assign;
    } catch (error) {
      throw error;
    }
  }
}
