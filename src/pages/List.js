import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress, FormControl, Grid, InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../redux/actions/movieActions';

const useStyles = makeStyles(theme => ({
  rootApp: {
    flexGrow: 1,
  },
  searchContainer: {
    flexGrow: 0.5,
  },
  input: {
    borderRadius: 5,
    margin: '10px 0',
  },

  media: {
    height: 400,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  movieDesc: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const List = () => {
  const classes = useStyles();

  // const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const moviesState = useSelector(state => state.movies);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c72d30702ab3ffa8f3e95e24196b7ce5')
      .then(response => response.json())
      .then(result => {
        dispatch(setMovies(result.results));
        setOpen(false);
      });
  }, [dispatch]);

  // LOGIC TO FILTER THE LIST OF LOV's WITH USER ENTERED DATA IN SEARCH BOX.
  useEffect(() => {
    if (searchText !== '') {
      setOpen(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=c72d30702ab3ffa8f3e95e24196b7ce5&query=${searchText}`
      )
        .then(response => response.json())
        .then(result => {
          setSearchedMovies(result.results);
          setOpen(false);
        });
    } else {
      setSearchedMovies(moviesState.movies);
    }
  }, [searchText, moviesState.movies]);

  const data = searchText.length < 1 ? moviesState.movies : searchedMovies;

  return (
    <>
      <div>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>
      <div className={classes.rootApp}>
        <AppBar position='static' color='transparent'>
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
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
              />
            </FormControl>

            <HomeIcon />
          </Toolbar>
        </AppBar>
      </div>
      <Grid container style={{ padding: '1rem' }} spacing={2}>
        {data.length > 0 ? (
          data.map(movie => {
            return (
              <Grid item xs={12} sm={4} md={6} lg={2} xl={3} key={movie.id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <Link to='/details' state={movie}>
                      <CardMedia
                        className={classes.media}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.original_title}
                      />
                    </Link>

                    <CardContent>
                      <div className={classes.cardContent}>
                        <Typography gutterBottom variant='subtitle1' component='h2'>
                          {movie.original_title}
                        </Typography>
                        <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                          ({movie.vote_average})
                        </Typography>
                      </div>
                      <Typography variant='body2' className={classes.movieDesc} color='textSecondary' component='p'>
                        {movie.overview}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography style={{ textAlign: 'center' }}>Sorry! No Results found.</Typography>
        )}
      </Grid>
    </>
  );
};

export default List;
