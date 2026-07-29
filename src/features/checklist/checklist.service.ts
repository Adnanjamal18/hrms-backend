import type { ChecklistRepository } from "./checklist.repository.js";

export class ChecklistService {
  constructor(private readonly repository: ChecklistRepository) {}

  async getChecklist(userId: string) {
    try {
      return await this.repository.getChecklistByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateChecklist(userId: string, data: any) {
    try {
      return await this.repository.updateChecklist(userId, data);
    } catch (error) {
      throw error;
    }
  }

  async getAllChecklists() {
    try {
      return await this.repository.getAllChecklists();
    } catch (error) {
      throw error;
    }
  }
}
