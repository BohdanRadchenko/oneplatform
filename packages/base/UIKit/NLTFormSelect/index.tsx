import { FC } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { useTranslation } from "react-i18next";
import { Button } from "../shadcn/ui/button";

interface IProps {
    form: any;
    formLabel: string;
    name: string;
    options: { value: string, label: string }[];
    placeholder?: string;
    nullable?: boolean;
}

export const NLTFormSelect: FC<IProps> = ({ form, formLabel, name, placeholder, options, nullable }) => {
    const { t } = useTranslation('common');

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: any) => (
                <FormItem>
                    <FormLabel>{formLabel}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {nullable ? <Button className="w-full px-2" variant="secondary" size="sm" onClick={() => { form.setValue(name, null); }} >
                                {t('clear')}
                            </Button> : null}
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
