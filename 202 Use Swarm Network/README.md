
# 202 Use Swarm Network Lab

### Run a swarm cluster locally using docker-machine  

##### 
<br>
<br>



## Step 1 
### Setup a network

```{r, engine='bash', count_lines}
    $ docker network create -d overlay nodeapp-network
    
```
<br>



## Step 2
### Start a redis swarm service using the network we created 

```{r, engine='bash', count_lines}
    $ docker service create --name redis --network nodeapp-network redis:alpine
```

<br>

## Step 3
### Run a client app container 

We will build a very simple node http server that stores and read data from redis 


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

To build it run 

```{r, engine='bash', count_lines}
    $ docker build -t webdemo .   
```
<br>

## Step 4
### Run the Web application in scale 

```{r, engine='bash', count_lines}
    $ docker service create --name app1-web --network app1-network --replicas 4 -p 800:3000 webdemo
   
```



## Step 5
### Browse to any container <IP>:800 

