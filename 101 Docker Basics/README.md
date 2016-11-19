# 101 Docker Basics Lab

##### Follow this lab to start working with basic docker comands like running a new container, stopping deleting and more...



<br>

## Step 1 
### Install Docker

In this demo i will assume you have a docker host machine you can use to run your containers on. 
If you dont, go ahead and install docker on your machine 

To run docker on windows or mac use docker for mac / windows 
 
Download and install the appropriate version 

* Mac : Docker for Mac https://docs.docker.com/docker-for-mac/
* Windows 10 : Docker for Windows https://docs.docker.com/docker-for-windows/
* Windows 7 : Docker toolbox https://www.docker.com/products/docker-toolbox



## Step 2 
### Run your first container 

At first lets run a very simple container and ask it to "echo" "hello world" 

Open a terminal window and type $ docker run....
```{r, engine='bash', count_lines}
    $ docker run busybox echo "hello world"
    $ hello world
```

### Congrats 
you used your first container :). 

You can see that the container gave us an out put of "Hello World" 



## Step 3 
### lets interact with a container 

lets run an Ubuntu server 

* -i for interactive mode,
   will print the stdin, stdout, stderr 
* -t to start a tty
* /bin/bash will override any default command and will run as the main process on the container 

```{r, engine='bash', count_lines}
    $ docker run -i -t ubuntu:16.04 /bin/bash
```
you are now inside the container 

# To quit the container without exiting the main process use 
# *  CTRL q + p 

<br>

## Step 4 
### Run a container in detached mode 

```{r, engine='bash', count_lines}
    $ docker run -i -t -d ubuntu:16.04 /bin/bash
```

Or all together 
```{r, engine='bash', count_lines}
    $ docker run -itd ubuntu:16.04 /bin/bash
```

Get local docker images list 

```{r, engine='bash', count_lines}
    $ docker images
```

Get the running containers list 

```{r, engine='bash', count_lines}
    $ docker ps
```

Get the running or exited containers list 

```{r, engine='bash', count_lines}
    $ docker ps -a
```
