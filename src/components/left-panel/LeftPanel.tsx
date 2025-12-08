import "./leftPanel.css"
import {EmployeeCard} from "../EmployeeCard/EmployeeCard.tsx";
import type {Employee} from "../../zod-schema/schema.ts";
import { Filter } from "./Filter.tsx";

interface LeftPanelProps {
    employeeData: Employee[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterTeam: string;
    setFilterTeam: (team: string) => void;
    teams: string[];
}

export const LeftPanel = ({employeeData, searchTerm, setSearchTerm, filterTeam, setFilterTeam, teams}: LeftPanelProps) => {
    return (
        <div className="left-panel">
            <Filter 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterTeam={filterTeam}
                setFilterTeam={setFilterTeam}
                teams={teams}
            />
            <div className="employee-list">
            {
                employeeData.map((employee: Employee) => (
                    <EmployeeCard employee={employee} key={employee.id}/>
                ))
            }
            </div>
            
        </div>
    )
}