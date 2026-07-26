import { randomUUID } from "node:crypto";
import type { EmployeeRepository } from "./employee.repository.js";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../config/s3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

  async updateEmployee(id: string, data: any) {
    try {
      const updated = await this.repository.updateEmployee(id, data);
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(id: string) {
    try {
      const deleted = await this.repository.deleteEmployee(id);
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(id: string) {
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

  async assignDepartment(userId: string, departmentId: number) {
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

  async generateSignedUrl(fileName: string, contentType: string) {
    const uuid = randomUUID();
    const extension = path.extname(fileName);
    const key = `resumes/${uuid}${extension}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType
    });
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    return {
      uploadUrl,
      key
    };
  }

  async getDocumentUrl(employeeId: string) {

  }
}
