import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { Button } from "../shadcn/ui/button";
import { useTranslation } from "react-i18next";

interface Option {
    value: string;
    label: string;
};

interface UserSelectProps {
    options: Option[];
    placeholder?: string;
    value: string | undefined;
    onChange: (value: string) => void;
    nullable?: boolean;
};

export const NLTSelect: React.FC<UserSelectProps> = ({ options, placeholder = "Select an option", value, onChange, nullable }) => {
    const { t } = useTranslation('common');

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {nullable ? <Button className="w-full px-2" variant="secondary" size="sm" onClick={() => { onChange(''); }} >
                    {t('clear')}
                </Button> : null}
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
};
