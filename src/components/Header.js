import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  searchContainer: {
    flexGrow: 0.5,
  },
  input: {
    borderRadius: 5,
    margin: '10px 0',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color='transparent'>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <FormControl variant='outlined' className={classes.searchContainer}>
            <OutlinedInput
              className={classes.input}
              placeholder='Search'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <HomeIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
