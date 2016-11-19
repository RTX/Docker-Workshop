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

At first lets run a very simple busybox bcontainer and ask it to "echo" "hello world" 
busy box is a very small and striped down container that can be used to build simple light weight containers 

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

Next we will run an Ubuntu container and and use the conatiner bash to interact with it.

lets run an Ubuntu server 

```{r, engine='bash', count_lines}
    $ docker run -i -t ubuntu:16.04 /bin/bash
```

* -i for interactive mode,
   will print the stdin, stdout, stderr 
* -t to start a tty
* ubuntu:16.04 (container type)
* /bin/bash will override any default command and will run as the main process on the container 


you are now inside the container 

# To quit the container without exiting the main process use 
# *  CTRL p + q 

<br>

## Step 4 
### Run a container in detached mode 

In the previous step we used the ubuntu container but we ended inside the Ubuntu machine.  but when we use container in real life schenario we usualy not going to be loged in to the machine and it will run in the background 

So to do that we add the -d to the run command and it will run the container without shoing us the bash command 

```{r, engine='bash', count_lines}
    $ docker run -i -t -d ubuntu:16.04 /bin/bash
```

Or all together 
```{r, engine='bash', count_lines}
    $ docker run -itd ubuntu:16.04 /bin/bash
```

### List the running containers 

To list the running containers list use the ps command 

```{r, engine='bash', count_lines}
    $ docker ps
```

To List all the running or exited containers use ps -a command 

```{r, engine='bash', count_lines}
    $ docker ps -a
```

### List the local images 

When we run a container, docker will pull down the image we want to run to a locka images repository. 
and from the point its stored in the repo, docker will not re pull it unless we spasificly tel it to do so. 

List the local docker images  

```{r, engine='bash', count_lines}
    $ docker images
```
