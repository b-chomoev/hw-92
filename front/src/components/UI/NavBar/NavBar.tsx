import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const NavBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}} color='secondary'>
      <Toolbar>
        <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
          <Link to={'/'}>Microsoft Teams</Link>
        </Typography>

        {user ?
          <>
            <UserMenu user={user}/>
          </>
          :
          <>
            <AnonymousMenu/>
          </>
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;