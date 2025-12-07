// import { useState } from 'react';
import { employees } from "../../mocks/data/employee.ts";
import type {Employee} from "../../zod-schema/schema.ts";
import "./employeeCard.css"

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
    return (
        <div className="card-container">
            <div className="card">
                <h2 className="employee-icon">{employee.name.split(" ")[0][0]}{employee.name.split(" ")[1][0]}</h2>
                <div className="employee-details">
                    <p>{employee.name}</p>
                    <p>{employee.designation}</p>
                    <p style={{backgroundColor: "#D2DCB6", padding: "4px", borderRadius: "4px"
                    }}>{employee.team}</p>
                </div>
                
            </div>
        </div>
    )
}