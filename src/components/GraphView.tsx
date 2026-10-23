import React from 'react';
import { DSStep } from '../datastructures/types';

interface GraphViewProps {
  step: DSStep;
  onSelectStartNode?: (id: number) => void;
}

export const GraphView: React.FC<GraphViewProps> = ({ step, onSelectStartNode }) => {
  const graph = step.graph;
  if (!graph) return null;

  const { nodes, edges } = graph;
  const activeNode = step.activeNode;
  const activeEdge = step.activeEdge;
  const visited = step.visited || [];
  const frontier = step.frontier || [];
  const frontierType = step.frontierType || 'queue';
  const traversalOrder = step.traversalOrder || [];

  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative min-h-[340px] px-2 py-1 select-none">
      
      {/* Interactive Helper Hint */}
      <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        <span>Tip: Click any node to select as Traversal Start Node</span>
      </div>

      {/* SVG Graph Canvas */}
      <div className="w-full flex-1 flex items-center justify-center min-h-[220px]">
        <svg viewBox="0 0 700 300" className="w-full h-full max-h-[280px]">
          {/* Edges */}
          {edges.map((edge, idx) => {
            const u = nodes.find((n) => n.id === edge.from);
            const v = nodes.find((n) => n.id === edge.to);
            if (!u || !v) return null;

            const isEdgeActive =
              activeEdge &&
              ((activeEdge.from === edge.from && activeEdge.to === edge.to) ||
                (activeEdge.from === edge.to && activeEdge.to === edge.from));

            const isEdgeVisited =
              visited.includes(edge.from) && visited.includes(edge.to);

            let strokeColor = '#cbd5e1';
            let strokeWidth = 2;
            let strokeDash = undefined;

            if (isEdgeActive) {
              strokeColor = '#f59e0b';
              strokeWidth = 3.5;
              strokeDash = '4 2';
            } else if (isEdgeVisited) {
              strokeColor = '#94a3b8';
              strokeWidth = 2.2;
            }

            return (
              <line
                key={`edge-${idx}`}
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDash}
                strokeLinecap="round"
                className="transition-all duration-200"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isCurrent = activeNode === node.id;
            const isVisited = visited.includes(node.id);
            const isInFrontier = frontier.includes(node.id) && !isVisited;

            let fill = '#ffffff';
            let stroke = '#94a3b8';
            let textColor = '#1e293b';

            if (isCurrent) {
              fill = '#fbbf24';
              stroke = '#f59e0b';
              textColor = '#451a03';
            } else if (isVisited) {
              fill = '#10b981';
              stroke = '#059669';
              textColor = '#ffffff';
            } else if (isInFrontier) {
              fill = '#e0f2fe';
              stroke = '#0284c7';
              textColor = '#0369a1';
            }

            return (
              <g
                key={`node-${node.id}`}
                className="cursor-pointer group"
                onClick={() => onSelectStartNode?.(node.id)}
              >
                {/* Outer Glow Ring if Active */}
                {isCurrent && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={28}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    className="animate-ping opacity-30"
                  />
                )}

                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isCurrent ? 3 : 2}
                  className="transition-all duration-200 group-hover:scale-110 group-hover:stroke-slate-900"
                />

                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="12"
                  fontWeight="600"
                  fill={textColor}
                  className="pointer-events-none select-none"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal State & Frontier Display */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
        
        {/* Frontier State (Queue or Stack) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
            {frontierType === 'queue' ? 'BFS Queue (FIFO):' : 'DFS Stack (LIFO):'}
          </span>
          {frontier.length === 0 ? (
            <span className="text-slate-400 text-[11px]">Empty</span>
          ) : (
            frontier.map((id, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-sm bg-sky-100 text-sky-800 border border-sky-200 font-bold text-[11px]"
              >
                {id}
              </span>
            ))
          )}
        </div>

        {/* Visited Sequence */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
            Order Visited:
          </span>
          {traversalOrder.length === 0 ? (
            <span className="text-slate-400 text-[11px]">None yet</span>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              {traversalOrder.map((id, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <span className="bg-emerald-100 px-1.5 py-0.5 rounded-sm border border-emerald-200">
                    {id}
                  </span>
                  {idx < traversalOrder.length - 1 && <span className="text-slate-400">→</span>}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
