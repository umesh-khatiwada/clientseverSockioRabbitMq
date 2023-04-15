<h2> Client Server SocketIO RabbitMQ </h2>
<p> This is a real-time messaging application that uses SocketIO to establish a connection between the client and server. The server uses RabbitMQ to implement a message queue for processing incoming messages from the client. The processed messages are then sent back to the client via SocketIO.</p>

<h3>Prerequisites</h3>
Before you can run this project, you will need to have Docker installed on your system.

<h3> Installation</h3>

<ul>
<p> To install the dependencies for the server, navigate to the server directory and run the following command:</p>
 <li> docker build -t consumer ./  </li>
This will build the Docker image for the server.
  <p> To run the server, execute the following command in the root directory of the project:</p> 
 <li> docker-compose up  </li>
<p>  This will start the server and the client on ports 3002 and 3000 respectively.</p>

 <li> docker-compose exec consumer /bin/bash -c 'for ((i=1;i<=1;i++)); do node publisher.js; done'  </li>
  <p> To feed data to the server, execute the following command in the root directory of the project.This will send 20 messages to the server for processing. </p>

  </ul>
  
<h3>Contributing </h3>
If you would like to contribute to this project, feel free to submit a pull request.

<h3> License</h3>
This project is licensed under the MIT License - see the LICENSE.md file for details.
