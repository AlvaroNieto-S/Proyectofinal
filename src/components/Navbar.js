import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './assets/logo.png';
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {useStateValue} from '../StateProvider';
import { auth } from '../Firebase';
import {useHistory} from 'react-router-dom';
import { actionTypes } from '../reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  AppBar:{
      backgroundColor: "white",
      boxShadow: "none",
  },
  grow:{
      flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [{basket,user},dispatch] = useStateValue(); 
  const history = useHistory();

  const handleClick = ()=>{
    if(user){
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      })
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      })
      history.push('/');
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <img src = {logo}  width="50" height="50"/>
            </IconButton>
          </Link>
          <Typography variant="h6" color="textPrimary" component="p">
            Shiro Store       Hola {user ? user.email : "Usuario"}
          </Typography>
          <div className = {classes.grow} />
          <div className= {classes.Button}>
              <Link to="/signin">
                <Button variant="outlined" onClick = {handleClick}>
                  <strong>
                      {user ? "Sign Out" : "Sign in"}
                  </strong>
                </Button>
              </Link>
            <Link to="/cart">
            <IconButton aria-label="Show Cart Items" color="inherit">
                <Badge badgeContent = {basket?.length} color = "secondary">
                    <ShoppingCart frontSize="large" color="primary"/>    
                </Badge>    
            </IconButton> 
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
