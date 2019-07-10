import React, { Component } from "react";
import axios from "axios";
import { ItemGrid } from ".";
import queryString from "query-string";

const baseUrl = "http://localhost:3000/api/products";

export default class ItemGridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.fetchData = this.fetchData.bind(this);

    window.onscroll = () => {
        this.yHandler()
    }

}
  componentDidMount() {
    const { history, location } = this.props;
    let qs = queryString.parse(location.search);
    let search = `?${qs["_page"] ? "_page=" + qs["_page"] + "&" : ""}${
      qs["_sort"] ? "_sort=" + qs["_sort"] + "&" : ""
    }${qs["_limit"] ? "_limit=" + qs["_limit"] : "_limit=10"}`;
    this.fetchData(baseUrl + search);

  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    let prevSearch = queryString.parse(prevProps.location.search);
    let currentSearch = queryString.parse(location.search);
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

  yHandler(){
	var container = document.getElementById('itemgrid');
	var contentHeight = container.offsetHeight;
    console.log(window.pageYOffset + window.innerHeight, contentHeight)
    // var yOffset = window.pageYOffset; 
	// var y = yOffset + window.innerHeight;
	// if(y >= contentHeight){
	// 	// Ajax call to get more dynamic data goes here
	// 	container.innerHTML += '<div class="newData"></div>';
	// }
	
}
  fetchData(url) {
    axios.get(`${url}`).then(res => {
      this.setState({ items: res.data });
      console.log(res.data.length);
    });
  }
  render() {
    const { items } = this.state;

    return <div id="itemgrid">
        <ItemGrid items={items} />
    </div>;
  }
}
