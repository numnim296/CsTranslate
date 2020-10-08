import React from 'react'
import routes from './route'
import {
    useRoutes,
    BrowserRouter as Router,
   
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'

function App() {
    const routing = useRoutes(routes)
    // return <ThemeProvider>
    //   {routing}
    //   </ThemeProvider>
return <div>{routing}</div>
}


export default App
