FROM node:18.16.0

WORKDIR /app/src

COPY package.json .
COPY . .

RUN yarn install

CMD yarn start
