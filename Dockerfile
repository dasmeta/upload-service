FROM node:14-slim

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV ADMIN_URL=/strapi-upload

COPY . .

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
