"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/UIKit/shadcn/ui/form";
import { DatePicker } from "../shadcn/ui/date-picker";

interface DatePickerWithRangeProps {
    form: any;
    formLabel: string;
    name: string;
    disabled?: boolean;
};

export function NLTDatePicker({ form, name, formLabel, disabled }: DatePickerWithRangeProps) {

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: any) => (
                <FormItem>
                    <FormLabel>{formLabel}</FormLabel>
                    <FormControl>
                        <DatePicker selectedDate={field.value} onDateChange={field.onChange} disabled={disabled}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};
