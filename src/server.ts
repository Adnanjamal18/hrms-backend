import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {connectDB,disconnectDB} from "./config/db.js"
import { errorhandler } from "./core/errors.js";
import departmentRoutes from "./features/department/department.route.js";

import { auth } from "./features/auth/auth.js";
import { toNodeHandler } from "better-auth/node";
import designationRoutes from "./features/designation/designation.routes.js";
import leaveTypeRoutes from "./features/leave-type/leave-type.routes.js";
import attendanceRoutes from "./features/attendance/attendance.route.js";
import checklistRoutes from "./features/checklist/checklist.route.js";
import leaveRoutes from "./features/leave/leave.routes.js";
import roleRoutes from "./features/role/role.routes.js";
import employeeRoutes from "./features/employee/employee.route.js";
import userroutes from "./features/user/userroutes.js"
import employmentTypeRoutes from "./features/employment-type/employment-type.routes.js";
import holidayRoutes from "./features/holiday/holiday.routes.js";
import reportRoutes from "./features/report/report.routes.js";
import projectRoutes from "./features/Project/projectroutes.js";
import taskRoutes from "./features/tasks/taskroutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors({
   origin: "http://localhost:5173",
  credentials: true,
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth/", toNodeHandler(auth.handler));
app.use("/api/designations", designationRoutes);
app.use("/api/leave-types", leaveTypeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/employment-types", employmentTypeRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/checklist", checklistRoutes);
app.use("/user",userroutes)

app.use(errorhandler)

const Port = 5000

const server = app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
// Graceful shutdown
const shutdown = async () => {
  console.log("\nshutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    console.log("server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);