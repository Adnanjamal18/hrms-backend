import type { EmployeeRepository } from "./employee.repository.js";

export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async createEmployee(data: any) {
    try {
      const employee = await this.repository.createEmployee(data);
      
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(id: number, data: any) {
    try {
      const updated = await this.repository.updateEmployee(id, data);
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(id: number) {
    try {
      const deleted = await this.repository.deleteEmployee(id);
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(id: number) {
    try {
      const find = await this.repository.getEmployeeById(id);
      return find;
    } catch (error) {
      throw error;
    }
  }
  async getAllEmployees() {
    try {
      const findAll = await this.repository.getAllEmployees();
      return findAll;
    } catch (error) {
      throw error;
    }
  }

  async assignDepartment(userId: number, departmentId: number) {
    try {
      const create = await this.repository.assignDepartment(
        userId,
        departmentId,
      );
      return create;
    } catch (error) {
      throw error;
    }
  }
}
