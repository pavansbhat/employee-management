import { useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { Controls } from "@xyflow/react";
import "./App.css";
import { LeftPanel } from "./components/left-panel/LeftPanel.tsx";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEmployees } from "./hooks/useEmployees";
import { CustomNode } from "./components/Node/CustomNode.tsx";
import ButtonEdge from "./components/ButtonEdge/ButtonEdge.tsx";

const edgeTypes = {
  buttonedge: ButtonEdge,
};

function App() {
  const {
    nodes,
    edges,
    employees,
    loading,
    filterTeam,
    setFilterTeam,
    searchTerm,
    setSearchTerm,
    teams,
    updateManager,
  } = useEmployees();

  const handleDrop = async (
    draggedEmployeeId: string,
    targetEmployeeId: string,
  ) => {
    await updateManager(draggedEmployeeId, targetEmployeeId);
  };

  const nodeTypes = {
    custom: (props: any) => <CustomNode {...props} onDrop={handleDrop} />,
  };

  const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState(
    [] as any[],
  );
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState(
    [] as any[],
  );

  useEffect(() => {
    setReactFlowNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setReactFlowEdges(edges);
  }, [edges]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="App">
      <div className="dashboard">
        <Controls showFitView={false} showInteractive={false} showZoom={false}>
          <LeftPanel
            employeeData={employees}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterTeam={filterTeam}
            setFilterTeam={setFilterTeam}
            teams={teams}
          />
        </Controls>
        <div
          className="flow-container"
          style={{ height: "94vh", width: "100%" }}
        >
          <ReactFlow
            nodes={reactFlowNodes}
            edges={reactFlowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onlyRenderVisibleElements={true}
            nodesDraggable={false}
            className="react-flow"
          >
            <Background />
            <Controls
              position={"bottom-right"}
              orientation="horizontal"
              showInteractive={false}
              style={{ color: "#ccc" }}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;
