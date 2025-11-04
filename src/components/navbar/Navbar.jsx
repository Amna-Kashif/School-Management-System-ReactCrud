import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Navbar = (props) => {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const role = localStorage.getItem("role");

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Admission', id: 'admission' },
    { label: 'Faculty', id: 'faculty' },
    { label: 'Vision', id: 'vision' },
    { label: 'Subjects', id: 'subjects' },
    ...(role === 'admin' ? [{ label: 'Dashboard', id: 'dashboard' }] : []),
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const scrollToSection = (id) => {
    if (id === 'dashboard') {
      navigate('/dashboard');
    } else {
      navigate('/home');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src='/Bright-Edge-Logo2.webp' alt="Logo" height='50' />
        <div>BrightEdge</div>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => scrollToSection(item.id)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {role === 'student' && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
              <ExitToAppIcon sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <Navbar />
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: '#333', px: 3 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
            }}
            >
            <img src="/Bright-Edge-Logo2.webp" alt="Logo" style={{ height: '50px' }} />
            BrightEdge
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
              key={item.id}
                sx={{ color: '#fff', mx: 1 }}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}

            {role === 'student' && (
              <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
                <ExitToAppIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          >
          {drawer}
        </Drawer>
      </nav>
    </Box>
          </>
  );
};

Navbar.propTypes = { window: PropTypes.func };

export default Navbar;
