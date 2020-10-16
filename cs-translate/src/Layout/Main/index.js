import React ,{useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
import Menu from '@material-ui/core/Menu';
import {MenuItem,Avatar} from '@material-ui/core';


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
  Name:{
    color:"#FFFFFF"
  }
}));

export default function MainAppBar() {
  const storage = firebase.storage().ref()
  const firestore = firebase.firestore()
  const classes = useStyles();
  const navigate = useNavigate();
  const [tokenUser, settokenUser] = useState("")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [uid, setuid] = useState("")
  const [imageUrl, setimageUrl] = useState("")





  const handleClick = (event) => {
    navigate('/setting',{state:uid})
  };

  const logIn = () => {
    // localStorage.removeItem("usertoken");
    navigate(`/app/login`);
};

const getData = (id) =>{
  firestore.collection('users')
    .doc(`${id}`).get()
    .then(function (doc) {
        if (doc.exists) {
            getImage(doc.data().imageName)
            // console.log(doc.data())
        } else {
            console.log('No such document!')
        }
    })
    .catch(function (error) {
        console.log('Error getting document:', error)
    })
}


useEffect(() => {
  jwtToken()
  
}, [])

const jwtToken = () =>{
  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setuid(user.uid)
          user.getIdToken().then(function(idToken) {
              settokenUser(idToken)
              getData(user.uid)
              
          });
        }
      });
}

const getImage = (image) =>{
  storage.child(`${image}`).getDownloadURL().then((url) => {
    setimageUrl(url)
  })
}

const gotoTran = () =>{
  navigate('/trans',{state:`${uid}`})
}

const logOut = ()=>{
  localStorage.removeItem('user')
    firebase.auth().signOut().then(
      
      localStorage.removeItem('user')

  
  ).then(navigate(`/app/login`))

}

  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

        {tokenUser===""?null:
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <Avatar src={imageUrl}></Avatar>
          </IconButton>
           }
         
          <Typography variant="h6" className={classes.title} >
            <Button onClick={e=>{gotoTran()}} className={classes.Name}>
            CsTranslate
              </Button>
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