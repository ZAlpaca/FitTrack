import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface LineChartProps {
  data: number[];
  color?: string;
  fillColor?: string;
  height?: number;
  activeIndex?: number;
}

function computePoints(
  data: number[],
  viewWidth: number,
  viewHeight: number,
  padding: number,
) {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = data.length > 1 ? (viewWidth - padding * 2) / (data.length - 1) : 0;

  return data.map((value, i) => ({
    x: padding + i * stepX,
    y: viewHeight - padding - ((value - min) / range) * (viewHeight - padding * 2),
  }));
}

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  let d = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 >= points.length ? points.length - 1 : i + 2];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return d;
}

export function LineChart({
  data,
  color = '#CCFF00',
  fillColor,
  height = 150,
  activeIndex,
}: LineChartProps) {
  if (data.length < 2) return null;

  const viewWidth = data.length * 10;
  const viewHeight = 100;
  const padding = 0;

  const points = computePoints(data, viewWidth, viewHeight, padding);
  const linePath = smoothPath(points);

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const fillPath = `${linePath} L ${lastPoint.x},${viewHeight} L ${firstPoint.x},${viewHeight} Z`;

  const resolvedFillColor = fillColor ?? color;
  const gradientId = `lineGrad_${resolvedFillColor.replace('#', '')}`;

  const activePoint = activeIndex !== undefined ? points[activeIndex] : null;

  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0%" stopColor={resolvedFillColor} stopOpacity="0.4" />
          <Stop offset="100%" stopColor={resolvedFillColor} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path
        d={fillPath}
        fill={`url(#${gradientId})`}
      />
      <Path
        d={linePath}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
      />
      {activePoint && (
        <>
          <Circle
            cx={activePoint.x}
            cy={activePoint.y}
            r="5"
            fill="#000000"
            stroke={color}
            strokeWidth="2.5"
          />
        </>
      )}
    </Svg>
  );
}

export default LineChart;
