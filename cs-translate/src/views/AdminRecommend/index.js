import React, { useEffect, useState } from 'react'
import { makeStyles, TextField, Button, Typography } from '@material-ui/core'
import socketIOClient from 'socket.io-client'

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
    }

    return (
        <div>
            <TextField
                className={classes.TextFieldclass}
                id="outlined-multiline-static"
                label="คำศัพท์ที่อยากจะแนะนำ"
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
                    แนะนำ
                </Button>
            </Typography>
        </div>
    )
}
