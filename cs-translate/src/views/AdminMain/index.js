import React, { useEffect, useState } from 'react'
import { makeStyles, Grid, Typography, Button } from '@material-ui/core'
import { useLocation, useNavigate,Navigate } from 'react-router'

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
                        <Button
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
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography align="center">
                        <Button
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
                        </Button>
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
