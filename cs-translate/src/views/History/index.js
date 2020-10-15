import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { db } from '../../firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { useLocation, Navigate } from 'react-router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import * as firebase from 'firebase/app'

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
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

export default function History() {
    const classes = useStyles()
    const location = useLocation()
    const [historyData, sethistoryData] = useState([])
    const [uid, setuid] = useState("")
    const jwtToken = () =>{
        firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                setuid(user.uid)
                getData(user.uid)
              }
            });
      }

      const getData = (id) =>{
        db.collection('historyTranslate')
            .where('userID', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    sethistoryData((state) => [...state, doc.data()])
                })
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
            })
      }

    useEffect(() => {
        jwtToken()
    }, [])

    if (localStorage.user === 'user') {
        return (
            <List
                component="nav"
                className={classes.root}
                aria-label="mailbox folders"
            >
                {historyData.map((res) => (
                    <div>
                        <ListItem button>
                            <ListItemText
                                primary={res.sourceLanguage}
                                secondary={res.destinationLanguage}
                            />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        )
    } else if (localStorage.user === 'admin') {
        return <Navigate to="/admin/history"></Navigate>
    } else {
        return <Navigate to="/app/login"></Navigate>
    }
}
