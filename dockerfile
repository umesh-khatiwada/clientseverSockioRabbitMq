FROM node:18-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY ./*.js ./
CMD ["node", "consumer.js"]

FROM base as dev
RUN apk add --no-cache bash
#RUN wget -O /bin/wait-for-it.sh wait.sh
COPY wait.sh /bin/wait-for-it.sh

RUN chmod +x /bin/wait-for-it.sh

ENV NODE_ENV=development
RUN npm install
COPY ./*.js ./

EXPOSE 3002:3002
CMD ["node", "consumer.js"]

