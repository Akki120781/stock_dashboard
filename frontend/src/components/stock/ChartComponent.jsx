import React, { useContext } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { ThemeContext } from '../../context/ThemeContext';

const ChartComponent = ({ data, symbol }) => {
    const { theme } = useContext(ThemeContext);

    const isDark = theme === 'dark';
    const strokeColor = isDark ? '#818cf8' : '#4f46e5';
    const fillColor = isDark ? '#4f46e5' : '#818cf8';
    const gridColor = isDark ? '#374151' : '#e5e7eb';
    const textColor = isDark ? '#9ca3af' : '#6b7280';

    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No historical data available for {symbol}.
            </div>
        );
    }

    return (
        <div className="w-full h-[400px] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {symbol} Historical Performance (30 Days)
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis
                            dataKey="date"
                            stroke={textColor}
                            tick={{ fill: textColor }}
                            tickMargin={10}
                            minTickGap={30}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            stroke={textColor}
                            tick={{ fill: textColor }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                                color: isDark ? '#f3f4f6' : '#111827',
                                borderRadius: '0.5rem',
                            }}
                            itemStyle={{ color: strokeColor }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={strokeColor}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartComponent;
