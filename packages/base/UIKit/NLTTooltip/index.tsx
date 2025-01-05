import { FC } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/UIKit/shadcn/ui/tooltip";

interface IProps {
    trigger: React.ReactNode;
    message: string;
    delay: number;
};

export const NLTTooltip: FC<IProps> = ({ trigger, message, delay }) => (
    <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>
            {trigger}
        </TooltipTrigger>
        <TooltipContent className="bg-gray-300 text-black">
            <p>{message}</p>
        </TooltipContent>
    </Tooltip>
);