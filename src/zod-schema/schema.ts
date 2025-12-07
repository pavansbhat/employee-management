import { z } from "zod";
export const employeeSchema = z.object({
    id: z.string(),
    name: z.string(),
    designation: z.string(),
    team: z.string(),
    manager: z.string().nullable(),
  });
  export type Employee = z.infer<typeof employeeSchema>;
  export const employeeListSchema = z.array(employeeSchema);