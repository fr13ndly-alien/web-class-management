import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  LatestSales,
  UsersByDevice,
  LatestOrders as TeachingGroups
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={9} xs={12}>
          <TeachingGroups />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
