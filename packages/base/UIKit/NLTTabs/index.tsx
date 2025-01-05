
import { Tabs, TabsList, TabsTrigger } from "@/UIKit/shadcn/ui/tabs";
import { FC } from "react";

export interface TabItem {
    value: string;
    label: string;
};

interface IProps{
    tabs: TabItem[];
    tab: string;
    handleTabChange: (value: string) => void;
};

export const NLTTabs: FC<IProps> = ({tab, tabs, handleTabChange}) => {
  
    return (
        <Tabs value={tab} onValueChange={handleTabChange}>
            <TabsList className="px-2 py-6 bg-[#E0E7FF] rounded-[6px]">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="h-8">
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
};
