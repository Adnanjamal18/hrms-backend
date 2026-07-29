import { z } from "zod";

export const applyLeaveSchema = z.object({
  leaveTypeId: z.string().min(1, "Leave type is required"),
  departmentId: z.number().int("Department ID must be an integer"),
  fromDate: z.string().transform((str) => new Date(str)),
  toDate: z.string().transform((str) => new Date(str)),
  purpose: z.string().min(5, "Please provide a valid purpose"),
}).refine((data) => data.fromDate <= data.toDate, {
  message: "End date must be after start date",
  path: ["toDate"],
});

// For approve/reject APIs we might just need the leave ID from the URL params,
// so a body validator might not be strictly necessary unless you want to add a "reason" field.
