FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

#wait script
COPY wait.sh /bin/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

CMD [ "sh", "-c", "/usr/src/app/wait-for-it.sh rabbitmq:5672 --timeout=30 -- node consumer.js" ]

