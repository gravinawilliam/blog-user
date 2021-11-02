FROM node:14.18-alpine

RUN apk add --no-cache bash

RUN npm config set cache /home/node/app/blog-user/.npm-cache --global

RUN mkdir -p /home/node/app/blog-user

USER node

WORKDIR /home/node/app/blog-user
