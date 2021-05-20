# vectorai-fs-project

Vector Full Stack Project using React, FastAPI, PostgresQL and Docker Compose.

This is consists of the following applications:

- Front End Application developed using React
- Back End Application developed using Python and FastAPI
- Database served by PostgreSQL.
- Docker Compose to serve all the above components as microservices.

The individual details of the Front End and Back End applications can be found their respective README.md files.

## Getting Started

In the project directory, first create docker images of all the apps/components using the following command:

#### `docker compose build --no-cache`

Once the above command executes successfully, run the following to create and run container for these images:

#### `docker compose up`

Wait for the command to complete its execution.

## Usage

Open [http://localhost:3000](http://localhost:3000) to view the Front End app in the browser.

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view the Back End app in the browser.

## Documentation and Usage of the APIs

    swagger - http://127.0.0.1:8000/docs
    redoc - http://127.0.0.1:8000/redoc

## Post Development Notes

- For the development of this project, I followed the Three-Tier Architecture which is a modular
  client-server architecture that consists of a presentation tier, an application tier and a data tier.
  This helps for teams and as well as individual developers. I started working with the presentation
  layer (Front End) first, then followed the application tier (Back End) and data tier (Database). I
  decided to work on the Docker Compose once I have all these components ready.

- When all the three components worked well together, the final part of bringing them into one cluster
  using docker compose was implemented.

### Front End Development

#### Logic

- After going through the requirements of Part 1 (and also the Part 3 requirements), I
  decided to implement the requirements of Part 1 fully, while keeping open the scope for adding the
  next features (from Part 3) once the Back End is developed.

- Initially the front end displayed the cards using the data from statis json file. But later when
  the back end was ready, the logic was slightly changed to cater the requirements.

      * The react app first checks if there is any data stored in the database by using the GET API.
      (For the first time obviously the database table holding the data is empty.)

      * So the app takes care of this by adding the statis json file data to the database on its first
      execution and the next subsequent executions/accesses to the front end app will always take the
      data present in the database so as long as it is available. Otherwise the aforementioned process
      kicks in again.

#### Challenges

- Grid: Initially the cards were displayed using a Grid component. But it has it's limitations on the
  requested feature reordering the cards via Drag and Drop. I tried making it work , spent a lot of
  time to come up wih a way to overcome this challenge but due to time constraints I looked for other
  options. Changed the Grid to a List component, and worked on the styling of the cards to appear as a
  Grid on the UI. Rest is history.

- Time: There were a lot of features to be implemented in a very short time as I am working full time
  for my current employment.

### Back End Development

#### Logic

- The backend was straight forwards to create the required POST, GET & PUT APIs to serve the features
  requested in the problem task.

#### Challenges

- Learn/Time: It was my first time working with FastAPI and few other technologies such as Starletter which
  is used with FastAPI. But it wasn't really a challenge as I have worked with Django. Yes the time factor
  did bother me.

In short, this project was an exciting and enjoyable experience. It had coding, challenges, learning opportunities,
build failures, "finally-worked" feelings, and best of all - technologies.

Thank you!
