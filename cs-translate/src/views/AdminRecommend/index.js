import React, {  useState } from 'react'
import { makeStyles, TextField, Button, Typography } from '@material-ui/core'
import socketIOClient from 'socket.io-client'

import swal from "sweetalert";


const useStyles = makeStyles((theme) => ({
    TextFieldclass: {
        marginTop: theme.spacing(10),
    },
    margin:{
        marginTop: theme.spacing(6),
    }
}))

export default function Recommend() {
    const classes = useStyles()
    const [vocab, setvocab] = useState("")
    const socket = socketIOClient("http://localhost:4030")
    const handleOnChange = (e) =>{
        setvocab(e.target.value)
    }
    const handleOnClick = () =>{


        socket.emit('sent-message', vocab)
        swal({
            title: "You have successfully introduced",
            text: "  ",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
            button: false
        }).then(() => {
            setTimeout(() => {
                
            }, 200);
        });
    }

    return (
        <div>
            <TextField
                className={classes.TextFieldclass}
                id="outlined-multiline-static"
                label="Words that would like to introduce"
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                onChange={(e) => {
                    handleOnChange(e)
                }}
            />
            <Typography align="center">
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.margin}
                    disabled={vocab===""?true:false}
                    onClick={
                        e=>{
                            handleOnClick()
                        }
                    }
                >
                    introduce
                </Button>
            </Typography>
        </div>
    )
}
