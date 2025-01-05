"use client"

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { uk } from "date-fns/locale";

interface DatePickerProps {
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
};

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(({ selectedDate, onDateChange, disabled = false }, ref) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal border-blue-300", !selectedDate && "text-muted-foreground")}
        >
          {selectedDate ? format(selectedDate, "LLL dd, y", { locale: uk }) : <span>дд/мм/гггг</span>}
          <CalendarIcon className="mr-2 h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={onDateChange}
          fromYear={1960}
          toYear={2030}
          locale={uk}
        />
      </PopoverContent>
    </Popover>
  );
});

DatePicker.displayName = "DatePicker";
