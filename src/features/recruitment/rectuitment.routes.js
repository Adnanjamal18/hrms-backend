import { Router } from "express";
import { prisma } from "../../config/db.js";
import { Recruitmentservice } from "./recruitment.service.js";
import { RecruitmentController } from "./recruitment.controller.js";
import { RecruitmentRepository } from "./recruitment.repository.js";
const route = Router();
const repository = new RecruitmentRepository(prisma);
const service = new Recruitmentservice(repository);
const controller = new RecruitmentController(service);
route.get("/get-all-jobs", controller.getAllJobs);
route.post("/create-job", controller.createjobposting);
route.post("/create-candidate", controller.createcadidate);
route.patch("/update-job/:id", controller.updatejobposting);
route.delete("/delete-job/:id", controller.deletejobposting);
route.get("/get-all-candidates/:id", controller.getJobApplicationbyJobId);
route.put("/update-candidate-status/:id", controller.updatecandidatestatus);
export default route;
//# sourceMappingURL=rectuitment.routes.js.map