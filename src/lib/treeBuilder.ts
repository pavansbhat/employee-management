import type { Node, Edge } from "@xyflow/react";
import { Position } from "@xyflow/react";
import type { Employee } from "../zod-schema/schema.ts";
import dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 1000;
const nodeHeight = 850;

export const buildTree = (employees: Employee[]) => {
  const nodeMap = new Map<string, Node>();
  const edges: Edge[] = [];

  employees.forEach((emp) => {
    nodeMap.set(emp.id, {
      id: emp.id,
      type: "custom",
      data: {
        id: emp.id,
        name: emp.name,
        designation: emp.designation,
        team: emp.team,
      },
      position: { x: 0, y: 0 },
      className: "nopan"
    });
  });

  employees.forEach((emp) => {
    if (emp.manager && nodeMap.has(emp.manager) && nodeMap.has(emp.id)) {
      edges.push({
        id: `e${emp.id}`,
        source: emp.manager,
        target: emp.id,
        type: "smoothstep",
      });
    }
  });

  const nodes = Array.from(nodeMap.values())
  const layoutedNodes = getLayoutedElements(nodes, edges);

  return { nodes: layoutedNodes.nodes, edges: layoutedNodes.edges };
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: (node.measured?.width ?? 0) / 2, height: (node.measured?.height ?? 0) / 2 });
    dagreGraph.setNode(node.id, { width: (nodeWidth ?? 0) / 2, height: (nodeHeight ?? 0) / 2 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;
    node.position = {
      x: nodeWithPosition.x! - (node.measured?.width ?? 0)  / 2,
      y: nodeWithPosition.y! - (node.measured?.height ?? 0) / 2,
    };
    return node;
  });

  return { nodes, edges };
};
