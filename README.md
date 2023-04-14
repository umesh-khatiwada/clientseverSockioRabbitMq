Client Server SocketIO RabbitMQ
This is a real-time messaging application that uses SocketIO to establish a connection between the client and server. The server uses RabbitMQ to implement a message queue for processing incoming messages from the client. The processed messages are then sent back to the client via SocketIO.

Prerequisites
Before you can run this project, you will need to have Docker installed on your system.

Installation
To install the dependencies for the server, navigate to the server directory and run the following command:

Copy code
docker build -t consumer ./
This will build the Docker image for the server.

To run the server, execute the following command in the root directory of the project:

Copy code
docker-compose up
This will start the server and the client on ports 3002 and 3000 respectively.

To feed data to the server, execute the following command in the root directory of the project:

bash
Copy code
docker-compose exec consumer /bin/bash -c 'for ((i=1;i<=20;i++)); do node publisher.js; done'
This will send 20 messages to the server for processing.

Contributing
If you would like to contribute to this project, feel free to submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
