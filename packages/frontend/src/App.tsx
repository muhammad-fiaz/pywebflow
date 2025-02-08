import { useEffect, useCallback, useState } from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { getNodes } from './api/nodes.ts';
import { getEdges } from './api/edges.ts';

import Loading from './components/Loading';
import ThemeSwitcher from './components/ThemeSwitcher';
import ControlsComp from './components/Controls';
import { useTheme } from 'next-themes';
import {EdgeData, NodeData} from "./utils/types.ts";
import MinimapComp from "./components/Minimap.tsx";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Using next-themes hook to manage the theme
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme || resolvedTheme || 'light';

  useEffect(() => {
    const fetchNodesAndEdges = async () => {
      const fetchedNodes = await getNodes();
      const fetchedEdges = await getEdges();
      setNodes(
        fetchedNodes.map((node: NodeData) => ({
          id: node.id,
          position: node.position,
          data: { label: node.label },
          type: node.type,
          selected: node.selected,
          isConnectable: node.isConnectable,
          zIndex: node.zIndex,
          positionAbsoluteX: node.positionAbsoluteX,
          positionAbsoluteY: node.positionAbsoluteY,
          dragging: node.dragging,
          targetPosition: node.targetPosition,
          sourcePosition: node.sourcePosition,
        })),
      );
      setEdges(
        fetchedEdges.map((edge: EdgeData) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      );
    };

    fetchNodesAndEdges();
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Simulate a loading delay of 3 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    // Apply the theme as a class on the container
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* ThemeSwitcher uses next-themes to toggle the theme */}
      <ThemeSwitcher />
      <ReactFlow
        colorMode={currentTheme === 'dark' ? 'dark' : 'light'}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.1}
        proOptions={{ hideAttribution: true }}
      >
          <ControlsComp/>
          <MinimapComp/>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
