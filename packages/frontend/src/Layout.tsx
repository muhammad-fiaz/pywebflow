import React, { useEffect, useCallback, useState } from 'react';
import {
  addEdge,
  Connection,
  ReactFlow,
  useEdgesState,
  useNodesState,
  ColorMode, // Import ColorMode type
} from '@xyflow/react';
import { getNodes } from './api/nodes.ts';
import { getEdges } from './api/edges.ts';
import { getServerStatus } from './api/status.ts';
import Loading from './components/Loading';
import { useTheme } from 'next-themes';
import { EdgeData, NodeData } from './utils/types.ts';
const App = import('./App');
const AppDyn = React.lazy(() => App.then((mod) => ({ default: mod.App })));

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [apiFetched, setApiFetched] = useState(false);
  const [serverConnected, setServerConnected] = useState(true); // Track server status
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        if (prev >= 80 && !apiFetched) return 80;
        return prev + 2;
      });
    };

    const interval = setInterval(updateProgress, 50);

    return () => clearInterval(interval);
  }, [apiFetched]);

  // Function to check server status and fetch data
  const checkServerAndFetchData = useCallback(async () => {
    try {
      const status = await getServerStatus(); // Check if the server is online
      if (status.status === 'online') {
        setServerConnected(true);

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
          }))
        );

        setEdges(
          fetchedEdges.map((edge: EdgeData) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            animated: edge.animated,
            style: edge.style,
            selected: edge.selected,
            interactionWidth: edge.interactionWidth,
            sourcePosition: edge.sourcePosition,
            targetPosition: edge.targetPosition,
            label: edge.label,
            labelStyle: edge.labelStyle,
            labelShowBg: edge.labelShowBg,
            labelBgStyle: edge.labelBgStyle,
            labelBgPadding: edge.labelBgPadding,
            labelBgBorderRadius: edge.labelBgBorderRadius,
            markerStart: edge.markerStart,
            markerEnd: edge.markerEnd,
            pathOptions: edge.pathOptions,
          }))
        );

        setApiFetched(true);

        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setIsLoading(false), 500);
        }, 500);
      } else {
        setServerConnected(false); // Mark server as disconnected
        setTimeout(checkServerAndFetchData, 3000); // Retry every 3 seconds
      }
    } catch {
      setServerConnected(false); // Server error, retry
      setTimeout(checkServerAndFetchData, 3000);
    }
  }, []);

  // This useEffect runs when progress reaches 80%
  useEffect(() => {
    if (progress === 80 && !apiFetched) {
      checkServerAndFetchData();
    }
  }, [progress, apiFetched, checkServerAndFetchData]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const reactFlowProps = {
    colorMode: currentTheme === 'dark' ? 'dark' as ColorMode : 'light' as ColorMode,
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    fitView: true,
    minZoom: 0.1,
    proOptions: { hideAttribution: true },
  };

  return isLoading ? (
    <Loading progress={progress} isServerConnected={serverConnected} />
  ) : (
    <div className={`${currentTheme} w-full h-full`}>
      <ReactFlow {...reactFlowProps}>
        <AppDyn />
      </ReactFlow>
    </div>
  );
}