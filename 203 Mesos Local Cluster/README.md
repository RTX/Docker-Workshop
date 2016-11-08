



## Start a Local Mesos + marathon

follow the steps on this blog post 

    http://blog.microscaling.com/2015/08/running-marathon-and-mini-mesos-as.html


add marathon Task use 

    curl -X POST http://192.168.99.101:8080/v2/apps -d @python-webserver.json -H "Content-type: application/json"