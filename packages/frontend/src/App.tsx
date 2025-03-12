import { Edge, Node, ReactFlow, ReactFlowProps, addEdge, Connection, useNodesState, useEdgesState } from '@xyflow/react';
import React, { useEffect } from 'react';
import Flow from './Flow';
import { useTheme } from 'next-themes';
import { create } from 'zustand';

interface AppProps {
  pageData: {
    metadata?: {
      title?: string;
    };
    nodes: Node[];
    edges: Edge[];
  };
}

// Zustand store inside the same file
const useFlowStore = create<{
  nodes: Node[];
  edges: Edge[];
  config: Partial<ReactFlowProps>;
  setNodes: (nodes: Node[]) => void;
  setEdges: (updateFn: (edges: Edge[]) => Edge[]) => void;
  setConfig: (config: Partial<ReactFlowProps>) => void;
}>((set) => ({
  nodes: [],
  edges: [],
  config: {
    fitView: true,
    nodesDraggable: true,
    nodesConnectable: true,
    proOptions: { hideAttribution: true },
  },

  setNodes: (nodes) => set(() => ({ nodes })),
  setEdges: (updateFn) => set((state) => ({ edges: updateFn(state.edges) })),
  setConfig: (config) => set((state) => ({ config: { ...state.config, ...config } })),
}));

const App: React.FC<AppProps> = ({ pageData }) => {
  const { nodes: initialNodes = [], edges: initialEdges = [] } = pageData;
  const { theme, systemTheme } = useTheme();
  const { nodes, edges, config, setNodes, setEdges, setConfig } = useFlowStore();

  useEffect(() => {
    setNodes(
      initialNodes.map((node) => ({
        ...node,
        draggable: true,
data: { ...node.data, label: (node as { label?: string }).label || node.id }
      }))
    );

    setEdges(() => initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Sync theme changes
  useEffect(() => {
    const colorMode = (theme === 'system' ? systemTheme : theme) === 'dark' ? 'dark' : 'light';
    setConfig({ colorMode });
  }, [theme, systemTheme, setConfig]);

  // Handle connection event
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge({ ...params, id: `edge-${params.source}-${params.target}`, animated: true }, eds));
  };

  // Hook-based state management for ReactFlow changes
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, [nodes, edges]);

  const reactFlowProps: ReactFlowProps = {
    ...config,
    nodes: flowNodes,
    edges: flowEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  };

  return (
    <div className={`${theme} w-full h-full`}>
      <ReactFlow {...reactFlowProps} className="h-full w-full">
        <Flow />
      </ReactFlow>
    </div>
  );
};

export default App;