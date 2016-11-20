
# 202 Use Swarm Network Lab

### Run a swarm cluster locally using docker-machine  

In this lab you will setup a local Swarm cluster and use the new routing mesh.
see a link on routing mesh at the bottom of the article.

 
<br>
<br>



## Step 1 
### Setup a network

First lets start by creating a Swarm Manager on your machine 

You can init a Swarm manager on any machine on your cluster 

```{r, engine='bash', count_lines}
    $ docker swarm init       
```
<br>

## Step 2 
### Setup the Network for the Swarm Cluster 

Next you will setup a network for the docker cluster. we will use this network to run all our containers. 

This way they will be discaverable on the network. 

```{r, engine='bash', count_lines}
   $ docker network create -d overlay nodeapp-network     
```


## Step 2
### Start a Redis service 

Start a new Swarm Service using Redis container, and run it on the network we just created 

```{r, engine='bash', count_lines}
    $ docker service create --name redis --network nodeapp-network redis:alpine
```

<br>

## Step 3
### Run a client app container 

In this step you will create a very simple node applicatin, http server that stores and read data from redis cach (our redis container)

### Create a NodeApp 

inside the folder create a Server.JS file and copy the code below to the file 

```js
    var http = require("http");
    var redis_client = require("redis").createClient(6379, 'redis');

    var server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });

    var total_requests;

    redis_client.incr("requests", function (err, reply) {
        total_requests = reply; // stash response in outer scope
    });
    redis_client.hincrby("ip", request.connection.remoteAddress, 1);
    redis_client.hgetall("ip", function (err, reply) {
        // This is the last reply, so all of the previous replies must have completed already
        response.write("This page was generated after talking to redis.\n\n" +
                    "Application Build: 1" + "\n\n" + 
                    "Total requests: " + total_requests + "\n\n" +
                    "IP count: \n");
        Object.keys(reply).forEach(function (ip) {
        response.write("    " + ip + ": " + reply[ip] + "\n");
        });
        response.end();
    });
    }).listen(3000);
    console.log('Listening on port 3000');
```
## Step 4
### Create a package.json file 

create a package.json in the same folder 

```json
  {
      "name": "scrapbook-redis-node-docker-example",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "start": "node server.js"
      },
      "dependencies": {
        "redis": "^0.12.1"
      }
    }
```

## Step 5 
### Create a Dockerfile 

creage a Dockerfile in the same folder 

```Dockerfile
     FROM node

    RUN mkdir -p /usr/src/app
    WORKDIR /usr/src/app

    COPY package.json /usr/src/app/
    RUN npm install

    COPY . /usr/src/app

    EXPOSE 3000
    CMD [ "npm", "start" ]
```
## Step 6 
### Build the NodeJs Container 


```{r, engine='bash', count_lines}
    $ docker build -t webdemo .   
```
<br>

## Step 7
### Run the Web application in scale 

```{r, engine='bash', count_lines}
    $ docker service create --name app1-web --network nodeapp-network --replicas 4 -p 800:3000 webdemo
   
```



## Step8
### Browse to any container <IP>:800 

We can browse to any container on port 800 and we will get our application.

This is possible becouse of the new "Routing Mesh" that was introduced on docker 1.12 
For more info on the routing mesh : https://docs.docker.com/engine/swarm/ingress/


