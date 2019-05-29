import React from 'react';
import {
  Drawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ClassIcon from '@material-ui/icons/Class';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { useTheme } from '@material-ui/styles';

const MyDrawer = ({ drawerOpen, classes, setDrawerOpen }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
      open={drawerOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => setDrawerOpen(false)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {[{ title: 'Account', icon: AccountBoxIcon }, { title: 'Subjects', icon: ClassIcon }].map(item => (
          <ListItem button key={item.title}>
            <ListItemIcon><item.icon /></ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MyDrawer;
