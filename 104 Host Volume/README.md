
# 104 Host Volumes Lab

## Start to work with container volumes 

<br>
<br>



## Step 1 
### Create a folder on the host 

```{r, engine='bash', count_lines}
    $ mkdir ~/html
```
<br>



## Step 2
### Start a new nginx container with a volume pointing  to the host folder  


```{r, engine='bash', count_lines}
    $ docker run -t -i -v ~/html:/usr/share/nginx/html -p 5000:80 -i nginx
```

<br>

## Step 3
### Create a file in the volume folder 

Add a new index.html file in ~/html 
```{r, engine='bash', count_lines}
    $ echo "I Love Docker []: " > /html/index.html
```


## Step 4
### Browse to the container 

You can now edit the html file on the host and see the results on the container without rebuilding it 

```{r, engine='bash', count_lines}
    $ docker run -t -i --volumes-from datacontainer ubuntu /bin/bash
    $ ls /tmp
   
```

hello.txt is allready there 

