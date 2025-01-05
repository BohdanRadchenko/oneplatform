import { FC } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Checkbox } from "../shadcn/ui/checkbox";

interface ICheckboxProps {
    form: any;
    formLabel: string;
    name: string;
    disabled?: boolean;
};

export const NLTCheckboxField: FC<ICheckboxProps> = ({ form, formLabel, name, disabled }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: any) => (
                <FormItem>
                    <FormControl>
                        <div className="flex items-center gap-2 mt-4">
                            <Checkbox  {...field} checked={field.value || false} onCheckedChange={field.onChange} disabled={disabled} />
                            <FormLabel>{formLabel}</FormLabel>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
