import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

/* Import the document types related images from the json file to generate the cards */
import DocumentTypeImagesJSON from 'static/json/images';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    width: 260,
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
}));

/**
 * DocumentTypeCard creates a Card component from the given document type information.
 *
 * @component
 * @example
 * return (<DocumentTypeCard />)
 * @param  {*} props any props for this component
 * @return {*} HTML to display draggable cards list
 */
const DocumentTypeCard = props => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  /**
   * Handler for hiding the spinner once the image is loaded
  */
  const handleImageLoading = () => {
    setLoaded(true);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader
          title={props.title}
          subheader=""
        />
        <CardMedia
          component="a"
          className={classes.cardMedia}
        >
          <img
            className={classes.cardImage}
            src = {DocumentTypeImagesJSON[props.type]}
            alt={props.title}
            onLoad={handleImageLoading}
            style={{display: loaded ? 'block' : 'none'}}
          />
          {!loaded && (
            <div className={classes.progress}>
              <CircularProgress color="secondary" />
            </div>
          )}
        </CardMedia>
      </Card>
    </React.Fragment>
  );
}

/**
 * Props required to create this particular card
 */
DocumentTypeCard.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DocumentTypeCard;
