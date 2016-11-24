
# 104 Development Volumes Lab

## Working With Volume

In this lab you will create nginx container and point the source code to a local folder.

Working with Volumes pointing to a local folder is very usefull in the dev/test.  and the developer dosnt have to rebuild a new container everytime there is code change. 


<br>
<br>



## Step 1 
### Create a local folder 

Create a new folder somewhere on your machine, 
Keep in mind taht this folder will be used as our source code folder.

```{r, engine='bash', count_lines}
    $ mkdir ~/html
```
<br>


## Step 2
### Create a new html file in the "html" folder 

Create a new index.html file in ~/html 

```{r, engine='bash', count_lines}
    $ echo "I Love Docker []: " > /html/index.html
```



## Step 3
### Start a new nginx container 

Start a new Nginx container and create a volume on the container. 

The volume in the container will point to our local folder we created on step 01.

```{r, engine='bash', count_lines}
    $ docker run -t -i -v ~/html:/usr/share/nginx/html -p 5000:80 -i nginx
```

<br>



## Step 4
### Browse to the container 

You can now edit the html file and see the results on the container without rebuilding it.



