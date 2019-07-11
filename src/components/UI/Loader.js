import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin:"10px 120px"
  },
  secondary:{
    backgroundColor:'#81eab2'  
  }
});

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" classes={{barColorPrimary:classes.secondary}}/>
     </div>
  );
}
