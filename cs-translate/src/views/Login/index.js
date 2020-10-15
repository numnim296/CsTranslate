import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { auth } from '../../firebase'
import { Navigate, useNavigate } from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import * as firebase from 'firebase/app'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">CsTranslate</Link> {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignIn() {
    const classes = useStyles()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [currentUser, setcurrentUser] = useState()
    const [status, setstatus] = useState()
    const navigate = useNavigate()
    let jwtToken

    const HandleonSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                setcurrentUser(res.user)
                console.log(res.user.uid)
                firebase.firestore()
                    .collection('users')
                    .doc(`${res.user.uid}`)
                    .get()
                    .then(function (doc) {
                        if (doc.exists) {
                            setstatus(doc.data().status)
                            localStorage.setItem("user", doc.data().status);
                        } else {
                            console.log('No such document!')
                        }
                    })
                    .catch(function (error) {
                        console.log('Error getting document:', error)
                    })
            })
            .catch((err) => console.log(err))
    }

      if (currentUser) {
        if(status === 'admin'){
          return <Navigate to="/admin" state={`${currentUser.uid}`} />
        }else if(status === 'user'){
          return <Navigate to="/trans" state={`${currentUser.uid}`} />
        }

    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => {
                        setemail(e.target.value)
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => {
                        HandleonSubmit(e)
                    }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link
                            variant="body2"
                            onClick={() => {
                                navigate('/app/signup')
                            }}
                        >
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}
