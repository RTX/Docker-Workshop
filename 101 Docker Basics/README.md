# 101 Docker Basics Lab

##### Follow this lab to start working with docker 

<br>

## Step 1 
### Install Docker

To run docker on windows or mac use docker for mac / windows 
 
Download and install the appropriate version 

* Docker for Mac https://docs.docker.com/docker-for-mac/
* Docker for Windows https://docs.docker.com/docker-for-windows/



## Step 2 
### Run your first container 

Open a terminal window and type $ docker run....
```{r, engine='bash', count_lines}
    $ docker run busybox echo "hello world"
    $ hello world
```

### Congrats 
you used your first container :)



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
### Last step 

    Open your browser and browse to http://localhost:8080 

    you should get a response with a view counter 

# To quit the container without exiting the main proccess use 
# *  CTRL q + p 

<br>

## Step 4 
### Run a container in detuched mode 

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
