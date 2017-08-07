# Docker for mac Cleanup 

I found that sometimes my docker for Mac grows and grows to more the 100GB and it eats my SSD 
<br>
Here are the steps to clean it up and get your GB back 


## Stop Docker


```{r, engine='bash', count_lines}
    $ docker rm $(docker ps -a -q)
    $ docker rmi $(docker images -q)
    $ docker volume rm $(docker volume ls |awk '{print $2}')
    $ rm -rf ~/Library/Containers/com.docker.docker/Data/*
```

## Start Docker 

you should be done :) 



