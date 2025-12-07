import type { Employee } from "../../zod-schema/schema";
import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import "../EmployeeCard/employeeCard.css";
import "./customNode.css";

export interface CustomNodeTypeProps extends NodeProps {
  data: Employee;
  position?: { x: number; y: number };
}

export const CustomNode = (props: CustomNodeTypeProps) => {
  console.log("CustomNode props:", props);

  const { data: employee } = props;
  return (
    <div className="node-custom" style={{ width: "" }}>
      <Handle type="target" position={Position.Top} />
      <div className="card">
        <h2 className="employee-avatar">
          {employee.name.split(" ")[0][0]}
          {employee.name.split(" ")[1][0]}
        </h2>
        <div className="employee-details">
          <p>{employee.name}</p>
          <p>{employee.designation}</p>
          <p>{employee.team}</p>
          <p>{employee.id}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
