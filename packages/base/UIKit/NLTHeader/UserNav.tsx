import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage, } from '../shadcn/ui/avatar'
import { Button } from '../shadcn/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '../shadcn/ui/dropdown-menu'
import { observer } from 'mobx-react-lite';
import { useUser } from '@/hooks/useUser'
import { useTranslation } from 'react-i18next';
import { userModel } from '@/entities/User/UserModel';
import { useNavigate } from 'react-router-dom';

export const UserNav: FC = observer(() => {
    const { user } = useUser();
    const { t } = useTranslation('profile');
    const navigate = useNavigate();

    const avatarFallback = user ? (user?.first_name?.charAt(0) + user?.last_name?.charAt(0)) : '';

    const onProfile = () => {
        navigate('/profile');
    }

    const onLogOut = () => {
        navigate('/sign-in');
        userModel.clear();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative bg-border h-8 w-8 rounded-full ml-4">
                    <Avatar className="h-8 w-8">
                    <AvatarImage className="h-8 w-8 rounded-full object-cover" src={user?.image?.path} alt="Profile picture" />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onProfile}>{t('profile')}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogOut}>{t('signOut')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})