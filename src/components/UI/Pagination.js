import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  pagination: {
    display: "inline-block",
    paddingLeft: "0",
    margin: "20px 0",
    borderRadius: "4px",
    float: "right",
    paddingRight: "20px"
  },

  page: {
    display: "inline"
  },
  link: {
    cursor:"pointer",
    position: "relative",
    float: "left",
    padding: "6px 12px",
    marginLeft: "-1px",
    lineHeight: "1.42857143",
    color: "#428bca",
    textDecoration: "none",
    backgroundColor: "#fff",
    border: "1px solid #ddd"
  }
}));
const TOTAL_ITEMS = 500;
export default function Pagination({activePage,limit, changeHandler}) {
  const classes = useStyles();
  const pages = []
  const totalPages = Math.floor(TOTAL_ITEMS / limit)
  const prePages = (activePage - ((activePage % 5)?(activePage % 5):((activePage-1) % 5)))
  let pagesCount = 0
  if((totalPages - prePages - 5) > 0 )
  {
    pagesCount = 5
  }
  else {
    pagesCount = (activePage % 5)
  }
  let prevPage = prePages
  let nextPage = 1
  for(var i = 0; i < (pagesCount);i++)
  {
    const pn = prePages + i + 1
    const isActive = (activePage == pn)
    pages.push(<li className={classes.page}>
      <label className={classes.link} 
      style={{"backgroundColor":isActive?'#74d274':'', "color":isActive?'white':''}} 
      onClick={() => changeHandler(pn)} >{pn}</label>
    </li>)
    nextPage = pn
  }  
  return (
    <ul className={classes.pagination}>
      {(activePage > 5) && <li className={classes.page}>
        <label className={classes.link} onClick={()=> changeHandler(prevPage - 1)} >«</label>
      </li>}
      {pages}      
      {(pagesCount >= 5) && <li className={classes.page}>
        <label className={classes.link} onClick={()=> changeHandler(nextPage + 1)} >»</label>
      </li>}
    </ul>
  );
}
