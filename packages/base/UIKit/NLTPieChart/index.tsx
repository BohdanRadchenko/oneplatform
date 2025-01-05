"use client";

import { PieChart, Pie, ResponsiveContainer, Label } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/UIKit/shadcn/ui/chart";
import { Fragment } from "react/jsx-runtime";
import { FC } from "react";

export interface IDataItem {
    name: string;
    value: number;
    fill: string;
};

export interface IConfigItem {
    label: string;
    color: string;
};

export interface IConfig {
    [key: string]: IConfigItem;
};

interface IProps {
    data: IDataItem[];
    config: IConfig;
    label: string;
};

export const NLTPieChart: FC<IProps> = ({ data, config, label }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <ChartContainer config={config}>
            <Fragment>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={data} cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" paddingAngle={2} dataKey="value">
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    {label}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Fragment>
        </ChartContainer>
    );
};