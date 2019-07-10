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

export default function Pagination(props) {
  const classes = useStyles();

  return (
    <ul className={classes.pagination}>
      <li className={classes.page}>
        <label className={classes.link}>«</label>
      </li><li className={classes.page}>
        <label className={classes.link} href="#">1</label>
      </li><li className={classes.page}>
        <label className={classes.link} href="#">2</label>
      </li><li className={classes.page}>
        <label className={classes.link} href="#">3</label>
      </li><li className={classes.page}>
        <label className={classes.link} href="#">4</label>
      </li><li className={classes.page}>
        <label className={classes.link} href="#">5</label>
      </li><li className={classes.page}>
        <label className={classes.link} href="#">6</label>
      </li>
      <li className={classes.page}>
        <label className={classes.link} href="#">»</label>
      </li>
    </ul>
  );
}
