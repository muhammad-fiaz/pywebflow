import React from 'react';

// NodeData Type
export interface NodeData {
  id: string;
  label: string;
  position: { x: number; y: number }; // Position of the node
  type?: string; // Type of the node (optional)
  selected?: boolean; // Whether the node is selected
  isConnectable?: boolean; // Whether the node can be connected to others
  zIndex?: number; // The z-index of the node for layering
  positionAbsoluteX?: number; // Absolute position on the X axis (optional)
  positionAbsoluteY?: number; // Absolute position on the Y axis (optional)
  dragging?: boolean; // Whether the node is being dragged
  targetPosition?: string; // Target position for the edge to connect to (optional)
  sourcePosition?: string; // Source position for the edge to connect from (optional)
}

// EdgeData Type
export interface EdgeData {
  id: string;
  animated: boolean; // Whether the edge is animated
  data: string | string[]; // Additional data related to the edge
  style: React.CSSProperties; // Custom styles for the edge
  selected: boolean; // Whether the edge is selected
  source: string; // The ID of the source node
  target: string; // The ID of the target node
  sourceHandleId?: string | null; // Optional handle ID for the source
  targetHandleId?: string | null; // Optional handle ID for the target
  interactionWidth: number; // Width of the interaction area
  sourceX: number; // X position of the source node
  sourceY: number; // Y position of the source node
  targetX: number; // X position of the target node
  targetY: number; // Y position of the target node
  sourcePosition: string; // Position type for the source node
  targetPosition: string; // Position type for the target node
  label?: string | React.ReactNode; // Optional label for the edge
  labelStyle?: React.CSSProperties; // Custom styles for the label
  labelShowBg?: boolean; // Whether to show a background for the label
  labelBgStyle?: React.CSSProperties; // Background style for the label
  labelBgPadding?: [number, number]; // Padding around the label
  labelBgBorderRadius?: number; // Border radius of the label background
  markerStart?: string; // Marker at the start of the edge
  markerEnd?: string; // Marker at the end of the edge
  pathOptions?: string; // Path options (optional)
}

