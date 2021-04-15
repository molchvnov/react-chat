import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import { React, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justify={'flex-end'}>
          {user ? (
            <Button onClick={() => auth.signOut()} variant="outlined" color="inherit">
              Logout
            </Button>
          ) : (
            <NavLink style={{ color: 'white', textDecoration: 'none' }} to={LOGIN_ROUTE}>
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
