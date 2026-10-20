import type { Recruitmentservice } from "./recruitment.service.js";
import type { Request, Response, NextFunction } from "express";
export declare class RecruitmentController {
    private readonly service;
    constructor(service: Recruitmentservice);
    getAllJobs: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    createjobposting: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatejobposting: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletejobposting: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJobApplicationbyJobId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createcadidate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatecandidatestatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=recruitment.controller.d.ts.map