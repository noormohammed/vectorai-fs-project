import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/* Custom hook to map Escape key on closing of Overlay Image Backdrop  */
import useKeypress from 'hooks/useKeypress';
import DocumentTypeCard from 'views/Home/components/DocumentTypeCard';
/* Import the initial static inputs/document types & corresponding images from the json files to generate the cards */
import DocumentTypesJSON from 'static/json/inputs';
import ImagesJSON from 'static/json/images';

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
  const [documentTypes, updateDocumentTypes] = useState(DocumentTypesJSON);
  const [open, setOpen] = useState(false);
  const [overlayImageLink, setOverlayImageLink] = useState(null);

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

  const handleOnDragEnd = (result) => {
    /* If the destination is null or dropped outside the list */
    if (!result.destination) return;

    const documents = Array.from(documentTypes);

    /* Use the source.index value to find our item from our new array and remove it using the splice method */
    const [reorderedDocument] = documents.splice(result.source.index, 1);

    /* use our destination.index to add that item back into the array, but at it’s new location, hence splice */
    documents.splice(result.destination.index, 0, reorderedDocument);

    /* Finally update state */
    updateDocumentTypes(documents);
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="documentTypes" direction="horizontal">
          {(provided) => (
            <List component="ul" className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
              {documentTypes.map(({type, title, position}, index) => (
                <Draggable key={Number(position)} draggableId={type} index={index}>
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
              style={{display: overlayImageLink ? 'block' : 'none'}}
            />
          ) : (
            <div className={classes.progress}>
              <CircularProgress color="primary" />
            </div>
          )}
        </Backdrop>
      </React.Fragment>
    </React.Fragment>
  );
}

export default DraggableCardsList;
