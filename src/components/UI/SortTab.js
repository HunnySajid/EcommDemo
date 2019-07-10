import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import queryString from 'query-string';
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  select: {
    backgroundColor: "#c73c3c",
    color: "white",
    borderRadius: "6px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  box :{
    
  },
  select : {
    marginRight:"10px",
    marginTop:'10px',
    backgroundColor: "#3ab1cc",
    color: "white",
    padding: "12px",
    width: "140px",
    border: "none",
    fontSize: "20px",
    boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
    "-webkit-appearance": "button",
    appearance: "button",
    outline: "none"
  }  

}));

export default function SortTab({history,location,selected}) {
  const classes = useStyles();
 function handleChange({target}, props){
   const {search} = props.location;
  let qa = queryString.parse(search);
  if(qa["_sort"] && (target.value === "none"))
  {
    delete qa["_sort"]
  }
  else {
    qa["_sort"] = target.value    
  }
  console.log(qa)
  let searchQuery = "?"
  let keys = Object.keys(qa)
  keys.forEach((qaKey,index) =>{
    searchQuery = searchQuery.concat(`${qaKey}=${qa[qaKey]}${(index === (keys.length - 1))?'':'&'}`)
  })

  history.push(`/${searchQuery}`);
  }
  return (
    <div className={classes.box}>
  <select className={classes.select} onChange={(e)=> handleChange(e,{history,location})}>
    <option value={"none"}>------</option>
    <option value="price" selected={(selected === "price")} >Price</option>
    <option value="size" selected={(selected === "size")}>Size</option>
    <option value="id" selected={(selected === "id")}>Id</option>
  </select>
</div>
  );
}



