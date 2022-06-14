import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AppNavigationBar() {
    return (
      <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }} >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" enableColorOnDark>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ThumbsUpDownIcon color='secondary' fontSize='inherit' style={{fontSize: "32px"}}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              r8MyCourses
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      </NavLink>
    );
  }