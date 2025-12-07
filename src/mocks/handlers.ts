import { http, HttpResponse } from "msw";
import { employees } from "./data/employee.ts";

export const handlers = [
  http.get("/api/employees", () => {
    return HttpResponse.json(employees);
  }),

  http.get("/api/employees/:id", ({ params }) => {
    const id = params.id as string;
    const employee = employees.find((e) => e.id === id);

    if (!employee) {
      return HttpResponse.json(
        { message: "Employee not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(employee);
  }),
];
