
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {
    Header,
    ScrollOption,
    ItemGridContainer,
    Pagination
} from './UI'
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            paginate:true,
            defaultPage:1,
            defaultLimit:15
        }
    }

    render() {   
        return (
            <React.Fragment>
            <Router>
                <Route path="/" component={Header}  />
                <Route path="/" render={ (routeProps) => <ScrollOption {...routeProps} label="Pagination" />} />
                <Route 
                    path="/" 
                    render ={
                        (routeProps) => 
                        <ItemGridContainer {...routeProps} />
                     }
                    />
                <Route path="/" component={Pagination} />
                  
            </Router>
            </React.Fragment>

        )
    }
}

export default App;