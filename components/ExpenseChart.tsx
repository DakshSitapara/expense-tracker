'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Expense } from '@/types/expense';

interface ExpenseChartProps {
  expenses: Expense[];
}

const categoryColors: Record<string, string> = {
  Food: '#84cc16',
  Travel: '#22d3ee',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Other: '#6b7280',
};

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [chartSize, setChartSize] = useState({ outerRadius: 140, innerRadius: 60 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
      fill: categoryColors[category] || categoryColors.Other,
    }));
  }, [expenses]);

  useEffect(() => {
    setIsChartLoading(true);
    const timer = setTimeout(() => setIsChartLoading(false), 300);
    return () => clearTimeout(timer);
  }, [expenses]);

  useEffect(() => {
    const updateChartSize = () => {
      const isMobile = window.innerWidth < 640;
      setChartSize({
        outerRadius: isMobile ? 100 : 140,
        innerRadius: isMobile ? 40 : 60,
      });
    };
    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    const toRad = (angle: number) => (angle * Math.PI) / 180;

    return (
      <g filter="drop-shadow(0px 0px 8px rgba(0,0,0,0.3))">
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill={fill}
          fontSize={14}
          fontWeight={700}
        >
          {payload?.category ?? 'Expense'}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill={fill}
          fontSize={12}
        >
          ₹{payload?.total?.toFixed(2) ?? '0.00'}
        </text>
        <path
          d={`M${cx},${cy - innerRadius}
             A${innerRadius},${innerRadius} 0 0,1 ${cx + innerRadius * Math.cos(toRad(startAngle))},${cy + innerRadius * Math.sin(toRad(startAngle))}
             A${innerRadius},${innerRadius} 0 0,0 ${cx + innerRadius * Math.cos(toRad(endAngle))},${cy + innerRadius * Math.sin(toRad(endAngle))} Z`}
          fill={fill}
          opacity={0.3}
        />
        <path
          d={`M${cx},${cy - outerRadius * 1.1}
             A${outerRadius * 1.1},${outerRadius * 1.1} 0 0,1 ${cx + outerRadius * 1.1 * Math.cos(toRad(startAngle))},${cy + outerRadius * 1.1 * Math.sin(toRad(startAngle))}
             A${outerRadius * 1.1},${outerRadius * 1.1} 0 0,0 ${cx + outerRadius * 1.1 * Math.cos(toRad(endAngle))},${cy + outerRadius * 1.1 * Math.sin(toRad(endAngle))} Z`}
          fill={fill}
        />
      </g>
    );
  };

  if (!data.length) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        No expenses to display.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
        Expenses by Category
      </h3>

      {isChartLoading ? (
        <div className="h-[400px] sm:h-[450px] flex items-center justify-center">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      ) : (
        <div className="h-[400px] sm:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={chartSize.outerRadius}
                innerRadius={chartSize.innerRadius}
                label={({ name, percent }: { name?: string; percent?: number }) =>
                  `${name ?? ''} (${percent ? (percent * 100).toFixed(1) : '0.0'}%)`
                }
                labelLine={{ stroke: 'var(--foreground)', strokeWidth: 1 }}
                animationDuration={800}
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke={entry.fill}
                    strokeWidth={2}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`₹${Number(value).toFixed(2)}`, name]}
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                labelStyle={{
                  color: 'var(--foreground)',
                  fontWeight: 600,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 10, color: 'var(--foreground)' }}
                formatter={(value) => (
                  <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
