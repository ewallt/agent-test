import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FlowChartScene as FlowChartSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { useTheme } from "../ThemeContext";

const NODE_W = 200;
const NODE_H = 72;

function nodeHeight(node: { height?: number }) {
  return node.height ?? NODE_H;
}
const STAGGER = 18;

function computePositions(
  count: number,
  layout: string,
  hasTitle: boolean,
): { x: number; y: number }[] {
  const yCenter = hasTitle ? 590 : 540;

  if (layout === "linear-vertical") {
    const xCenter = 960;
    const topY = hasTitle ? 200 : 140;
    const bottomY = 940;
    const usableH = bottomY - topY;
    const spacing = count > 1 ? usableH / (count - 1) : 0;
    return Array.from({ length: count }, (_, i) => ({ x: xCenter, y: topY + i * spacing }));
  }

  // linear-horizontal (default)
  const margin = 160;
  const usableW = 1920 - 2 * margin;
  const spacing = count > 1 ? usableW / (count - 1) : 0;
  return Array.from({ length: count }, (_, i) => ({ x: margin + i * spacing, y: yCenter }));
}

export const FlowChartScene: React.FC<FlowChartSceneProps> = ({
  title,
  nodes,
  edges,
  layout = "linear-horizontal",
  labels = [],
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const autoPositions = computePositions(nodes.length, layout, !!title);
  const positions = nodes.map((node, i) =>
    node.x !== undefined && node.y !== undefined
      ? { x: node.x, y: node.y }
      : autoPositions[i]
  );
  const posMap: Record<string, { x: number; y: number }> = {};
  const heightMap: Record<string, number> = {};
  nodes.forEach((n, i) => {
    posMap[n.id] = positions[i];
    heightMap[n.id] = nodeHeight(n);
  });

  const nodeStartFrame = (i: number) =>
    nodes[i].startFrame !== undefined ? nodes[i].startFrame! : i * 2 * STAGGER;
  const edgeStartFrame = (i: number) =>
    edges[i].startFrame !== undefined ? edges[i].startFrame! : (i * 2 + 1) * STAGGER;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: THEME.bg,
        position: "relative",
        fontFamily: THEME.fontFamily,
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: THEME.headingFamily,
            fontSize: 56,
            fontWeight: 700,
            color: THEME.ink,
            opacity: titleOpacity,
            margin: 0,
            padding: "60px 0 0 120px",
          }}
        >
          {title}
        </h2>
      )}

      {/* SVG layer for arrows */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
        width={1920}
        height={1080}
      >
        <defs>
          {/* One arrowhead marker per unique color used in edges */}
          {[THEME.accent, ...new Set(edges.filter(e => e.color).map(e => e.color!))].map(color => (
            <marker
              key={color}
              id={`fc-arrow-${color.replace(/[^a-zA-Z0-9]/g, "")}`}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={color} />
            </marker>
          ))}
        </defs>

        {edges.map((edge, i) => {
          const from = posMap[edge.from];
          const to = posMap[edge.to];
          if (!from || !to) return null;
          const edgeColor = edge.color ?? THEME.accent;
          const markerId = `fc-arrow-${edgeColor.replace(/[^a-zA-Z0-9]/g, "")}`;

          const start = edgeStartFrame(i);
          const progress = interpolate(frame, [start, start + 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const labelOpacity = interpolate(frame, [start + 14, start + 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Vertical connector: bottom of from-node to top of to-node, centered on shared x
          if (edge.vertical) {
            const vx = from.x;
            const vy1 = from.y + (heightMap[edge.from] ?? NODE_H) / 2;
            const vy2 = to.y - (heightMap[edge.to] ?? NODE_H) / 2;
            const lineLength = Math.abs(vy2 - vy1);
            const dashOffset = lineLength * (1 - progress);
            const midY = (vy1 + vy2) / 2;
            return (
              <g key={i}>
                <line
                  x1={vx} y1={vy1} x2={vx} y2={vy2}
                  stroke={edgeColor}
                  strokeWidth={3}
                  strokeDasharray={lineLength}
                  strokeDashoffset={dashOffset}
                  markerEnd={progress > 0 ? `url(#${markerId})` : undefined}
                />
                {edge.label && (
                  <text
                    x={vx + 20}
                    y={midY + 10}
                    textAnchor="start"
                    fill={THEME.ink}
                    fontSize={26}
                    opacity={labelOpacity}
                    fontFamily={THEME.fontFamily}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          }

          // Horizontal edge: right edge of from-node to left edge of to-node.
          // fromSide/toSide control whether the edge connects at the top, center, or bottom.
          const x1 = from.x + NODE_W / 2;
          const fromH = heightMap[edge.from] ?? NODE_H;
          const y1 = edge.fromSide === "top"    ? from.y - fromH / 2
                   : edge.fromSide === "bottom" ? from.y + fromH / 2
                   : from.y;
          const x2 = to.x - NODE_W / 2;
          const toH = heightMap[edge.to] ?? NODE_H;
          const y2 = edge.toSide === "top"    ? to.y - toH / 2
                   : edge.toSide === "bottom" ? to.y + toH / 2
                   : to.y;
          const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const dashOffset = lineLength * (1 - progress);
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 22;

          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={edgeColor}
                strokeWidth={3}
                strokeDasharray={lineLength}
                strokeDashoffset={dashOffset}
                markerEnd={progress > 0 ? `url(#${markerId})` : undefined}
              />
              {edge.label && (
                <text
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  fill={THEME.ink}
                  fontSize={26}
                  opacity={labelOpacity}
                  fontFamily={THEME.fontFamily}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const pos = positions[i];
        const start = nodeStartFrame(i);

        const nodeScale = spring({
          frame: frame - start,
          fps,
          config: { damping: 12, stiffness: 160, mass: 0.8 },
          from: 0.5,
          to: 1,
        });

        const nodeOpacity = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: pos.x - NODE_W / 2,
              top: pos.y - nodeHeight(node) / 2,
              width: NODE_W,
              height: nodeHeight(node),
              background: THEME.bg,
              border: `3px solid ${THEME.accent}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: nodeOpacity,
              transform: `scale(${nodeScale})`,
              transformOrigin: "center center",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: THEME.fontFamily,
                fontSize: 24,
                color: THEME.ink,
                textAlign: "center",
                padding: "0 12px",
                lineHeight: 1.25,
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Row labels */}
      {labels.map((lbl, i) => {
        const start = lbl.startFrame ?? 0;
        const labelOpacity = interpolate(frame, [start, start + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: lbl.x ?? 120,
              top: lbl.y,
              fontFamily: THEME.headingFamily,
              fontSize: lbl.fontSize ?? 42,
              fontWeight: 700,
              color: lbl.color ?? THEME.accent,
              opacity: labelOpacity,
              pointerEvents: "none",
            }}
          >
            {lbl.text}
          </div>
        );
      })}

      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
