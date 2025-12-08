import { useRef, useEffect } from "react";
import type { Employee } from "../../zod-schema/schema";
import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import "../EmployeeCard/employeeCard.css";
import "./customNode.css";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

export interface CustomNodeTypeProps extends NodeProps {
  data: Employee;
  position?: { x: number; y: number };
  onDrop?: (draggedEmployeeId: string, targetEmployeeId: string) => void;
}

export const CustomNode = (props: CustomNodeTypeProps) => {
  const { data: employee, onDrop } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ employee, type: "employee" }),
        onDragStart: () => {
          // Drag started
        },
        onDrop: () => {
          // Drag ended : Normally we'd use a state etter here and using that state you can further change the style and some functionality on dragging element
        },
      }),
      dropTargetForElements({
        element: el,
        canDrop: ({ source }) => {
          return !!(
            source.data.type === "employee" &&
            source.data.employee &&
            (source.data.employee as Employee).id !== employee.id
          );
        },
        onDrop: ({ source }) => {
          if (
            onDrop &&
            source.data.type === "employee" &&
            source.data.employee &&
            (source.data.employee as Employee).id !== employee.id
          ) {
            onDrop((source.data.employee as Employee).id, employee.id);
          }
        },
      }),
    );
  }, [employee, onDrop]);

  return (
    <div className="node-custom" style={{ width: "" }} ref={ref}>
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
