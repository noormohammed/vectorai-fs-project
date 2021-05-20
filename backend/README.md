# Vector Full Stack Project - Back End App using FastAPI & PostgreSQL

![GitHub repo size](https://img.shields.io/badge/repo%20size-17KB-blue)
![GitHub contributors](https://img.shields.io/badge/contributors-1-yellow)

This is a back end application for our Vector Full Stack Front End (React) app which
is created using FastAPI and PostgreSQL. It stores the static json file data from the Front End (React app)
and updates the ordering/postions of the document types whenever the document type cards on the Front End app
are reordered using Drag and Drop events.

## Getting Started

In the project directory, create a virtual environment for the running the application:

### Windows Users

In command terminal run the following command

```shell
python -m venv env
env/Scripts/activate
python -m pip install -U pip
```

### CentOS Users Setup PIP3 and Virtual Environment

In command terminal run the following command

```shell
apt install python3-venv
python3 -m venv env
source ./env/bin/activate
python -m pip install -U pip
```

### Ubuntu Users Setup PIP3 and Virtual Environment

In command terminal run the following command

```shell
sudo apt install python3-pip
sudo pip3 install virtualenv
virtualenv env
source ./env/bin/activate
python -m pip install -U pip
```

In the project directory, to install the packages and dependencies you can run:

#### `pip install -r requirements.txt`

Make sure to edit the .env file and update the DATABASE_URL according to your PostgreSQL database
and access credentials.

To make the database migrations, run the following command

```
alembic init alembic
alembic revision — autogenerate -m "First commit"
alembic upgrade head
```

In the project directory, to run the application you can run:

#### `uvicorn main:app --reload`

Runs the app in the development mode.\
Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view it in the browser.

## Documentation and Usage

    swagger - http://127.0.0.1:8000/docs
    redoc - http://127.0.0.1:8000/redoc

## To-Do

- PUT API to save/update the document types data whenever the corresponding cards are reordered on the Front End

## Technologies Used

- FastAPI
- Starlette
- Uvicorn
- PostgreSQL
- Alembic
- SQLAlchemy
- Git
- Visual Studio Code
