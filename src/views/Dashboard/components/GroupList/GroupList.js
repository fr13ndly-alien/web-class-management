import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import axios from 'axios';
import { useEffect } from 'react';
import GroupCreationForm from '../ClassInfoForm/ClassCreationForm';
import GroupUpdateForm from '../ClassInfoForm/ClassUpdateForm';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  overflow: "hidden",
  overflowY: 'scroll',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const GroupList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [ groups, setGroups ] = useState([{}]);
  const [ loadGroups, reloadGroup ] = useState(true);
  const [ updatingGroup, setUpdatingGroup ] = useState();
  const [ openGroupCreationForm, setOpenGroupCreationForm] = useState(false);
  const [ openGroupUpdatingForm, setOpenGroupUpdatingForm] = useState(false);
  
  useEffect( () => {
    if (loadGroups) {
      getTeachingClasses();
      reloadGroup(false);
    }
  })

  const getTeachingClasses = () => {
    const currentUser = localStorage.getItem('auth');
    
    axios.get(`http://localhost:8080/group/by-teacher/${currentUser}`)
      .then( response => {
        if (response) {
          const groups = response.data;
          if (groups)
            setGroups(groups);
          else alert('No class found');
        } 
        else 
          alert('Error getting classes');
      });

  }

  const handleCloseGroupCreation = () => {
    setOpenGroupCreationForm(false);
    getTeachingClasses();
  };

  const handleOpenGroupCreation = () => {
    setOpenGroupCreationForm(true);
  };

  function handleOpenGroupEdit(groupInfo) {
    setUpdatingGroup(groupInfo);
    console.log(">> Updating group");
    setOpenGroupUpdatingForm(true);
  }

  const handleCloseGroupUpdateForm = () => {
    setOpenGroupUpdatingForm(false);
    getTeachingClasses();
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Modal
        open={openGroupCreationForm}
        onClose={handleCloseGroupCreation}
        style={{ overflow: 'scroll' }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display="flex" flexDirection="column" sx={style}>
          <GroupCreationForm handleClose={handleCloseGroupCreation}/>
        </Box>
      </Modal>

      <Modal
        open={openGroupUpdatingForm}
        onClose={handleCloseGroupUpdateForm}
        style={{ overflow: 'scroll' }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display="flex" flexDirection="column" sx={style}>
          <GroupUpdateForm handleClose={handleCloseGroupUpdateForm} groupInfo={updatingGroup}/>
        </Box>
      </Modal>

      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleOpenGroupCreation}
          >
            New Group
          </Button>
        }
        title="Latest Orders"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Class name</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map( group => (
                  <TableRow hover key={group._id}>
                    <TableCell>{group.subject}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                      {moment(group.createdDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{group.price + ' VND'}</TableCell>
                    <TableCell>
                      <Button 
                        color="secondary"
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenGroupEdit(group)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

GroupList.propTypes = {
  className: PropTypes.string
};

export default GroupList;
