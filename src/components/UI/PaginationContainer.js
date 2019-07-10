import React,{Component} from 'react';
import {Pagination} from '.'
import queryString from 'query-string'


export default class PaginationContainer extends Component {    
    constructor(props){
        super(props)
        this.state = {
        activePage:'',
        limit:10 
        }
      this.changePage = this.changePage.bind(this)  
    }
    componentDidMount (){
            const {location} = this.props
            let qs = queryString.parse(location.search)
         if(qs["_page"])
         {
            this.setState({activePage:qs["_page"],limit:qs["_limit"]?qs["_limit"]:this.state.limit})
         }
        }

    componentDidUpdate(prevProps){
        const {location} = this.props
         let prevSearch = queryString.parse(prevProps.location.search)
         let currentSearch =    queryString.parse(location.search)
         if((prevSearch["_page"] !== currentSearch["_page"] )){
            if(currentSearch["_page"])
            {
               this.setState({activePage:currentSearch["_page"],limit:currentSearch["_limit"]?currentSearch["_limit"]:this.state.limit})
            }
            else {
                this.setState({activePage:'',limit:this.state.limit})    
            }  
         }
    }    
    changePage(pageNumber){
        const {history,location} = this.props
        const { search } = location;
  
        let qa = queryString.parse(search);
        if (qa["_page"]) 
        qa["_page"] = pageNumber;
        
        let searchQuery = "?";
        let keys = Object.keys(qa);
        keys.forEach((qaKey, index) => {
          searchQuery = searchQuery.concat(
            `${qaKey}=${qa[qaKey]}${index === keys.length - 1 ? "" : "&"}`
          );
        });
  
        history.push(`/${searchQuery}`);
    }
    render(){
        const {activePage,limit} = this.state
        return (activePage ?
             <Pagination changeHandler={this.changePage} 
             activePage={activePage} limit={limit} 
             {...this.props} />:<div></div>)
    
    }         
}