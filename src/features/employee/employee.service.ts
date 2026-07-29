import { randomUUID } from "node:crypto";
import type { EmployeeRepository } from "./employee.repository.js";
import path from "path";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client } from "../../config/s3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from "jsonwebtoken";
import { MailService } from "../../lib/services/mail.service.js";

export class EmployeeService {
  constructor(
    private readonly repository: EmployeeRepository,
    private readonly mailService: MailService,
  ) {}

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
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    return {
      uploadUrl,
      key,
    };
  }

  async getDocumentUrl(employeeId: string) {
    try {
      const employee = await this.repository.getEmployeeById(employeeId);
      if (!employee) {
        throw new Error("employee not found");
      }
      const resume = employee.resumeLink;
      if (!resume) {
        throw new Error("resume not found");
      }
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: resume,
      });
      const downloadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 500,
      });
      return { downloadUrl };
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(userId: string) {
    try {
      const employee = await this.repository.getEmployeeById(userId);
      if (!employee) {
        throw new Error("employee not found");
      }

      const resume = employee.resumeLink;
      if (!resume) {
        throw new Error("resume not found");
      }

      const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: resume,
      });
      await s3Client.send(command);

      const updated = await this.repository.deleteResume(userId);
      return updated;
    } catch (error) {
      throw error;
    }
  }
  async sendInvite(userId: string) {
    try {
      const employee = await this.repository.getEmployeeById(userId);

      if (!employee) {
        throw new Error("Employee does not exist");
      }

      if (!employee.email) {
        throw new Error("Employee email not found");
      }

      const token = jwt.sign(
        {
          userId: employee.id,
          email: employee.email,
        },
        process.env.JWT_SECRET || "supersecretkey",
        {
          expiresIn: "24h",
        },
      );

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const activationLink = `${frontendUrl}/activate?token=${token}`;

      await this.mailService.sendMail(
        employee.email,
        "HRMS Account Activation & Invitation",
        `
          <h2>Hello ${employee.fullName || "Employee"},</h2>
          <p>You have been invited to join the HRMS portal.</p>
          <p>Please click the link below to activate your account:</p>
          <p style="margin: 20px 0;">
            <a href="${activationLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Activate Account
            </a>
          </p>
          <p>Or copy this URL into your browser:</p>
          <p><a href="${activationLink}">${activationLink}</a></p>
          <p><em>Note: This invitation link will expire in 24 hours.</em></p>
        `,
      );

      return {
        message: "Invitation sent successfully",
        email: employee.email,
      };
    } catch (error) {
      throw error;
    }
  }

  async activateAccount(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "supersecretkey"
      ) as { userId: string; email: string };

      const user = await this.repository.getEmployeeById(decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }

      await this.repository.verifyUserEmail(decoded.userId);
      return {
        message: "Account activated successfully",
        user,
      };
    } catch (error) {
      throw new Error("Invalid or expired activation token");
    }
  }
}
