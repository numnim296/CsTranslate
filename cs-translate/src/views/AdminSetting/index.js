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
import { useLocation } from 'react-router'
import * as firebase from 'firebase/app'

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
    const userid = location.state
    const storage = firebase.storage()
    console.log('ggg', userid)
    const [imageUrl, setimageUrl] = useState("")
    const [imageName, setimageName] = useState("")
    const [dis, setDis] = useState(true);
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    useEffect(() => {
        db.collection('users')
            .doc(`${userid}`).get()
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
            console.log('edit imageName complete')
        })
        .catch(function (error) {
            console.error('Error writing document: ', error)
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
            console.log('edit user complete')
        })
        .catch(function (error) {
            console.error('Error writing document: ', error)
        })
    }
      
    return (
        <div>
            {/* <Typography align="center">
                {previewSource !== '' ? (
                    // <img src={previewSource} width="170"></img>
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
            </Typography>
            <Typography align="center">
                <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    className={classes.chooseImage}
                    onChange={(e) => {
                        handleFileInputChange(e)
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
            <Button
                onClick={(e) => {
                    handleClickUpdate(e)
                }}
            >
                บันทึก
            </Button> */}

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
}
