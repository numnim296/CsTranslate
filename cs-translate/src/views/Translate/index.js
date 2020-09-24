import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, Box, Grid } from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttonTran: {
        backgroundColor: '#FAD200',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}))

const API_URL =
    'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCl0JfWdDiBZO30bbgfaGcJ5ys4gX_zqZI&q=hello, how are you? &target=th&source=en'

function MainPage() {
    const classes = useStyles()
    const [traned, setTraned] = useState('')
    const [tran, setTran] = useState('')
    const [Ltarget, setLtarget] = useState('th')
    const [Lsource, setLsource] = useState('en')
    const [FullTarget, setFullTarget] = useState('Thai')
    const [FullSource, setFullSource] = useState('English')


    function fetchAPI(e) {
        e.preventDefault()
        console.log('click submit', tran)
        const fetchApi = async () => {
            const API_URL = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyCl0JfWdDiBZO30bbgfaGcJ5ys4gX_zqZI&q=${tran}&target=${Ltarget}&source=${Lsource}`
            const response = await axios.get(API_URL)
            console.log(
                response.data['data']['translations'][0]['translatedText']
            )
            setTraned(
                response.data['data']['translations'][0]['translatedText']
            )
        }

        fetchApi()
    }

    function handleOnChange(e) {
        setTran(e.target.value)
    }

    const [value, setValue] = React.useState('Controlled')

  
    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            {...bindTrigger(popupState)}
                        >
                            Target
                        </Button>
                        <Typography>-> {FullSource}</Typography>
                        <Popover
                            {...bindPopover(popupState)}
                            // anchorOrigin={{
                            //     vertical: 'bottom',
                            //     horizontal: 'center',
                            // }}
                            // transformOrigin={{
                            //     vertical: 'top',
                            //     horizontal: 'center',
                            // }}
                        >
                            <Box p={20}>
                                <Grid container spacing={3}>
                                    {/* <Grid item xs={6} sm={3}>
                                        <Button onClick={e=>{
                                          popupState.close()
                                          LsourceSet('th')
                                          }}>thai</Button>
                                    </Grid> */}
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('af')
                                                setFullSource('Afrikaans')
                                            }}
                                        >
                                            Afrikaans
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sq')
                                                setFullSource('Albanian')
                                            }}
                                        >
                                            Albanian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('am')
                                                setFullSource('Amharic')
                                            }}
                                        >
                                            Amharic
                                        </Button>
                                    </Grid>

                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ar')
                                                setFullSource('Arabic')
                                            }}
                                        >
                                            Arabic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('hy')
                                                setFullSource('Armenian')
                                            }}
                                        >
                                            Armenian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('az')
                                                setFullSource('Azerbaijani')
                                            }}
                                        >
                                            Azerbaijani
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
            <form>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Text Input"
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                    />
                </div>
            </form>
            <Typography align="center">
                <Button onClick={fetchAPI} className={classes.buttonTran}>
                    Translate
                </Button>
            </Typography>

            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            {...bindTrigger(popupState)}
                        >
                            Source
                        </Button>
                        <Typography>-> {FullTarget}</Typography>
                        <Popover
                            {...bindPopover(popupState)}
                            // anchorOrigin={{
                            //     vertical: 'bottom',
                            //     horizontal: 'center',
                            // }}
                            // transformOrigin={{
                            //     vertical: 'top',
                            //     horizontal: 'center',
                            // }}
                        >
                            <Box p={20}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('en')
                                                setFullTarget('English')
                                            }}
                                        >
                                            englist
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>

            <form>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Text Output"
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                        value={traned}
                    />
                </div>
            </form>
        </div>
    )
}

export default MainPage
