# this is an official Python runtime, used as the parent image
FROM python:3.6.5-slim

# set the working directory in the container to /app
WORKDIR /server

# add the current directory to the container as /app
ADD . /server

# execute everyone's favorite pip command, pip install -r
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# execute the Flask app
ENV PYTHONPATH /app/server/server/src
ENV FLASK_ENV development

CMD ["python", "/app/server/server/bin/x-run.py"]
