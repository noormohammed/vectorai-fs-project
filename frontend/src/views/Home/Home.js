import React from 'react';
import { makeStyles } from '@material-ui/styles';

import DraggableCardsList from 'views/Home/components/DraggableCardsList';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
}));

/**
 * Home page for the Front End
 *
 * @component
 * @example
 * return (<Home />)
 * @return {*} HTML for the Home module
 */
 const Home = () => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <DraggableCardsList />
      </div>
    );
 }

export default Home;
