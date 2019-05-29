import React from 'react';
import {
  AppBar, Toolbar, Button, Typography, Box, IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';


const NavBar = ({
  classes, drawerOpen, setDrawerOpen, setDialogOpen,
}) => (
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: drawerOpen,
    })}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={() => setDrawerOpen(true)}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: drawerOpen,
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">Athena</Typography>
      <Box flex="1" />
      <Button onClick={() => setDialogOpen(true)} color="inherit">New Exam</Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
