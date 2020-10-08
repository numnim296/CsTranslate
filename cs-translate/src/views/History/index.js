import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { auth, db } from '../../firebase'
import { Navigate, NavLink,useNavigate } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { useLocation } from 'react-router'

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
}));

export default function History() {
  const classes = useStyles();
  const location = useLocation();
  console.log('location => ',location.state)
  const [historyData, sethistoryData] = useState([])
 
  useEffect(() => {
    
    db.collection("historyTranslate").where("userID", "==", location.state)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            sethistoryData(state => [...state, doc.data()])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }, [])

  console.log('historydata => ',historyData)

  return (
   <div>hww</div>
  );
}