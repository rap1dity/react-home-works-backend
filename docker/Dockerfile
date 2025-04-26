FROM node:22-alpine

RUN mkdir -p /usr/src/app
RUN chown -R node:node /usr/src/app

USER node
COPY --chown=node:node package*.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm ci

COPY --chown=node:node . /usr/src/app
RUN npm run build
CMD npm run migrate:up && npm run start:dev