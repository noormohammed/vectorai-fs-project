FROM python:3.7

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/backend/app

# COPY ./app /app
COPY . .

COPY ./requirements.txt .

RUN python -m pip install --upgrade pip

# Install python dependencies
RUN pip install pipenv

RUN pip install -r requirements.txt

EXPOSE 8000

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
