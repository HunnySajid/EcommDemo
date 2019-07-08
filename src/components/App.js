
import React, { Component } from 'react';
import {
    Header,
    ScrollOption,
    ItemGrid
} from './UI'
class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header title="React Ecomm" />
                <ScrollOption label="Pagination" value="abc" handleChange={() => console.log("Change")} />
                <ItemGrid />
            </React.Fragment>

        )
    }
}

export default App;