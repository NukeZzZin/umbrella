FROM node:17.9.0

RUN mkdir -p /usr/src/umbrella
WORKDIR /usr/src/umbrella
COPY package.json /usr/src/umbrella
RUN yarn && yarn tsc

CMD ["yarn run ./build/index.js"]