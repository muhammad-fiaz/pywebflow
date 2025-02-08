import React from "react";

export interface NodeData {
  id: string;
  label: string;
  position: { x: number; y: number };
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

export interface EdgeData {
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
}
