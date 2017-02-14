
# 104 Container Volumes Lab

## Start to work with container volumes 

<br>
<br>



## Step 1 
### Create a volume container

```{r, engine='bash', count_lines}
    $ docker create -v /tmp --name datacontainer ubuntu    
```
<br>



## Step 2
### Start a new container and link it to the volume container  

```{r, engine='bash', count_lines}
    $ docker run -t -i --volumes-from datacontainer ubuntu /bin/bash
```

<br>

## Step 3
### Create a file in the volume folder 

Add a new file in tmp 
```{r, engine='bash', count_lines}
    $ echo "I Love Docker []: " > /tmp/hello.txt
```


## Step 4
### Create a new container linked to the volume 


```{r, engine='bash', count_lines}
    $ docker run -t -i --volumes-from datacontainer ubuntu /bin/bash
    $ ls /tmp
   
```

hello.txt is allready there 

