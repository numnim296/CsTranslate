import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {Link} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useNavigate, Outlet } from "react-router-dom";
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { LocalDiningOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [tokenUser, settokenUser] = useState("")
  const logIn = () => {
    // localStorage.removeItem("usertoken");
    navigate(`/app/login`);
};

let jwtToken = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.getIdToken().then(function(idToken) {  // <------ Check this line
          console.log('idtoken',idToken)// It shows the Firebase token now
          settokenUser(idToken)
          return idToken;
      });
    }
  });

const logOut = ()=>{
    firebase.auth().signOut().then(
        navigate(`/app/login`)
    )
}

  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {tokenUser===""?<Button color="inherit" onClick={logIn}>
              Login
          </Button>    :<Button color="inherit" onClick={logOut}>
              Logout
          </Button>  }
                 
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}