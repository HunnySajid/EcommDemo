import React,{Component} from 'react';
import axios from 'axios';
import {ItemGrid} from '.'
import queryString from 'query-string'

const baseUrl = "http://localhost:3000/api/products"

export default class ItemGridContainer extends Component {    
    constructor(props){
        super(props)
        this.state = {
        items:[] 
        }
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount (){
            const {history,location} = this.props
            let qs = queryString.parse(location.search)
            let search = `?${qs["_page"]?'_page='+qs["_page"]+'&':''}${qs["_sort"]?'_sort='+qs["_sort"]+'&':''}${qs["_limit"]?'_limit='+qs["_limit"]:'_limit=15'}`
            console.log(search)
            this.fetchData(baseUrl+search);
        }
        fetchData(url){
            axios.get(`${url}`)
            .then(res => {
                this.setState({items:res.data})
                console.log(res.data.length)}
                )
        }
    render(){
        const {items} = this.state
        return (<ItemGrid items={items}/>)
    
    }         
}