import { useEffect, useCallback } from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { getNodes } from './api/nodes.ts';
import { getEdges } from './api/edges.ts';

import '@xyflow/react/dist/style.css';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchNodesAndEdges = async () => {
      const fetchedNodes = await getNodes();
      const fetchedEdges = await getEdges();
      setNodes(fetchedNodes.map((node: { id: never; position: never; label: never; }) => ({
        id: node.id,
        position: node.position,
        data: { label: node.label },
      })));
      setEdges(fetchedEdges.map((edge: { id: never; source: never; target: never; }) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })));
    };

    fetchNodesAndEdges();
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}