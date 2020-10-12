import React, { useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
} from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useNavigate, useLocation } from 'react-router'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import NavigationIcon from '@material-ui/icons/Navigation'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttonTran: {
        // backgroundColor: '#00b0ff',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    TextFieldclass: {
        marginTop: theme.spacing(3),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    position: {
        marginTop: theme.spacing(3),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    },
}))


function MainPage() {
    const classes = useStyles()
    const [traned, setTraned] = useState('')
    const [tran, setTran] = useState('')
    const [Ltarget, setLtarget] = useState('th')
    const [Lsource, setLsource] = useState('en')
    const [FullTarget, setFullTarget] = useState('Thai')
    const [FullSource, setFullSource] = useState('English')
    const location = useLocation()
    const navigate = useNavigate();
    console.log("kjki",location.state)

    function fetchAPI(e) {
        e.preventDefault()
        const fetchApi = async () => {
            const API_URL = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyCl0JfWdDiBZO30bbgfaGcJ5ys4gX_zqZI&q=${tran}&target=${Ltarget}&source=${Lsource}`
            const response = await axios.get(API_URL)

            setTraned(
                response.data['data']['translations'][0]['translatedText']
            )
            addDataHistory(
                response.data['data']['translations'][0]['translatedText']
            )
        }

        fetchApi()
    }
    function toHistory(){
        navigate('/history',{state:`${location.state}`})

    }

    function handleOnChange(e) {
        setTran(e.target.value)
    }
    function addDataHistory(trancomplete) {
        firebase
            .firestore()
            .collection('historyTranslate')
            .doc()
            .set({
                destinationLanguage: trancomplete,
                sourceLanguage: tran,
                userID: location.state,
            })
            .then(function () {
                console.log('add history complete')
            })
            .catch(function (error) {
                console.error('Error writing document: ', error)
            })
    }

    return (
        <div className={classes.position}>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Grid container spacing={0}>
                            <Grid item xs={1} sm={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    {...bindTrigger(popupState)}
                                >
                                    Source
                                </Button>
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button variant="outlined" color="primary">
                                    {FullSource}
                                </Button>
                            </Grid>
                        </Grid>

                        <Popover
                            {...bindPopover(popupState)}
                        >
                            <Box p={20}>
                                <Grid container spacing={3}>
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
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('eu')
                                                setFullSource('Basque')
                                            }}
                                        >
                                            Basque
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('be')
                                                setFullSource('Belarusian')
                                            }}
                                        >
                                            Belarusian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('bn')
                                                setFullSource('Bengali')
                                            }}
                                        >
                                            Bengali
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('bs')
                                                setFullSource('Bosnian')
                                            }}
                                        >
                                            Bosnian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('bg')
                                                setFullSource('Bulgarian')
                                            }}
                                        >
                                            Bulgarian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ca')
                                                setFullSource('Catalan')
                                            }}
                                        >
                                            Catalan
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ceb')
                                                setFullSource('Cebuano')
                                            }}
                                        >
                                            Cebuano
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('zh-CN')
                                                setFullSource(
                                                    'Chinese (Simplified)'
                                                )
                                            }}
                                        >
                                            Chinese (Simplified)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('zh-TW')
                                                setFullSource(
                                                    'Chinese (Traditional)'
                                                )
                                            }}
                                        >
                                            Chinese (Traditional)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('co')
                                                setFullSource('Corsican')
                                            }}
                                        >
                                            Corsican
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('hr')
                                                setFullSource('Croatian')
                                            }}
                                        >
                                            Croatian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('cs')
                                                setFullSource('Czech')
                                            }}
                                        >
                                            Czech
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('da')
                                                setFullSource('Danish')
                                            }}
                                        >
                                            Danish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('nl')
                                                setFullSource('Dutch')
                                            }}
                                        >
                                            Dutch
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('en')
                                                setFullSource('English')
                                            }}
                                        >
                                            English
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('eo')
                                                setFullSource('Esperanto')
                                            }}
                                        >
                                            Esperanto
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('et')
                                                setFullSource('Estonian')
                                            }}
                                        >
                                            Estonian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('fi')
                                                setFullSource('Finnish')
                                            }}
                                        >
                                            Finnish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('fr')
                                                setFullSource('French')
                                            }}
                                        >
                                            French
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('fy')
                                                setFullSource('Frisian')
                                            }}
                                        >
                                            Frisian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('gl')
                                                setFullSource('Galician')
                                            }}
                                        >
                                            Galician
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ka')
                                                setFullSource('Georgian')
                                            }}
                                        >
                                            Georgian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('de')
                                                setFullSource('German')
                                            }}
                                        >
                                            German
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('el')
                                                setFullSource('Greek')
                                            }}
                                        >
                                            Greek
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('gu')
                                                setFullSource('Gujarati')
                                            }}
                                        >
                                            Gujarati
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ht')
                                                setFullSource('Haitian Creole')
                                            }}
                                        >
                                            Haitian Creole
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ha')
                                                setFullSource('Hausa')
                                            }}
                                        >
                                            Hausa
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('haw')
                                                setFullSource('Hawaiian')
                                            }}
                                        >
                                            Hawaiian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('he')
                                                setFullSource('Hebrew')
                                            }}
                                        >
                                            Hebrew
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('hi')
                                                setFullSource('Hindi')
                                            }}
                                        >
                                            Hindi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('hmn')
                                                setFullSource('Hmong')
                                            }}
                                        >
                                            Hmong
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('hu')
                                                setFullSource('Hungarian')
                                            }}
                                        >
                                            Hungarian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('is')
                                                setFullSource('Icelandic')
                                            }}
                                        >
                                            Icelandic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ig')
                                                setFullSource('Igbo')
                                            }}
                                        >
                                            Igbo
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('id')
                                                setFullSource('Indonesian')
                                            }}
                                        >
                                            Indonesian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ga')
                                                setFullSource('Irish')
                                            }}
                                        >
                                            Irish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('it')
                                                setFullSource('Italian')
                                            }}
                                        >
                                            Italian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ja')
                                                setFullSource('Japanese')
                                            }}
                                        >
                                            Japanese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('jv')
                                                setFullSource('Javanese')
                                            }}
                                        >
                                            Javanese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('kn')
                                                setFullSource('Kannada')
                                            }}
                                        >
                                            Kannada
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('kk')
                                                setFullSource('Kazakh')
                                            }}
                                        >
                                            Kazakh
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('km')
                                                setFullSource('Khmer')
                                            }}
                                        >
                                            Khmer
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('rw')
                                                setFullSource('Kinyarwanda')
                                            }}
                                        >
                                            Kinyarwanda
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ko')
                                                setFullSource('Korean')
                                            }}
                                        >
                                            Korean
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ku')
                                                setFullSource('Kurdish')
                                            }}
                                        >
                                            Kurdish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ky')
                                                setFullSource('Kyrgyz')
                                            }}
                                        >
                                            Kyrgyz
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('lo')
                                                setFullSource('Lao')
                                            }}
                                        >
                                            Lao
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('la')
                                                setFullSource('Latin')
                                            }}
                                        >
                                            Latin
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('lv')
                                                setFullSource('Latvian')
                                            }}
                                        >
                                            Latvian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('lt')
                                                setFullSource('Lithuanian')
                                            }}
                                        >
                                            Lithuanian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('lb')
                                                setFullSource('Luxembourgish')
                                            }}
                                        >
                                            Luxembourgish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('mk')
                                                setFullSource('Macedonian')
                                            }}
                                        >
                                            Macedonian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('mg')
                                                setFullSource('Malagasy')
                                            }}
                                        >
                                            Malagasy
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ms')
                                                setFullSource('Malay')
                                            }}
                                        >
                                            Malay
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ml')
                                                setFullSource('Malayalam')
                                            }}
                                        >
                                            Malayalam
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('mt')
                                                setFullSource('Maltese')
                                            }}
                                        >
                                            Maltese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('mi')
                                                setFullSource('Maori')
                                            }}
                                        >
                                            Maori
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('mr')
                                                setFullSource('Marathi')
                                            }}
                                        >
                                            Marathi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('mn')
                                                setFullSource('Mongolian')
                                            }}
                                        >
                                            Mongolian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('my')
                                                setFullSource(
                                                    'Myanmar (Burmese)'
                                                )
                                            }}
                                        >
                                            Myanmar (Burmese)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ne')
                                                setFullSource('Nepali')
                                            }}
                                        >
                                            Nepali
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('no')
                                                setFullSource('Norwegian')
                                            }}
                                        >
                                            Norwegian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ny')
                                                setFullSource(
                                                    'Nyanja (Chichewa)'
                                                )
                                            }}
                                        >
                                            Nyanja (Chichewa)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('or')
                                                setFullSource('Odia (Oriya)')
                                            }}
                                        >
                                            Odia (Oriya)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ps')
                                                setFullSource('Pashto')
                                            }}
                                        >
                                            Pashto
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('fa')
                                                setFullSource('Persian')
                                            }}
                                        >
                                            Persian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('pl')
                                                setFullSource('Polish')
                                            }}
                                        >
                                            Polish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('pt')
                                                setFullSource(
                                                    'Portuguese (Portugal, Brazil)'
                                                )
                                            }}
                                        >
                                            Portuguese (Portugal, Brazil)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('pa')
                                                setFullSource('Punjabi')
                                            }}
                                        >
                                            Punjabi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ro')
                                                setFullSource('Romanian')
                                            }}
                                        >
                                            Romanian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ru')
                                                setFullSource('Russian')
                                            }}
                                        >
                                            Russian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sm')
                                                setFullSource('Samoan')
                                            }}
                                        >
                                            Samoan
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('gd')
                                                setFullSource('Scots Gaelic')
                                            }}
                                        >
                                            Scots Gaelic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sr')
                                                setFullSource('Serbian')
                                            }}
                                        >
                                            Serbian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('st')
                                                setFullSource('Sesotho')
                                            }}
                                        >
                                            Sesotho
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sn')
                                                setFullSource('Shona')
                                            }}
                                        >
                                            Shona
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sd')
                                                setFullSource('Sindhi')
                                            }}
                                        >
                                            Sindhi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('si')
                                                setFullSource(
                                                    'Sinhala (Sinhalese)'
                                                )
                                            }}
                                        >
                                            Sinhala (Sinhalese)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sk')
                                                setFullSource('Slovak')
                                            }}
                                        >
                                            Slovak
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sl')
                                                setFullSource('Slovenian')
                                            }}
                                        >
                                            Slovenian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('so')
                                                setFullSource('Somali')
                                            }}
                                        >
                                            Somali
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('es')
                                                setFullSource('Spanish')
                                            }}
                                        >
                                            Spanish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('su')
                                                setFullSource('Sundanese')
                                            }}
                                        >
                                            Sundanese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sw')
                                                setFullSource('Swahili')
                                            }}
                                        >
                                            Swahili
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('sv')
                                                setFullSource('Swedish')
                                            }}
                                        >
                                            Swedish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('tl')
                                                setFullSource(
                                                    'Tagalog (Filipino)'
                                                )
                                            }}
                                        >
                                            Tagalog (Filipino)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('tg')
                                                setFullSource('Tajik')
                                            }}
                                        >
                                            Tajik
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ta')
                                                setFullSource('Tamil')
                                            }}
                                        >
                                            Tamil
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('tt')
                                                setFullSource('Tatar')
                                            }}
                                        >
                                            Tatar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('te')
                                                setFullSource('Telugu')
                                            }}
                                        >
                                            Telugu
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('th')
                                                setFullSource('Thai')
                                            }}
                                        >
                                            Thai
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('tr')
                                                setFullSource('Turkish')
                                            }}
                                        >
                                            Turkish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('tk')
                                                setFullSource('Turkmen')
                                            }}
                                        >
                                            Turkmen
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('uk')
                                                setFullSource('Ukrainian')
                                            }}
                                        >
                                            Ukrainian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ur')
                                                setFullSource('Urdu')
                                            }}
                                        >
                                            Urdu
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('ug')
                                                setFullSource('Uyghur')
                                            }}
                                        >
                                            Uyghur
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('uz')
                                                setFullSource('Uzbek')
                                            }}
                                        >
                                            Uzbek
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('vi')
                                                setFullSource('Vietnamese')
                                            }}
                                        >
                                            Vietnamese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('cy')
                                                setFullSource('Welsh')
                                            }}
                                        >
                                            Welsh
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('xh')
                                                setFullSource('Xhosa')
                                            }}
                                        >
                                            Xhosa
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('yi')
                                                setFullSource('Yiddish')
                                            }}
                                        >
                                            Yiddish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('yo')
                                                setFullSource('Yoruba')
                                            }}
                                        >
                                            Yoruba
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLsource('zu')
                                                setFullSource('Zulu')
                                            }}
                                        >
                                            Zulu
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
                        className={classes.TextFieldclass}
                        id="outlined-multiline-static"
                        label="Text Input"
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                    />
                </div>
            </form>
            <Typography align="center">
                <Button
                    onClick={fetchAPI}
                    className={classes.buttonTran}
                    variant="outlined"
                    color="primary"
                >
                    Translate
                </Button>
            </Typography>

            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Grid container spacing={0}>
                            <Grid item xs={1} sm={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    {...bindTrigger(popupState)}
                                >
                                    Target
                                </Button>
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button variant="outlined" color="primary">
                                    {FullTarget}
                                </Button>
                            </Grid>
                        </Grid>
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
                                                setLtarget('af')
                                                setFullTarget('Afrikaans')
                                            }}
                                        >
                                            Afrikaans
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sq')
                                                setFullTarget('Albanian')
                                            }}
                                        >
                                            Albanian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('am')
                                                setFullTarget('Amharic')
                                            }}
                                        >
                                            Amharic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ar')
                                                setFullTarget('Arabic')
                                            }}
                                        >
                                            Arabic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('hy')
                                                setFullTarget('Armenian')
                                            }}
                                        >
                                            Armenian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('az')
                                                setFullTarget('Azerbaijani')
                                            }}
                                        >
                                            Azerbaijani
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('eu')
                                                setFullTarget('Basque')
                                            }}
                                        >
                                            Basque
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('be')
                                                setFullTarget('Belarusian')
                                            }}
                                        >
                                            Belarusian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('bn')
                                                setFullTarget('Bengali')
                                            }}
                                        >
                                            Bengali
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('bs')
                                                setFullTarget('Bosnian')
                                            }}
                                        >
                                            Bosnian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('bg')
                                                setFullTarget('Bulgarian')
                                            }}
                                        >
                                            Bulgarian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ca')
                                                setFullTarget('Catalan')
                                            }}
                                        >
                                            Catalan
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ceb')
                                                setFullTarget('Cebuano')
                                            }}
                                        >
                                            Cebuano
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('zh-CN')
                                                setFullTarget(
                                                    'Chinese (Simplified)'
                                                )
                                            }}
                                        >
                                            Chinese (Simplified)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('zh-TW')
                                                setFullTarget(
                                                    'Chinese (Traditional)'
                                                )
                                            }}
                                        >
                                            Chinese (Traditional)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('co')
                                                setFullTarget('Corsican')
                                            }}
                                        >
                                            Corsican
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('hr')
                                                setFullTarget('Croatian')
                                            }}
                                        >
                                            Croatian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('cs')
                                                setFullTarget('Czech')
                                            }}
                                        >
                                            Czech
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('da')
                                                setFullTarget('Danish')
                                            }}
                                        >
                                            Danish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('nl')
                                                setFullTarget('Dutch')
                                            }}
                                        >
                                            Dutch
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('en')
                                                setFullTarget('English')
                                            }}
                                        >
                                            English
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('eo')
                                                setFullTarget('Esperanto')
                                            }}
                                        >
                                            Esperanto
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('et')
                                                setFullTarget('Estonian')
                                            }}
                                        >
                                            Estonian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('fi')
                                                setFullTarget('Finnish')
                                            }}
                                        >
                                            Finnish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('fr')
                                                setFullTarget('French')
                                            }}
                                        >
                                            French
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('fy')
                                                setFullTarget('Frisian')
                                            }}
                                        >
                                            Frisian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('gl')
                                                setFullTarget('Galician')
                                            }}
                                        >
                                            Galician
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ka')
                                                setFullTarget('Georgian')
                                            }}
                                        >
                                            Georgian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('de')
                                                setFullTarget('German')
                                            }}
                                        >
                                            German
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('el')
                                                setFullTarget('Greek')
                                            }}
                                        >
                                            Greek
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('gu')
                                                setFullTarget('Gujarati')
                                            }}
                                        >
                                            Gujarati
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ht')
                                                setFullTarget('Haitian Creole')
                                            }}
                                        >
                                            Haitian Creole
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ha')
                                                setFullTarget('Hausa')
                                            }}
                                        >
                                            Hausa
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('haw')
                                                setFullTarget('Hawaiian')
                                            }}
                                        >
                                            Hawaiian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('he')
                                                setFullTarget('Hebrew')
                                            }}
                                        >
                                            Hebrew
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('hi')
                                                setFullTarget('Hindi')
                                            }}
                                        >
                                            Hindi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('hmn')
                                                setFullTarget('Hmong')
                                            }}
                                        >
                                            Hmong
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('hu')
                                                setFullTarget('HiHungarianndi')
                                            }}
                                        >
                                            Hungarian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('is')
                                                setFullTarget('Icelandic')
                                            }}
                                        >
                                            Icelandic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ig')
                                                setFullTarget('Igbo')
                                            }}
                                        >
                                            Igbo
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('id')
                                                setFullTarget('Indonesian')
                                            }}
                                        >
                                            Indonesian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ga')
                                                setFullTarget('Irish')
                                            }}
                                        >
                                            Irish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('it')
                                                setFullTarget('Italian')
                                            }}
                                        >
                                            Italian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ja')
                                                setFullTarget('Japanese')
                                            }}
                                        >
                                            Japanese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('jv')
                                                setFullTarget('Javanese')
                                            }}
                                        >
                                            Javanese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('kn')
                                                setFullTarget('Kannada')
                                            }}
                                        >
                                            Kannada
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('kk')
                                                setFullTarget('Kazakh')
                                            }}
                                        >
                                            Kazakh
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('km')
                                                setFullTarget('Khmer')
                                            }}
                                        >
                                            Khmer
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('rw')
                                                setFullTarget('Kinyarwanda')
                                            }}
                                        >
                                            Kinyarwanda
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ko')
                                                setFullTarget('Korean')
                                            }}
                                        >
                                            Korean
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ku')
                                                setFullTarget('Kurdish')
                                            }}
                                        >
                                            Kurdish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ky')
                                                setFullTarget('Kyrgyz')
                                            }}
                                        >
                                            Kyrgyz
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('lo')
                                                setFullTarget('Lao')
                                            }}
                                        >
                                            Lao
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('la')
                                                setFullTarget('Latin')
                                            }}
                                        >
                                            Latin
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('lv')
                                                setFullTarget('Latvian')
                                            }}
                                        >
                                            Latvian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('lt')
                                                setFullTarget('Lithuanian')
                                            }}
                                        >
                                            Lithuanian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('lb')
                                                setFullTarget('Luxembourgish')
                                            }}
                                        >
                                            Luxembourgish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('mk')
                                                setFullTarget('Macedonian')
                                            }}
                                        >
                                            Macedonian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('mg')
                                                setFullTarget('Malagasy')
                                            }}
                                        >
                                            Malagasy
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ms')
                                                setFullTarget('Malay')
                                            }}
                                        >
                                            Malay
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ml')
                                                setFullTarget('Malayalam')
                                            }}
                                        >
                                            Malayalam
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('mt')
                                                setFullTarget('Maltese')
                                            }}
                                        >
                                            Maltese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('mi')
                                                setFullTarget('Maori')
                                            }}
                                        >
                                            Maori
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('mr')
                                                setFullTarget('Marathi')
                                            }}
                                        >
                                            Marathi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('mn')
                                                setFullTarget('Mongolian')
                                            }}
                                        >
                                            Mongolian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('my')
                                                setFullTarget(
                                                    'Myanmar (Burmese)'
                                                )
                                            }}
                                        >
                                            Myanmar (Burmese)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ne')
                                                setFullTarget('Nepali')
                                            }}
                                        >
                                            Nepali
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('no')
                                                setFullTarget('Norwegian')
                                            }}
                                        >
                                            Norwegian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ny')
                                                setFullTarget(
                                                    'Nyanja (Chichewa)'
                                                )
                                            }}
                                        >
                                            Nyanja (Chichewa)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('or')
                                                setFullTarget('Odia (Oriya)')
                                            }}
                                        >
                                            Odia (Oriya)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ps')
                                                setFullTarget('Pashto')
                                            }}
                                        >
                                            Pashto
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('fa')
                                                setFullTarget('Persian')
                                            }}
                                        >
                                            Persian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('pl')
                                                setFullTarget('Polish')
                                            }}
                                        >
                                            Polish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('pt')
                                                setFullTarget(
                                                    'Portuguese (Portugal, Brazil)'
                                                )
                                            }}
                                        >
                                            Portuguese (Portugal, Brazil)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('pa')
                                                setFullTarget('Punjabi')
                                            }}
                                        >
                                            Punjabi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ro')
                                                setFullTarget('Romanian')
                                            }}
                                        >
                                            Romanian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ru')
                                                setFullTarget('Russian')
                                            }}
                                        >
                                            Russian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sm')
                                                setFullTarget('Samoan')
                                            }}
                                        >
                                            Samoan
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('gd')
                                                setFullTarget('Scots Gaelic')
                                            }}
                                        >
                                            Scots Gaelic
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('st')
                                                setFullTarget('Sesotho')
                                            }}
                                        >
                                            Sesotho
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sn')
                                                setFullTarget('Shona')
                                            }}
                                        >
                                            Shona
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sd')
                                                setFullTarget('Sindhi')
                                            }}
                                        >
                                            Sindhi
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('si')
                                                setFullTarget(
                                                    'Sinhala (Sinhalese)'
                                                )
                                            }}
                                        >
                                            Sinhala (Sinhalese)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sk')
                                                setFullTarget('Slovak')
                                            }}
                                        >
                                            Slovak
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sl')
                                                setFullTarget('Slovenian')
                                            }}
                                        >
                                            Slovenian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('so')
                                                setFullTarget('Somali')
                                            }}
                                        >
                                            Somali
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('es')
                                                setFullTarget('Spanish')
                                            }}
                                        >
                                            Spanish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('su')
                                                setFullTarget('Sundanese')
                                            }}
                                        >
                                            Sundanese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sw')
                                                setFullTarget('Swahili')
                                            }}
                                        >
                                            Swahili
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('sv')
                                                setFullTarget('Swedish')
                                            }}
                                        >
                                            Swedish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('tl')
                                                setFullTarget(
                                                    'Tagalog (Filipino)'
                                                )
                                            }}
                                        >
                                            Tagalog (Filipino)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('tg')
                                                setFullTarget('Tajik')
                                            }}
                                        >
                                            Tajik
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ta')
                                                setFullTarget('Tamil')
                                            }}
                                        >
                                            Tamil
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('tt')
                                                setFullTarget('Tatar')
                                            }}
                                        >
                                            Tatar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('te')
                                                setFullTarget('Telugu')
                                            }}
                                        >
                                            Telugu
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('th')
                                                setFullTarget('Thai')
                                            }}
                                        >
                                            Thai
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('tr')
                                                setFullTarget('Turkish')
                                            }}
                                        >
                                            Turkish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('tk')
                                                setFullTarget('Turkmen')
                                            }}
                                        >
                                            Turkmen
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('uk')
                                                setFullTarget('Ukrainian')
                                            }}
                                        >
                                            Ukrainian
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ur')
                                                setFullTarget('Urdu')
                                            }}
                                        >
                                            Urdu
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('ug')
                                                setFullTarget('Uyghur')
                                            }}
                                        >
                                            Uyghur
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('uz')
                                                setFullTarget('Uzbek')
                                            }}
                                        >
                                            Uzbek
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('vi')
                                                setFullTarget('Vietnamese')
                                            }}
                                        >
                                            Vietnamese
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('cy')
                                                setFullTarget('Welsh')
                                            }}
                                        >
                                            Welsh
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('xh')
                                                setFullTarget('Xhosa')
                                            }}
                                        >
                                            Xhosa
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('yi')
                                                setFullTarget('Yiddish')
                                            }}
                                        >
                                            Yiddish
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('yo')
                                                setFullTarget('Yoruba')
                                            }}
                                        >
                                            Yoruba
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Button
                                            onClick={(e) => {
                                                popupState.close()
                                                setLtarget('zu')
                                                setFullTarget(
                                                    'LuxeZulumbourgish'
                                                )
                                            }}
                                        >
                                            Zulu
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
                        className={classes.TextFieldclass}
                        id="outlined-multiline-static"
                        label="Text Output"
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                        value={traned}
                    />
                </div>
            </form>
            <Button
                onClick={toHistory}
                variant="contained"
                color="primary"
                size="large"
                className={classes.fab}
                startIcon={<NavigationIcon />}
            >
                History
            </Button>
        </div>
    )
}

export default MainPage
