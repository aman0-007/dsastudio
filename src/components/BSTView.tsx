import React from 'react';
import { BSTNode, DSStep } from '../datastructures/types';

interface BSTViewProps {
  step: DSStep;
  onSelectNode?: (val: number) => void;
}

interface NodeLayout {
  val: number;
  x: number;
  y: number;
}

interface EdgeLayout {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const BSTView: React.FC<BSTViewProps> = ({ step, onSelectNode }) => {
  const root = step.bst || null;
  const activeNode = step.activeNode;
  const visited = step.visited || [];

  const nodes: NodeLayout[] = [];
  const edges: EdgeLayout[] = [];

  function layout(node: BSTNode | null, x: number, y: number, dx: number) {
    if (!node) return;
    nodes.push({ val: node.val, x, y });
    if (node.left) {
      edges.push({ x1: x, y1: y, x2: x - dx, y2: y + 55 });
      layout(node.left, x - dx, y + 55, dx * 0.52);
    }
    if (node.right) {
      edges.push({ x1: x, y1: y, x2: x + dx, y2: y + 55 });
      layout(node.right, x + dx, y + 55, dx * 0.52);
    }
  }

  layout(root, 400, 42, 160);

  if (!root || nodes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">
        Binary Search Tree is empty. Click "Sample Tree" or insert a value.
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative min-h-[320px]">
      <svg viewBox="0 0 800 300" className="w-full h-full max-h-[320px] select-none">
        {/* Edges */}
        {edges.map((e, idx) => (
          <line
            key={`edge-${idx}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Nodes */}
        {nodes.map((n) => {
          let fill = "#ffffff";
          let stroke = "#94a3b8";
          let textColor = "#1e293b";

          if (n.val === activeNode) {
            fill = "#fbbf24";
            stroke = "#f59e0b";
            textColor = "#451a03";
          } else if (visited.includes(n.val)) {
            fill = "#10b981";
            stroke = "#059669";
            textColor = "#ffffff";
          }

          return (
            <g
              key={`node-${n.val}`}
              className="node-item cursor-pointer group"
              onClick={() => onSelectNode?.(n.val)}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={19}
                fill={fill}
                stroke={stroke}
                strokeWidth={n.val === activeNode ? "3" : "2"}
                className="transition-all duration-200 group-hover:stroke-slate-900 group-hover:scale-110"
              />
              <text
                x={n.x}
                y={n.y + 4.5}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="12"
                fontWeight="600"
                fill={textColor}
                className="pointer-events-none"
              >
                {n.val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
