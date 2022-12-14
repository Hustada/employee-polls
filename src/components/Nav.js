import React from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setAuthedUser, logout  } from '../actions/authedUser';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import PollIcon from '@mui/icons-material/Poll';
import { useState, useEffect } from "react";
import { Settings } from "@mui/icons-material";

const settings = ['Logout'];
// An array of strings representing the settings available in the app

const routes = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard'
  },
  {
    name: 'Add',
    path: '/add'
  }
]
// An array of objects representing the routes available in the app.
// Each object has a 'name' property and a 'path' property.


const Nav = ({ authedUser, dispatch }, props) => {
  // Declare state variables for the nav and user menus
  const [userSetting, setUserSetting] = useState('')
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // This function handles setting changes (e.g. logout)
  const handleSettings = (e) => {
    // Get the setting value from the data attribute of the clicked element
    const { settingValue } = e.currentTarget.dataset;
    // If the setting value is 'Logout', dispatch the setAuthedUser action to remove the authedUser from the state and navigate to the home page
    if(settingValue === 'Logout') {
      dispatch(setAuthedUser(null));
      navigate('/');
    }
  }

  // These functions handle opening and closing the nav and user menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Get the avatar URL for the authedUser
  const avatar = authedUser.avatarURL;


  return (
    <AppBar sx={{bgcolor: "black" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PollIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Employee Polls
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.map(({ name, path }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PollIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Employee Polls
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map(({ name, path }) => (
              <Button
                key={name}
                onClick={handleCloseNavMenu, () => navigate(`${path}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar data-testid="avatar" alt="avatar" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem data-setting-value={setting} key={setting} 
                  onClick={handleSettings}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = ( { authedUser, dispatch }, props ) => {
  return {
    authedUser,
    dispatch,
  };
}
export default connect(mapStateToProps)(Nav);
