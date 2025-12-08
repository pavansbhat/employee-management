import { useState, useEffect, useCallback, useMemo } from "react";
import type { Employee } from "../zod-schema/schema";
import { buildTree } from "../lib/treeBuilder";

type TeamFilter = "all" | string;

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTeam, setFilterTeam] = useState<TeamFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const teams = Array.from(new Set(employees.map((e) => e.team)));

  const filteredEmployees = useMemo(() => employees.filter(
    (emp) =>
      (filterTeam === "all" || emp.team === filterTeam) &&
      (
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.team.toLowerCase().includes(searchTerm.toLowerCase())
      )
  ), [employees, filterTeam, searchTerm]);

  const { nodes, edges } = useMemo(
    () => buildTree(filteredEmployees),
    [filteredEmployees]
  );

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateManager = async (
    employeeId: string,
    newManagerId: string | null,
  ) => {
    // TODO: Implement update API endpoint
    // For now, just update the local state
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === employeeId ? { ...e, manager: newManagerId } : e,
      ),
    );
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    employees: filteredEmployees,
    allEmployees: employees,
    nodes,
    edges,
    teams,
    filterTeam,
    setFilterTeam,
    searchTerm,
    setSearchTerm,
    loading,
    refetch,
    updateManager,
  };
};
