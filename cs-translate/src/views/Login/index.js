import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Navigate } from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import * as firebase from 'firebase/app'
import GoogleButton from 'react-google-button'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        CsTranslate Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.flaticon.com/svg/static/icons/svg/1372/1372756.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  google:{
      marginTop:theme.spacing(6)
  },typography:{
    marginTop:theme.spacing(3)
  }
}));

export default function SignInSide() {
  const classes = useStyles();
    const [currentUser, setcurrentUser] = useState()
    const [status, setstatus] = useState()

    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider()


    const signIn = (e) => {
                auth.signInWithPopup(e).then((res) => {
                        firebase.firestore().collection("users").doc(res.user.uid).set({
                            fname:"",
                            lname:"",
                            userID:res.user.uid,
                            email:res.user.email,
                            status:"user"
                        })
                        .then(function() {
                            setcurrentUser(res.user)
                            firebase
                            .firestore()
                            .collection('users')
                            .doc(`${res.user.uid}`)
                            .get()
                            .then(function (doc) {
                                if (doc.exists) {
                                    setstatus(doc.data().status)
                                    localStorage.setItem('user', doc.data().status)
                                } else {
                                    console.log('No such document!')
                                }
                            })
                            .catch(function (error) {
                                console.log('Error getting document:', error)
                            })
        
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
        
                        
                }).catch((error) => {
                  console.log(error.message)
                })
              }

    if (currentUser) {
        if (status === 'admin') {
            return <Navigate to="/admin" state={`${currentUser.uid}`} />
        } else if (status === 'user') {
            return <Navigate to="/trans" state={`${currentUser.uid}`} />
        }
    }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
           <Typography className={classes.typography}>

Website for all languages ​​for learning.
           </Typography>
          <GoogleButton className={classes.google} onClick={e=>{signIn(googleProvider)}}/>
            
            <Box mt={20}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
  );
}