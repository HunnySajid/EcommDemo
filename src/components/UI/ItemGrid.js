import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 320,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  date:{
    fontSize:"12px",
   textAlign:'center'
  },
  price:{
    textAlign:'center',
    fontSize:"25px",
  }
}));
function GetDate(dateAdded){
  var date1 = new Date().getTime()
  var date2 = new Date(dateAdded).getTime()
  let diff = parseInt((date1 - date2)/(1000* 24 * 3600))
  return (diff > 3)? new Date(dateAdded).toDateString()
  :`${diff} ${diff <= 1?'day':'days'} ago`


}

export default function ItemGrid(props) {
  const classes = useStyles();
  const {items} = props
  

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {items.map(item => (
            <Grid key={item.id} item>
              <Paper className={classes.paper}>
                <div style={{"fontSize":`${item.size}px`,textAlign:"center"}}>{item.face}</div>
                <div className={classes.price}>{`$ ${Number(item.price)/100}`}</div>
                <div className={classes.date}>{GetDate(item.date)}</div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
