# 102 Dockerfiles Lab

### Multi Containers Environment 

##### Follow this lab to build a simple multi container environment using a NodeJs express application and a redis caching server.

Our NodeJS application is a simple express application that listens to port 8080 and return a counter that we store on the  redis server .
We will run two separated containers and connect them to each other so they can talk. 
<br>
<br>
## Start a redis container 
To run our application we will need a redis container 

We will use a redis container form the DockerHub https://hub.docker.com/_/node/

Lets run it and come back to it a bit later 

```{r, engine='bash', count_lines}
    $ docker run -d -p 6379:6379 --name redis redis
```

The -p will tell docker to link port 6379 on the host to 6379 port on the container  
<br>
<br>

## Lets create the node application 
Create a new folder and name it NodeApp

create a new pageCounter.js file.

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
We will use a 2 npm libraries and we will list them in the package.json file 

```json
    {
    "dependencies": {
        "express": "^4.14.0",
        "redis": "^2.6.3"
        }
    }
```
<br>

## Create the NodeJs Dockerfile 
The Dockerfile describes the steps you would of done manually if you would need to install the same application on a server 

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

To build the container we will run a short and simple docker build command.

* Make sure you run the command from the NodeApp folder 

```{r, engine='bash', count_lines}
    $ cd NodeApp
    $ docker build -t nodeapp:latest .
```

Now lets run our container

you can see we expose port 8080
and we are using --link to link to our redis container 


```{r, engine='bash', count_lines}
    $ docker run -d -p 8080:8080 --link redis nodeapp:latest 
```

### Last step 

    Open your browser and browse to http://localhost:8080 

    you should get a response with a view counter 

