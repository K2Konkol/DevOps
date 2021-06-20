FROM node:alpine AS builder

WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /opt/app/build .
