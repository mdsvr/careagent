'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { WeeklyMetric } from '@/lib/data';
import { CustomChartTooltip } from './CustomChartTooltip';

interface ToneDistributionChartProps {
  data: WeeklyMetric[];
}

export function ToneDistributionChart({ data }: ToneDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220 20% 16%)" />
        <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} unit="%" />
        <Tooltip content={<CustomChartTooltip />} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="positive" name="Positive" fill="#10b981" radius={[3, 3, 0, 0]} stackId="tone" />
        <Bar dataKey="neutral"  name="Neutral"  fill="#6366f1" radius={[0, 0, 0, 0]} stackId="tone" />
        <Bar dataKey="negative" name="Negative" fill="#ef4444" radius={[0, 0, 0, 0]} stackId="tone" />
      </BarChart>
    </ResponsiveContainer>
  );
}
