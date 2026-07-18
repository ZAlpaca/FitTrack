import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export interface BarItem {
  value: number;
  label?: string;
}

interface BarChartProps {
  data: BarItem[];
  activeIndex?: number;
  color?: string;
  height?: number;
}

function roundTopRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): string {
  if (h < r) r = h;
  return [
    `M ${x + r},${y}`,
    `L ${x + w - r},${y}`,
    `A ${r},${r} 0 0,1 ${x + w},${y + r}`,
    `L ${x + w},${y + h}`,
    `L ${x},${y + h}`,
    `L ${x},${y + r}`,
    `A ${r},${r} 0 0,1 ${x + r},${y}`,
    'Z',
  ].join(' ');
}

export function BarChart({
  data,
  activeIndex,
  color = '#CCFF00',
  height = 144,
}: BarChartProps) {
  if (data.length === 0) return null;

  const viewWidth = 100;
  const viewHeight = 100;
  const padding = 2;
  const borderRadius = 4;
  const barSpacing = padding;
  const totalSpacing = barSpacing * (data.length - 1);
  const barWidth = (viewWidth - totalSpacing) / data.length;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const gradientId = `barGrad_${color.replace('#', '')}`;

  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </LinearGradient>
      </Defs>
      {data.map((item, index) => {
        const x = index * (barWidth + barSpacing);
        const barHeight =
          ((item.value - minValue) / range) * (viewHeight - padding * 2);
        const y = viewHeight - padding - barHeight;
        const isActive = activeIndex === index;

        return (
          <Path
            key={index}
            d={roundTopRectPath(x, y, barWidth, barHeight, borderRadius)}
            fill={isActive ? color : `url(#${gradientId})`}
            opacity={isActive ? 1 : 0.4}
          />
        );
      })}
    </Svg>
  );
}

export default BarChart;
