import { Edge, Node, ReactFlow, ReactFlowProps } from '@xyflow/react';
import React, { useState, useEffect } from 'react';
import Flow from './Flow';
import { useTheme } from 'next-themes';

interface AppProps {
  metadata?: {
    title?: string;
  };
  nodes: Node[];
  edges: Edge[];
}

const App: React.FC<AppProps> = ({ nodes, edges }) => {
  const { theme, systemTheme } = useTheme();
  const [config, setConfig] = useState<Partial<ReactFlowProps>>({});

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      colorMode: currentTheme === 'dark' ? 'dark' : 'light',
    }));
  }, [currentTheme]);

  // Ensure each node has correct properties for interactivity
  const transformedNodes = nodes.map((node) => ({
    ...node,
    draggable: undefined, // Remove invalid property
    selectable: node.selectable ?? true,
    connectable: node.connectable ?? true,
    deletable: node.deletable ?? true,
    dragging: node.dragging ?? false, // Allow dragging behavior
    data: { ...node.data, label: node.data?.label || node.id },
  }));

  // Ensure each edge has default properties
  const transformedEdges = edges.map((edge) => ({
    ...edge,
    animated: edge.animated ?? false,
    style: {
      stroke: edge.style?.stroke || '#000',
    },
  }));

  const reactFlowProps: ReactFlowProps = {
    ...config,
    nodes: transformedNodes,
    edges: transformedEdges,
    fitView: true,
    nodesDraggable: true,
    nodesConnectable: true,
    proOptions: { hideAttribution: true },
  };

  return (
    <div className={`${currentTheme} w-full h-full`}>
      <ReactFlow {...reactFlowProps} className="h-full w-full">
        <Flow />
      </ReactFlow>
    </div>
  );
};

export default App;
