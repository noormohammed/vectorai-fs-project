# Vector Full Stack Project - Front End App

![GitHub repo size](https://img.shields.io/badge/repo%20size-557KB-blue)
![GitHub contributors](https://img.shields.io/badge/contributors-1-yellow)

This is a React app which take 5 document types in a JSON format and displays the contents as Cards
which are capable of being reordered via Drag n Drop.

## Getting Started

In the project directory, to install the packages and dependencies you can run:

#### `yarn install`

In the project directory, to run the application you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Usage

The page initially displayed a grid of Cards for the document types provided by a static JSON file called
"inputs.json" in the "src/static/json" folder. Now it fetches the document types from the Back End using
REST API to display the cards.

Click on the cards to see their images being displayed as an overlay in the middle of the page.

Drag and drop feature to reorder the cards has been added and its working.

Tying up of the Front End application with the Back End Application is complete.

## Post Development Notes

- The cards were displayed as a Grid initially, but due to Grid's limitations on Drag and Drop events of
  placing the cards and maintaining the order, I had to replace it with a List. Although, I have tried to
  make it look a Grid on the UI and worked upon the requested feature. It's not seamless but gets the job
  done. Due to time constraints I am not able to perfect it.

- TBH the Front End was heavy on development as there were many features to be developed compared to the
  Back End. I have used React hooks wherever necessary. Some features like maintaining the state of the cards
  (for updating the cards order/reorder) on the Front & Back ends could have been done using Redux or Mobx or similar
  state management tools. Nevertheless I have implemented the feature by keeping it simple and straight forward
  with a hook called "useEffect".

- Also, I like to work on the skeleton of the application (as much as I can) to keep things in their proper places.
  Hence you may observe that in this application as well.

- Developing this application was fun and challenging. Enjoyed it!

## Technologies Used

- yarn
- Create React App
- React.js
- Javascript
- Material UI
- HMTL5
- CSS
- Axios
- ESLint
- Prettier
- Git
- Visual Studio Code
