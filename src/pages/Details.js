import { AppBar, makeStyles, Toolbar, Typography, IconButton } from '@material-ui/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  rootApp: {
    flexGrow: 1,
  },
  details: {
    display: 'flex',
    padding: '1rem',
  },
}));

const Details = () => {
  const classes = useStyles();

  const location = useLocation();
  const navigation = useNavigate();

  const { title, vote_average, overview, poster_path, release_date } = location.state;

  return (
    <>
      <div className={classes.rootApp}>
        <AppBar position='static' color='transparent'>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography>Movie Details</Typography>
            <IconButton onClick={() => navigation('/')} color='primary'>
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>

      <section>
        <div className={classes.details}>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} style={{ width: '300px' }} />
          <div style={{ marginLeft: '1rem' }}>
            <Typography>
              {title} ({vote_average})
            </Typography>
            <Typography color='textSecondary'>{release_date.slice(0, 4)}</Typography>
            <Typography color='textSecondary'>{`Description: ${overview}`}</Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
