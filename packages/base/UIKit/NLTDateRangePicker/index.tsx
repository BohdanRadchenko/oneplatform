import React, { FC } from 'react';
import { DateRange } from 'react-day-picker';
import { endOfDay, format, startOfDay } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../shadcn/ui/calendar';
import { useWindowSize } from '@/hooks/useWindowSize';

export type DateRangePickerProps = React.HTMLAttributes<HTMLDivElement> & {
    range: DateRange | undefined,
    onRangeChange: (range: DateRange | undefined) => void,
}

export const DateRangePicker: FC<DateRangePickerProps> = ({ range, onRangeChange, className, }) => {
    const { isMobile } = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);
    const [pickerRange, setPickerRange] = useState<DateRange | undefined>(range);

    const onOpenChange = (open: boolean) => {
        if (open) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const closePicker = () => {
        setIsOpen(false);
    };

    const onSubmitPicker = () => {
        onRangeChange(pickerRange as DateRange);
        closePicker();
    };

    const handleRangeChange = (range: DateRange | undefined) => {
        if (range) {
            const adjustedRange = {
                from: range.from ? startOfDay(range.from) : undefined,
                to: range.to ? endOfDay(range.to) : undefined,
            };
            setPickerRange(adjustedRange);
        } else {
            setPickerRange(undefined);
        }
    };

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover open={isOpen} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                    <Button id="date" variant="outline" className={'w-[50px] sm:w-[220px] h-[40px] justify-start text-left font-normal'}>
                        <CalendarIcon className="sm:mr-2 h-4 w-4" />
                        {isMobile ? null : range?.from ? (
                            range.to
                                ? (<>{format(range.from, 'LLL dd, y')}{' '}-{' '}{format(range.to, 'LLL dd, y')}</>)
                                : (format(range.from, 'LLL dd, y'))
                        ) : (<span>Pick a date</span>)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        // initialFocus
                        mode="range"
                        selected={pickerRange}
                        onSelect={handleRangeChange}
                        numberOfMonths={2}
                    />
                    {!!pickerRange && (
                        <div className="px-5 pb-4 flex justify-end">
                            <Button disabled={!range?.from || !range?.to} onClick={onSubmitPicker}>
                                Apply
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
};

