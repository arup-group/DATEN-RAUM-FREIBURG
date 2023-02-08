FROM node:16 as base
WORKDIR /src
COPY package*.json ./
EXPOSE 5000

FROM base as dev
ENV NODE_ENV=dev
RUN npm ci
COPY --chown=node:node . ./
USER node
RUN npm start