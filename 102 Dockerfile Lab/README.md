# 102 Dockerfiles Lab

### Multi Containers Environment 

##### Follow this lab to build a simple multi container environment using a NodeJs express application and a redis caching container.

The demo is using a NodeJS Express application that listens to port 8080 and return a view counter t
The counter is stored on the  redis server. and every time the NodeJS Server gets a request it will pull the number from the redis container and will increes the current number by 1.

In this demo We will run 2 separated containers and connect them so they can comunicate. 
<br>
<br>
## Start a redis container 

To run our application we will need a redis container. so lets start one

you will use a ready redis container form  DockerHub https://hub.docker.com/_/node/ .

Lets run it now and come back to it a bit later when we run our  nodeJs app.

```{r, engine='bash', count_lines}
    $ docker run -d -p 6379:6379 --name redis redis
```

Notice that we used  -p to tell docker to expose and link port 6379 on the host to 6379 port on the container.  the left one is the Host port and the right one is the container port.

If you dont specify a host port, docker will rendomly choose one for you.
<br>
<br>

## Create the node web application 

Lets first create a new folder and name it NodeApp. 
inside the folder create a new pageCounter.js file.

```javascript
    var express = require('express'),
        http = require('http'),
        redis = require('redis');

    var app = express();
    var client = redis.createClient('6379', 'redis');

    app.get('/', function(req, res, next) {
    client.incr('counter', function(err, counter) {
    if(err) return next(err);
        res.send('This page hlsas been viewed <b>' + counter +  '</b> times!');
    });
    });

    http.createServer(app).listen(process.env.PORT || 8080, function() {
    console.log('Listening on port ' + (process.env.PORT || 8080));
    });
```
<br>

## Create a new package.json file

Package Json file is used by npm to download the requierd liberraries.

We will use a 2 npm libraries, express, redis.

```json
    {
    "dependencies": {
        "express": "^4.14.0",
        "redis": "^2.6.3"
        }
    }
```
<br>

## Create Your First Dockerfile 
A Dockerfile describes the steps you would manually do to setup your server.  
It will tell docker how to build our container using the docker file as a step by step script.

TODO: Link to a blog post on dockerfile 
```Dockerfile 
    # Set the base image to official node container
    FROM node

    # File Author / Maintainer
    MAINTAINER Rotem Or rotemo@sela.co.il

    # Provides cached layer for node_modules
    ADD package.json /tmp/package.json
    RUN cd /tmp && npm install
    RUN mkdir -p /src && cp -a /tmp/node_modules /src/

    # Define working directory
    WORKDIR /src
    ADD . /src

    # Expose the listening port 
    EXPOSE  8080

    # Run app using nodemon
    CMD ["node", "/src/pageCounter.js"]
```

Now when we have a docker file we can tell docker to build and pack our application in a container.

The build command is short and simple docker command.

* Make sure you run the command from the NodeApp folder 

```{r, engine='bash', count_lines}
    $ cd NodeApp
    $ docker build -t nodeapp:latest .
```
* the -t tell docker how to name the container, you can use tags by spacify a name:tag. tags can be used to manage versions of a container.

### Now lets run our container

you can see we expose port 8080
and we are using --link to link to our redis container 


```{r, engine='bash', count_lines}
    $ docker run -d -p 8080:8080 --link redis nodeapp:latest 
```

### Last step 

    Open your browser and browse to http://localhost:8080 

    you should get a response with a page view counter 

