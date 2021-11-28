import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { weekDays, hours, mins} from './schedule_data'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  InputLabel,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassCreationForm = props => {
  const { className, handleClose, ...rest } = props;

  const classes = useStyles();

  const [groupInfo, setGroupInfo] = useState({
    teacher: localStorage.getItem('auth'),
    name: '',
    subject: '',
    price: 0,
    schedule: [
      {
        'day' : 'Monday',
        'hh' : 13,
        'mm' : 30
      },
      {
        'day' : 'Wednesday',
        'hh' : 13,
        'mm' : 30
      }
    ]
  });

  const handleChange = event => {
    setGroupInfo({
      ...groupInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // validate schedule:
    let schedule = [firstDay, secondDay];
    setGroupInfo({
      ...groupInfo,
      [schedule]: schedule
    });

    axios.post('http://localhost:8080/group/', groupInfo)
    .then ( res => {
      let resData = res.data;
      if (resData) {
        handleClose(false);
      } else {
        alert("Error while create class" + res)
      }
    });
  }

  var firstDay = {};
  var secondDay = {};

  const handleScheduleChange = event => {
    let eventName = event.target.name
    let evenValue = event.target.value

    switch (eventName) {
      case 'firstDay':
        firstDay.day = evenValue;
        break;
      case 'firstDayHour':
        firstDay.hh = evenValue;
        break;
      case 'firstDayMinute':
        firstDay.mm = evenValue;
        break;
      case 'secondDay':
        secondDay.day = evenValue;
        break;
      case 'secondDayHour':
        secondDay.hh = evenValue;
        break;
      case 'secondDayMinute':
        secondDay.mm = evenValue
        break;
      default:
        console.log(`Sorry, we are out of ${eventName}.`);
    } 
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader title="Create new group" />
        <Divider />
        <CardContent>
          <Grid container spacing={2} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                helperText="Please specify the class name"
                label="Class name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={groupInfo.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Subject"
                margin="dense"
                name="subject"
                onChange={handleChange}
                required
                value={groupInfo.subject}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12} >
              <TextField
                fullWidth
                label="Price (VND)"
                margin="dense"
                name="price"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12} >
              <InputLabel>First day</InputLabel>
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Day"
                margin="dense"
                name="firstDay"
                onChange={handleScheduleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {weekDays.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3} xs={12} >
              <TextField
                fullWidth
                label="Hour"
                margin="dense"
                name="firstDayHour"
                onChange={handleScheduleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {hours.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3} xs={12} >
              <TextField
                fullWidth
                label="Minute"
                margin="dense"
                name="firstDayMinute"
                onChange={handleScheduleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {mins.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12} xs={12} >
              <InputLabel>Second day</InputLabel>
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Day"
                margin="dense"
                name="secondDay"
                onChange={handleScheduleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {weekDays.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3} xs={12} >
              <TextField
                fullWidth
                label="Hour"
                margin="dense"
                name="secondDayHour"
                onChange={handleScheduleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {hours.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3} xs={12} >
              <TextField
                fullWidth
                label="Minute"
                margin="dense"
                name="secondDayMinute"
                onChange={handleScheduleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {mins.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save Group
          </Button>

          <Button
            color="secondary"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ClassCreationForm.propTypes = {
  className: PropTypes.string
};

export default ClassCreationForm;
