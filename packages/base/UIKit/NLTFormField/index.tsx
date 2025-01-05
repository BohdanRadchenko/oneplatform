import { FC } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { Textarea } from "../shadcn/ui/textarea";

interface IProps {
    form: any;
    formLabel: string;
    type?: string;
    name: string;
    placeholder?: string;
    textArea?: boolean;
}

export const NLTFormField: FC<IProps> = ({ form, formLabel, type, name, placeholder, textArea }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: any) => (
                <FormItem>
                    <FormLabel>{formLabel}</FormLabel>
                    <FormControl>
                        {textArea
                            ? <Textarea type={type} placeholder={placeholder} {...field} />
                            : <Input type={type} placeholder={placeholder} {...field} />}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
