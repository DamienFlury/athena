import React from 'react';
import {
  Drawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClassIcon from '@material-ui/icons/Class';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { useTheme } from '@material-ui/styles';
import { Link } from 'react-router-dom';

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
        <ListItem button component={Link} to="exams">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Exams" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ClassIcon /></ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItem>
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
