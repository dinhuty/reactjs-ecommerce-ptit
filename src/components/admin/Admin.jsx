import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import ProductDB from './ProductDB';
import UserDB from './UserDB';
import Order from './Order';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const drawerWidth = 240;


export default function Admin() {
  const [page, setPage] = React.useState('Products')

  const menuItem = [
    {
      name: 'Products',
      icon: <LocalMallIcon />
    },
    {
      name: 'Users',
      icon: <PersonIcon />
    },
    {
      name: 'Orders',
      icon: <ShoppingCartCheckoutIcon />
    }
  ]
  const drawer = (
    <div>
      <Toolbar>
        <h4>dinhtran@gmail.com</h4>
      </Toolbar>
      <Divider />
      <List>
        {menuItem.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setPage(item.name)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box >
      <CssBaseline />
      <AppBar position="fixed" >
        <Toolbar>
          <h5>Nav bar</h5>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders" >
        <Drawer variant="permanent">
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" >
        <Toolbar />
        {page === 'Products' && <ProductDB />}
        {page === 'Users' && <UserDB />}
        {page === 'Orders' && <Order />}
      </Box>
    </Box>
  );
}
