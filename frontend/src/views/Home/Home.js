import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import useKeypress from 'hooks/useKeypress';

/* Import the initial static inputs/document types & corresponding images from the json files to generate the cards */
import DocumentTypesJSON from 'static/json/inputs';
import ImagesJSON from 'static/json/images';

const useStyles = makeStyles((theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
    },
    cardMedia: {
      height: 180,
    },
    cardImage: {
      height: '100%',
      width: '100%',
    },
    cardContent: {
      flexGrow: 1,
    },
    progress: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
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
    const [open, setOpen]     = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [overlayImageLink, setOverlayImageLink] = useState(null);
    const spinCount = useRef(0);

    /**
    * Handler for closing the Backdrop
    */
    const handleBackdropClose = () => {
      setOpen(false);
      setOverlayImageLink(null);
    };

    /**
    * Handler for toggling/opening the Backdrop
    */
    const handleBackdropToggle = () => {
      setOpen(!open);
    };

    /**
     * Using custom hook to detect Escape button and close the Backdrop
    */
    useKeypress('Escape', () => {
      handleBackdropClose();
    });

    /**
     * Handler for hiding the spinner once all the images are loaded
    */
    const handleImageLoading = () => {
      setLoaded(true);
    };

    /**
     * Method to keep a count of number of images loaded. In our case, there are 5 images
     */
    const imageLoadingComplete = () => {
      spinCount.current += 1;
      if (spinCount.current >= DocumentTypesJSON.length) {
        handleImageLoading();
      }
    }

    /**
     * Handler for OnClick event of the images and getting the overlay image ready
     * @param {*} event onClick event of the card
     * @param {*} imageLink image URL of the clicked card
     */
    const handleCardClick = (event, imageLink) => {
      event.preventDefault();
      setOverlayImageLink(imageLink);
      handleBackdropToggle();
    };

    return (
      <div className={classes.root}>
        <Grid container spacing={4} justify="center" alignItems="center">
          {DocumentTypesJSON.map(({type, title, position}) => (
            <Grid item key={Number(position)} xs={12} sm={6} md={4}>
              <Card
                className={classes.card}
                href=""
                onClick={(e) => {handleCardClick(e, ImagesJSON[type])}}
              >
                <CardHeader
                  title={title}
                  subheader=""
                />
                <CardMedia
                  component="a"
                  className={classes.cardMedia}
                >
                  <img
                    className={classes.cardImage}
                    src = {ImagesJSON[type]}
                    alt={title}
                    onLoad={imageLoadingComplete}
                    style={{display: loaded ? 'block' : 'none'}}
                  />
                  {!loaded && (
                    <div className={classes.progress}>
                      <CircularProgress color="secondary" />
                    </div>
                  )}
                </CardMedia>
              </Card>
            </Grid>
          ))}
        </Grid>
        <React.Fragment>
          <Backdrop className={classes.backdrop} open={open}>
            {overlayImageLink ? (
              <img
                src={overlayImageLink}
                alt="Backdrop Image"
                onLoad={imageLoadingComplete}
                style={{display: overlayImageLink ? 'block' : 'none'}}
              />
            ) : (
              <div className={classes.progress}>
                <CircularProgress color="primary" />
              </div>
            )}
          </Backdrop>
        </React.Fragment>
      </div>
    );
 }

export default Home;
