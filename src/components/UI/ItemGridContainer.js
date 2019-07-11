import React, { Component } from "react";
import axios from "axios";
import { ItemGrid,Loader } from ".";
import queryString from "query-string";

const baseUrl = "/api/products";

export default class ItemGridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      scrollContent:{
        loadingContent:false,
        pageNumber:1,
        noMoreConent:false
      }
    };
    this.fetchData = this.fetchData.bind(this);
    this.yHandler = this.yHandler.bind(this)
    window.onscroll = () => {
        this.yHandler()
    }

}
  componentDidMount() {
    const { location } = this.props;
    let qs = queryString.parse(location.search);
    let search = `?${qs["_page"] ? "_page=" + qs["_page"] + "&" : ""}${
      qs["_sort"] ? "_sort=" + qs["_sort"] + "&" : ""
    }${qs["_limit"] ? "_limit=" + qs["_limit"] : "_limit=10"}`;
    this.fetchData(baseUrl + search);

  }

  componentDidUpdate(prevProps,prevState) {
    const { location } = this.props;
    const {scrollContent:{loadingContent,pageNumber}} = this.state
    let prevSearch = queryString.parse(prevProps.location.search);
    let currentSearch = queryString.parse(location.search);
   console.log(loadingContent,pageNumber, "jijiji")
    if(!!currentSearch["_page"]){
      if (
        prevSearch["_page"] !== currentSearch["_page"] ||
        prevSearch["_limit"] !== currentSearch["_limit"] ||
        prevSearch["_sort"] !== currentSearch["_sort"]
      ) {
        let search = `?${
          currentSearch["_page"] ? "_page=" + currentSearch["_page"] + "&" : ""
        }${
          currentSearch["_sort"] ? "_sort=" + currentSearch["_sort"] + "&" : ""
        }${
          currentSearch["_limit"]
            ? "_limit=" + currentSearch["_limit"]
            : "_limit=10"
        }`;
        this.fetchData(baseUrl + search);
      }
    }
    else {
      const sortChanged = (prevSearch["_sort"] !== currentSearch["_sort"])
      if(!currentSearch["_page"] && ((loadingContent && !prevState.scrollContent.loadingContent)|| (sortChanged)) ){ 
        let search = `?_page=${sortChanged?1:pageNumber+1}&${
            currentSearch["_sort"] ? "_sort=" + currentSearch["_sort"] + "&" : ""
          }_limit=10`
          axios.get(baseUrl+search).then(res => {
            if(res.data.length > 0){
              const {items} = this.state
              const newItemList = sortChanged?res.data:[...items,...res.data]
              this.setState({items:newItemList,scrollContent:{loadingContent:false,pageNumber:sortChanged?1:pageNumber+1}})  
            }
            else {
              this.setState({scrollContent:{loadingContent:false,noMoreConent:true,pageNumber:1}})
            }
            
          }).catch(err =>{
            if(err){
              console.log(err);
              this.setState({scrollContent:{loadingContent:false}})
            }
          })
        
      }
    }
  }

  yHandler(){
  const {location} = this.props;
  const {scrollContent:{loadingContent,noMoreConent}} = this.state
  const qs = queryString.parse(location.search)

  var container = document.getElementById('itemgrid');
  var contentHeight = container.offsetHeight;
  
  var yOffset = window.pageYOffset; 
	var y = yOffset + window.innerHeight;
  
  if(y >= contentHeight){
    if(!qs['_page'] && !loadingContent && !noMoreConent)
    {
      this.setState({scrollContent:{loadingContent:true,pageNumber:this.state.scrollContent.pageNumber}})
      
    }
	}
	
}
  fetchData(url) {
    axios.get(`${url}`).then(res => {
      this.setState({ items: res.data });
    });
  }
  render() {
    const { items, scrollContent } = this.state;

    return <div id="itemgrid">
        <ItemGrid items={items} scrollData={scrollContent} />
        {scrollContent.loadingContent && <Loader />}
    </div>;
  }
}
