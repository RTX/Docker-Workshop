# 201 Start A Swarm Ckuster Lab

### Run a swarm cluster locally using docker-machine  

##### 
<br>
<br>



## Step 1 
### Start 3 new VMs 

we will use docker-machine to start vms for our cluster 

```{r, engine='bash', count_lines}
    docker-machine create --driver virtualbox SwarmManager
    docker-machine create --driver virtualbox SwarmWorker-1
    docker-machine create --driver virtualbox SwarmWorker-2

```
<br>

## Step 2 
### set your docker CLI to talk to the swarm manager 

we will use docker-machine to start vms for our culster 

```{r, engine='bash', count_lines}
    $ eval "$(docker-machine env SwarmManager)"
    
```
<br>



## Step 3
### Create a Swarm 

```{r, engine='bash', count_lines}
    $ docker swarm init
   
```

```{r, engine='bash', count_lines}
    $ docker swarm --advertise-addr <IP> init 
   
```

<br>

## Step 4
### Run a swarm visualizer container 

to help you see the way swarm work we will run a container that serves as a UI for our swarm 

To do it we will use ManoMaManoMarks/docker-swarm-visualizer and we eill run it on our Swarm Manager 
you can find it on https://github.com/ManoMarks/docker-swarm-visualizer

We are running our cli connect to the host  

```{r, engine='bash', count_lines}
    $ docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock manomarks/visualizer
   
```

To see the IP of your Swarm Manager and go to the manager ip on browser <ip>:8080

```{r, engine='bash', count_lines}
    $ docker-machine ls 
   
```
<br>

## Step 5
### Get the Join token 

Yuu can get the manager or the worker token

```{r, engine='bash', count_lines}
    $ docker swarm join-token worker 
   
```

```{r, engine='bash', count_lines}
    $ docker swarm join-token manager 
   
```

## Step 6
### SSH to your workers 

SSH to your each worker   


```{r, engine='bash', count_lines}
    $ docker-machine ssh SwarmWorker-1    
```
Run the command we got on the join-token command

```{r, engine='bash', count_lines}
    $ docker swarm join \
    --token SWMTKN-1-5q96hvxa05xrrpi7giecz4uls8vfsohpu4r7rhfquyydtl4d68-67eb4dqb0esqi4wtmwaeeintz \
    192.168.65.2:2377   
```

## Step 7 
### Run Docker swarm mode 
docker compose will build our containers and 

```{r, engine='bash', count_lines}
    $ docker service create --name hello-world -- replicas 3 -p 81:80 tutum/hello-world
```





## Step 8 
### Last step 

    Open your browser and browse to http://<Any Warm IP>:81

   
