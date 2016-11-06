# 103 Compose Nginx LB + NodeJS + Redis Lab 

### Add Nginx Load balancer  

##### In This lab you wiil add a Ngnix load balancer to the previews nodejs application we built and use docker-compose to run all containers as an environment so you can now scale up and down your system.  
 

<br>
<br>


## Setup the nginx container

Create a new folder and name it Nginx.

Create a new proxy.conf file.

```nginx
    server {

    listen 80;
    resolver 127.0.0.11 valid=5s;
    set $upstream http://nodeapp:8080;

    location / {
    
        proxy_pass $upstream;
    }
}
```
<br>

## Create the ngnix Dockerfile file

```dockerfile
    FROM nginx:alpine 

    MAINTAINER rotem or 

    RUN rm /etc/nginx/conf.d/*

    COPY proxy.conf /etc/nginx/conf.d
```
<br>

## Create a docker-compose.yml file 

we use docker-compose version 2 that uses the new networking features 
we create 3 services 
* nodejs application
* redis server
* nginx load balancer 


```yml
version: "2"

services:
  nodeapp:
    build: NodeApp
    ports:
      - "8080"
    depends_on:
         - redis 
  redis:
    image: redis
    ports: 
      - "6379"
  nginx:
    build: Nginx
    depends_on:
         - nodeapp
    ports:
      - "80:80"

  
```



## Run Compose to build the environment 
docker compose will build our containers and 

```{r, engine='bash', count_lines}
    $ docker-compose build
    
```


## Run Compose to start the environment 
docker compose will build our containers and 

```{r, engine='bash', count_lines}
    $ docker-compose up -d 
    
```





### Last step 

    Open your browser and browse to http://localhost:80

    you should get a response with a view counter 

