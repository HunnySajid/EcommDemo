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
  }
}));

export default function ItemGrid() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2,4,5,6,7,8].map(value => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
