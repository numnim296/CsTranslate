import React from 'react'
import { makeStyles, Grid, Typography, Button ,IconButton} from '@material-ui/core'
import { useLocation, useNavigate,Navigate } from 'react-router'
// import transImage from '../../images/trans.jpg'
// import suggestImage from '../../images/suggess.jpg'
import transImage from '../../images/1.png'
import suggestImage from '../../images/2.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(10),
    },
}))

export default function MainPage() {
    const classes = useStyles()
    const location = useLocation()
    const userId = location.state
    const navigate = useNavigate()

    const gotoOtherPage = (page) =>{
        navigate(`/admin/${page}`,{state:`${userId}`})
    }


    if(localStorage.user==="admin"){
        return (
            <Grid className={classes.root} container spacing={3}>
                <Grid item xs={12} sm={2}>
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography align="center">
                        {/* <Button
                            style={{
                                maxWidth: '300px',
                                maxHeight: '300px',
                                minWidth: '300px',
                                minHeight: '300px',
                            }}
                            variant="contained"
                            // size="large"
                            color="primary"
                            className={classes.margin}
                            onClick={e=>{
                                gotoOtherPage('trans')
                            }}
                        >
                            Translate
                        </Button> */}

                        <IconButton onClick={e=>{
                                gotoOtherPage('trans')
                            }}>
                            <img src={transImage} style={{
                                maxWidth: '470px',
                                maxHeight: '470px',
                                minWidth: '470px',
                                minHeight: '470px',
                            }}/>
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography align="center">
                        {/* <Button
                            style={{
                                maxWidth: '300px',
                                maxHeight: '300px',
                                minWidth: '300px',
                                minHeight: '300px',
                            }}
                            variant="contained"
                            // size="large"
                            color="secondary"
                            className={classes.margin}
                            onClick={e=>{
                                gotoOtherPage('recommend')
    
                            }}
                        >
                            Suggest words
                        </Button> */}
                        <IconButton onClick={e=>{
                                gotoOtherPage('recommend')
    
                            }}>
                            <img src={suggestImage} style={{
                                maxWidth: '470px',
                                maxHeight: '470px',
                                minWidth: '470px',
                                minHeight: '470px',
                            }}/>
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    
                </Grid>
            </Grid>
        )

    }else if(localStorage.user===undefined || localStorage.user==="user"){
        return <Navigate to="/trans"></Navigate>
    }


}
