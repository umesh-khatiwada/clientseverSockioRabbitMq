Getting Started
To get started, you will need to clone the repository from GitHub and install the necessary dependencies.

Prerequisites
Before you can run this project, you will need to have the following installed on your system:
1.Docker

Installing
To install the dependencies for the server, navigate to the server directory and run the following command:

docker build -t cunsomer ./    =>> To Build the docker images

docker-compose up      =>> To Run the Docker Images

docker-compose exec consumer /bin/bash -c 'for ((i=1;i<=20;i++)); do node publisher.js; done'       =>> Feed the Data to the server 



Running the Client
After (docker-compose up ) client will start the port at 3000.


Running the Server
After (docker-compose up ) server will start the port at 3002.


How it Works
The client and server use SocketIO to establish a real-time connection between the client and server. The client sends messages to the server, which are then processed by the server and sent back to the client.

To facilitate message processing, the server also uses RabbitMQ to implement a message queue. When the client sends a message to the server, the message is placed in the queue. The server then processes messages from the queue and sends the results back to the client , filter out certain messages to be sent to the front end via Socket.IO.

Contributing
If you would like to contribute to this project, feel free to submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
# clientseverSockioRabbitMq
