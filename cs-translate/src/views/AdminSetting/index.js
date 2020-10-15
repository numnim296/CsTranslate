import React, { useEffect, useState } from 'react'
import { makeStyles, Typography, Button,Avatar ,Box,
    
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,} from '@material-ui/core'
import { db } from '../../firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { useLocation,Navigate } from 'react-router'
import * as firebase from 'firebase/app'
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
    avatarImage: {
        margin: "10px",
        width: "160px",
        height: "160px",
        marginBottom: theme.spacing(2)
    },
    chooseImage:{
        marginBottom: theme.spacing(10),
    }
}))

export default function Setting() {
    const classes = useStyles()
    const location = useLocation()
    // const userid = location.state
    const [userid, setuserid] = useState("")
    const storage = firebase.storage()
    console.log('ggg', userid)
    const [imageUrl, setimageUrl] = useState("")
    const [imageName, setimageName] = useState("")
    const [dis, setDis] = useState(true);
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setuid] = useState("")

    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [selectedFile, setSelectedFile] = useState('')

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
        setSelectedFile(file)
        setFileInputState(e.target.value)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const handleClickUpdate = (e) => {
        storage
            .ref(`${selectedFile.name}`)
            .put(selectedFile)
            .then((res) => {
                editImage()
            })
    }

    const jwtToken = () =>{
        firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                  setuserid(user.uid)
                setuid(user.uid)
                getData(user.uid)
              }
            });
      }

      const getData = (id) =>{
        db.collection('users')
            .doc(`${id}`).get()
            .then(function (doc) {
                if (doc.exists) {
                    setFistName(doc.data().fname)
                    setLastName(doc.data().lname)
                    setEmail(doc.data().email)
                    setimageName(doc.data().imageName)
                    getImage(doc.data().imageName)
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


    const getImage = (image) =>{
        firebase.storage().ref().child(`${image}`).getDownloadURL().then((url) => {
          setimageUrl(url)
        })
      }


    const editImage =() =>{
        firebase
        .firestore()
        .collection('users')
        .doc(`${userid}`)
        .update({
            fname:firstName,
            lname:lastName,
            imageName:selectedFile.name
        })
        .then(function () {
            swal({
                title: "success",
                text: "  ",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
                button: false
            }).then(() => {
                setTimeout(() => {
                    window.location.reload(false);
                }, 200);
            });
        })
        .catch(function (error) {
            swal({
                title: "ไม่สามารถแก้ไขได้โปรดลองอีกครั้ง",
                text: "  ",
                icon: "error",
                timer: 1800,
                showConfirmButton: false,
                button: false
            }).then(() => {
                setTimeout(() => {
                    window.location.reload(false);
                }, 200);
            });
        })
    }

    const editData = () =>{
        firebase
        .firestore()
        .collection('users')
        .doc(`${userid}`)
        .update({
            fname:firstName,
            lname:lastName,
        })
        .then(function () {
            swal({
                title: "success",
                text: "  ",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
                button: false
            }).then(() => {
                setTimeout(() => {
                    window.location.reload(false);
                }, 200);
            });
        })
        .catch(function (error) {
            swal({
                title: "ไม่สามารถแก้ไขได้โปรดลองอีกครั้ง",
                text: "  ",
                icon: "error",
                timer: 1800,
                showConfirmButton: false,
                button: false
            }).then(() => {
                setTimeout(() => {
                    window.location.reload(false);
                }, 200);
            });
        })
    }
      

    if (localStorage.user === 'admin') {
        return (
        <div>
            

                <Card>
                <CardHeader subheader="Profile" />
                <Divider />
                <CardContent>
                <Grid container justify="center">
                {previewSource !== '' ? (
                    <Avatar
                    src={previewSource}
                    className={classes.avatarImage}
                />
                ) : (
                    <div>
                        <Avatar
                            src={imageUrl}
                            className={classes.avatarImage}
                        />
                    </div>
                )}
                    
                    </Grid>
                    <Typography align="center">
                    <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    className={classes.chooseImage}
                    onChange={(e) => {
                        handleFileInputChange(e)

                        setDis(false);
                    }}
                    value={fileInputState}
                >
                    เลือกรูปภาพ
                    <input
                        type="file"
                        style={{
                            display: 'none',
                        }}
                    />
                </Button>
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="firstname"
                                name="firstName"
                                onChange={e => {
                                    setFistName(e.target.value);
                                    setDis(false);
                                }}
                                required
                                value={firstName}
                                variant="outlined"
                                // className={clsx(classes.root)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="lastname"
                                name="lastName"
                                onChange={e => {
                                    setLastName(e.target.value);
                                    setDis(false);
                                }}
                                required
                                value={lastName}
                                variant="outlined"
                            />
                        </Grid>
                        {/* <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="email"
                                name="email"
                                onChange={e => {
                                    setEmail(e.target.value);
                                    setDis(false);
                                }}
                                required
                                value={email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="password"
                                name="password"
                                onChange={e => {
                                    setPassword(e.target.value);
                                    setDis(false);
                                }}
                                value={password}
                                variant="outlined"
                            />
                        </Grid> */}
                        </Grid></CardContent>
                        <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={e=>{
                            if(selectedFile != ""){
                                handleClickUpdate()
                            }else{
                                editData()
                            }
                        }}
                        disabled={dis}
                    >
                        บันทึกการแก้ไข
                    </Button>
                </Box>
                        
                        </Card>
        </div>
    )
    } else if (localStorage.user === 'user') {
        return <Navigate to="/setting"></Navigate>
    } else {
        return <Navigate to="/app/login"></Navigate>
    }



    
}
