FROM node:latest
COPY . /src
RUN cd /src; npm install
ENTRYPOINT exec node src/app.js
