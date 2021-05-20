import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';

/* Custom hook to map Escape key on closing of Overlay Image Backdrop  */
import useKeypress from 'hooks/useKeypress';
import DocumentTypeCard from './DocumentTypeCard';
import { getDocumentTypesFromBackend, postDocumentTypesToBackend, updateDocumentTypeinBackend } from 'api/requests';

/* Import the initial static inputs/document types & corresponding images from the json files to generate the cards */
import DocumentTypesJSON from 'static/json/inputs';
import ImagesJSON from 'static/json/images';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > li': {
      width: 'fit-content',
      float: 'left',
      listStyle: 'none',
    },
    '& > li:nth-child(4n+4)': {
      marginLeft: '15%',
    }
  },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

/**
 * DraggableCardsList is a component to create a list of cards (made using given document types)
 * which are capable of being reordered using Drag and Drop events.
 *
 * @component
 * @example
 * return (<DraggableCardsList />)
 * @return {*} HTML to display draggable cards list
 */
const DraggableCardsList = () => {
  const classes = useStyles();
  const [documentTypes, setDocumentTypes] = useState({});
  const [open, setOpen] = useState(false);
  const [overlayImageLink, setOverlayImageLink] = useState(null);
  const [shouldSaveDocumentTypes, setShouldSaveDocumentTypes] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null)

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
   * Using custom hook to close the Backdrop on pressing Escape
  */
  useKeypress('Escape', () => {
    handleBackdropClose();
  });

  /**
   * Handler for OnClick event of the images and getting the overlay image ready
   * @param {*} event onClick event of the card
   * @param {*} imageLink image URL of the clicked card
   */
  const handleCardClick = (event, imageLink) => {
    event.preventDefault();

    /* update overlayImageLink from the imageLink of clicked card */
    setOverlayImageLink(imageLink);
    /* Open backdrop */
    handleBackdropToggle();
  };

  /**
   * Handler to that fired every time a card has been dragged and dropped
   * @param {*} dragInformation card that is dragged and ready to be dropped
   * @returns nothing
   */
  const handleOnDragEnd = (dragInformation) => {
    /* If the destination is null or dropped outside the list */
    if (!dragInformation.destination) return;

    const documents = Array.from(documentTypes);

    /* Using the source.index value to find our item from our new array and remove it using the splice method */
    const [draggedCard] = documents.splice(dragInformation.source.index, 1);

    /* Use destination.index to add that item back into the array, but at it’s new location, hence splice */
    documents.splice(dragInformation.destination.index, 0, draggedCard);

    /* Update the postions of the draggedCard and the subsequent cards that was affected on drop */
    const reorderedDocuments = documents.map((dtItems, index) => {
      dtItems["position"] = index;
      return dtItems;
    });

    /* Finally update state */
    setDocumentTypes(reorderedDocuments);

    /* Also, save them in the backend */
    setShouldSaveDocumentTypes(true);
  };

  /**
   * This useEffect is only for fetching the initial json data for rendering the cards grid
   */
  useEffect(() => {
    const getInitialDocumentTypesJSON = async () => {
      /* Fetch JSON data from backend, if no data then save from the static JSON file */
      let initialInputs = await getDocumentTypesFromBackend();

      if (!initialInputs) {
        /* Probably this is the first time saving of the JSON data to Backend */
        await postDocumentTypesToBackend(DocumentTypesJSON);

        /* Now try fetching again */

        /* The fetch data kicks in too early without waiting for the post to finish, hence setTimeout */
        /* There must be a more efficient way to do this. */
        setTimeout(async () => {
          initialInputs = await getDocumentTypesFromBackend();
          setDocumentTypes(initialInputs);
        }, 100);
      } else {
        setDocumentTypes(initialInputs);
      }
    };

    getInitialDocumentTypesJSON();

    return () => {};

  }, []);

  /**
   * This useEffect handles the saving of reordered cards
   */
  useEffect(() => {
    const reOrderDocumentTypes = async () => {

      if (shouldSaveDocumentTypes === false) return;

      handleBackdropToggle();

      /* Save the reordered cards to the backend */
      await updateDocumentTypeinBackend(documentTypes);

      // The loading spinner would never show as the APIs are processing at high speeds
      // For the sake of this task, I am trying to show the loading spinner for 3 seconds
      setTimeout(() => {
        handleBackdropClose();

        /* Save only when the drag and drop action is executed */
        setShouldSaveDocumentTypes(false);

        /* Storing the time when the cards were saved in the backend */
        setLastSavedTime(Date.now());
      }, 3000);

    };

    let myInterval = setInterval(reOrderDocumentTypes, 5000);

    return () => clearInterval(myInterval);

  }, [documentTypes, shouldSaveDocumentTypes]);

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="documentTypes" direction="horizontal">
          {(provided) => (
            <List component="ul" className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
              {documentTypes.length && documentTypes.map(({type, title}, index) => (
                <Draggable key={type} draggableId={type} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      href=""
                      onClick={(e) => {handleCardClick(e, ImagesJSON[type])}}
                    >
                      <DocumentTypeCard type={type} title={title} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      <React.Fragment>
        <Backdrop className={classes.backdrop} open={open}>
          {overlayImageLink ? (
            <img
              src={overlayImageLink}
              alt="Backdrop Image"
              style={{display: overlayImageLink ? "block" : "none"}}
            />
          ) : (
            <div className={classes.progress}>
              <CircularProgress color="secondary" />
              {shouldSaveDocumentTypes && (
                <Typography variant="subtitle1" component="h1" style={{color: '#fff'}}>
                  Last Saved: {lastSavedTime ? moment(lastSavedTime).fromNow() : `Just Now`}
                </Typography>
              )}
            </div>
          )}
        </Backdrop>
      </React.Fragment>
    </React.Fragment>
  );
}

export default DraggableCardsList;
