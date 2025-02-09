import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks.ts';
import { unsetUser } from '../../../features/users/usersSlice.ts';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logout());
        dispatch(unsetUser());
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>
                Hello, {user.username}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
