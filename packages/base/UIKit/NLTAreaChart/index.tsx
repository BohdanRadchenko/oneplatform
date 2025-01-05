"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/UIKit/shadcn/ui/chart";
import { FC } from "react";

export interface IData {
    month: string; 
    [key: string]: number | string;
};

export interface IConfigItem {
    label: string;
    color: string;
};

export interface IConfig {
    [key: string]: IConfigItem;
};

interface IProps {
    data: IData[];
    config: IConfig;
};

export const NLTAreaChart: FC<IProps> = ({ data, config }) => {
    return (
        <ChartContainer config={config} className="h-[350px] w-full">
            <AreaChart data={data} width={808} height={350} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    {Object.entries(config).map(([key, { color }]) => (
                        <linearGradient id={`${key}Gradient`} x1="0" y1="0" x2="0" y2="1" key={key}>
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="none" stroke="gray" strokeWidth={0.5} vertical={true} horizontal={true} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                {Object.entries(config).map(([key, { color }]) => (
                    <Area 
                        key={key} 
                        type="monotone" 
                        dataKey={key} 
                        stroke={color} 
                        fill={`url(#${key}Gradient)`} 
                        strokeWidth={3} 
                    />
                ))}
            </AreaChart>
        </ChartContainer>
    )
};
