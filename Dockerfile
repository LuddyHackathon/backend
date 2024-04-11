FROM node:current-alpine

RUN mkdir -p /home/node/backend/node_modules && chown -R node:node /home/node/backend

WORKDIR /home/node/backend

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 65535

CMD [ "node", "server.js" ]
