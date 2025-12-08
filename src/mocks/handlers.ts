import { http, HttpResponse } from "msw";
import { employees } from "./data/employee.ts";
import type { Employee } from "../zod-schema/schema.ts";

function checkCircularRelationship(
  employees: Employee[],
  employeeId: string,
  newManagerId: string,
): boolean {
  let currentManagerId = newManagerId;

  while (currentManagerId) {
    if (currentManagerId === employeeId) {
      return true;
    }

    const currentManager = employees.find((e) => e.id === currentManagerId);
    if (!currentManager || !currentManager.manager) {
      break;
    }

    currentManagerId = currentManager.manager;
  }

  return false;
}

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

  http.patch("/api/employees/:id", async ({ params, request }) => {
    const id = params.id as string;
    const employeeIndex = employees.findIndex((e) => e.id === id);

    if (employeeIndex === -1) {
      return HttpResponse.json(
        { message: "Employee not found" },
        { status: 404 },
      );
    }

    try {
      const body = (await request.json()) as { manager?: string | null };
      const newManagerId = body.manager;

      if (newManagerId) {
        const isCircularRelationship = checkCircularRelationship(
          employees,
          id,
          newManagerId,
        );
        if (isCircularRelationship) {
          return HttpResponse.json(
            { message: "Cannot create circular manager relationship" },
            { status: 400 },
          );
        }
      }

      employees[employeeIndex] = {
        ...employees[employeeIndex],
        manager:
          newManagerId !== undefined
            ? newManagerId
            : employees[employeeIndex].manager,
      };

      return HttpResponse.json({
        ...employees[employeeIndex],
        message: "Manager updated successfully",
      });
    } catch (error) {
      return HttpResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }
  }),
];
