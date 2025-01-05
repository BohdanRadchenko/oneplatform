'use client'

import { Input } from '@/UIKit/shadcn/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
    placeholder?: string;
    filterSearch: string;
    setFilterSearch: (value: string) => void;
}

export const NLTSearch: FC<IProps> = ({ filterSearch, setFilterSearch, placeholder }) => {
    const { t } = useTranslation('users');
    const [search, setSearch] = useState(filterSearch);
    const { debouncedWrapper } = useDebounce(setFilterSearch, 1000);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedWrapper(e.target.value);
    }

    return (
        <div className="space-y-4">
            <Input
                placeholder={placeholder || t('placeholderUserSearch')}
                value={search}
                onChange={onChange}
            />
        </div>
    )
}