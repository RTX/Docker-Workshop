# 201 Start A Swarm Cluster Lab

### Run a swarm cluster locally using docker-machine  

In this lab you will create a small swartm claster on Virtual Box machines running localy 

you can follow the same steps on any machine or hypervisor as long as the machines can comunicate with each other 

##### 
<br>
<br>



## Step 1 
### Start 3 new VMs 

we will use docker-machine to start vms for our cluster 

Docker machine is a tool from docker that can manage and setup docker Hosts an any environment. 

You can find drivers to all cloud providers and most of the hypervisors. 

in this demo i will use Virtual Box driver.


```{r, engine='bash', count_lines}
    docker-machine create --driver virtualbox SwarmManager
    docker-machine create --driver virtualbox SwarmWorker-1
    docker-machine create --driver virtualbox SwarmWorker-2

```
<br>

## Step 2 
### set your docker CLI to talk to the swarm manager 

Set up the Environment Variable to tell the Docker Client (your local docker client) to comunicate with a different docker host instead of your local docker host.

```{r, engine='bash', count_lines}
    $ eval "$(docker-machine env SwarmManager)"
    
```
<br>



## Step 3
### Create a Swarm 

This command will set up a Swarm Master on the machine you will run this command 

Remember you are now running the docker command on the Virtual Box Docker host and not on your local Docker Host 
```{r, engine='bash', count_lines}
    $ docker swarm init
   
```

```{r, engine='bash', count_lines}
    $ docker swarm --advertise-addr <IP> init 
   
```

<br>

## Step 4
### Run a swarm visualizer container 

To help you see the way swarm work we will run a container that serves as a UI for our swarm 

To do it we will use ManoMaManoMarks/docker-swarm-visualizer and run it on our Swarm Manager 
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

Join Tokens are the way Swarm setup the cluster. the first Swarm Master ( the one we used swarm init on) will provide us a command we will use on every machine we want to join to the cluster.

You can get the Manager or the Worker token

Manager token are used to add another manager to the swarm 

and a Wroker token is used to add workers to the cluster.

```{r, engine='bash', count_lines}
    $ docker swarm join-token worker 
   
```

```{r, engine='bash', count_lines}
    $ docker swarm join-token manager 
   
```

## Step 6
### SSH to your workers 

SSH to each of your worker machines and run the join command for the worker.   


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

Lets create a simple Hello World distributed service with 3 replicas 

```{r, engine='bash', count_lines}
    $ docker service create --name hello-world -- replicas 3 -p 81:80 tutum/hello-world
```





## Step 8 
### Last step 

    Open your browser and browse to http://<Any Warm IP>:81

   
