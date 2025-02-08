import React, { useEffect, useCallback } from 'react';
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

export interface NodeData {
  id: string;
  label: string;
  position: { x: number, y: number };
  type?: string;
  selected?: boolean;
  isConnectable?: boolean;
  zIndex?: number;
  positionAbsoluteX?: number;
  positionAbsoluteY?: number;
  dragging?: boolean;
  targetPosition?: string;
  sourcePosition?: string;
}

export interface EdgeData  {
  id: string;
  animated: boolean;
  data: string | string[];
  style: React.CSSProperties;
  selected: boolean;
  source: string;
  target: string;
  sourceHandleId?: string | null;
  targetHandleId?: string | null;
  interactionWidth: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: string;
  targetPosition: string;
  label?: string | React.ReactNode;
  labelStyle?: React.CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: React.CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  markerStart?: string;
  markerEnd?: string;
  pathOptions?: string;
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchNodesAndEdges = async () => {
      const fetchedNodes = await getNodes();
      const fetchedEdges = await getEdges();
      setNodes(fetchedNodes.map((node:NodeData)=> ({
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
      })));
      setEdges(fetchedEdges.map((edge: EdgeData) => ({
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
        minZoom={0.1}

        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}