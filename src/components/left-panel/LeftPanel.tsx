import "./leftPanel.css"
import {EmployeeCard} from "../EmployeeCard/EmployeeCard.tsx";
import type {Employee} from "../../zod-schema/schema.ts";
import { Filter } from "./Filter.tsx";

export const LeftPanel = ({employeeData} : { employeeData: Employee[] }) => {
    return (
        <div className="left-panel">
            <Filter />
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