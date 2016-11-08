
# 204 DC/OS ON AZURE

### Start a DCOS Cluster running on azure contaainer service
<br>
<br>


## Step 1
### Generate SSH Key 

To generate ssh keys follow the next tutorial.

windows 
https://docs.joyent.com/public-cloud/getting-started/ssh-keys/generating-an-ssh-key-manually/manually-generating-your-ssh-key-in-windows

Mac 
https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-mac


## Step 3 
### Login to Azure Portal

http://portal.azure.com


## Step 4
### Create a new Azure Container Service 
 
Search for Azure Container Service on the portal search box 
![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/01-Search-ACS.png)

### Fill the required fields

select a username for the ssh remote 

For the SSH key use the SSH public key that was generated on Step 1 

![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/04-Template-01.png)


Select DCOS from the drop down 
![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/04-Template-02.png)

Select The size and the number of machine nodes you want to create (including the master node)
### Each machine cost money!!!

![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/04-Template-03.png)

Click Next, accept and parches. 

## Step 5 
### Set the SSH Tunnel 

### Windows :

Follow this tutorial on how to use putty to ssh a Linux machine 
https://www.howtoforge.com/how-to-configure-ssh-keys-authentication-with-putty-and-linux-server-in-5-quick-steps

### Mac :
Run this command in the terminal to set a secured tunnel to the ACS Master node 

```{r, engine='bash', count_lines}
    $ sudo ssh -L 80:localhost:80 -f -N azureuser@MasterNodeFQDN -p 2200
    
```

<br>

When you are done you should be able to browse to 
Browse DCOS on http://localhost

<br>
![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/06-DCOS-01.png)



## Step 6
### Install Marathon + Chronos

Browse http://localhost and go to the "UNIVERS" 

Add Marathon and Chronos from the list 

![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/06-DCOS-02.png)

Search for Marathon-LB and add it as well 

DC/OS, Marathon and Mesos will be avaliable on :

* Marathon - http://localhost/marathon
* Mesos - http://localhost/mesos
* DC/OS - http://localhost

<br>


## Step 7
### Deploy a Service 

Click the "Deploy Service" button on the right 

![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/07-Deploy-Service-01.png)

Then Select the JSON Mode and paste the JSON


```json
    {
  "id": "web",
  "container": {
    "type": "DOCKER",
    "docker": {
      "image": "tutum/hello-world",
      "network": "BRIDGE",
      "portMappings": [
        { "hostPort": 0, "containerPort": 80, "servicePort": 10000 }
      ],
      "forcePullImage":true
    }
  },
  "instances": 3,
  "cpus": 0.1,
  "mem": 65,
  "healthChecks": [{
      "protocol": "HTTP",
      "path": "/",
      "portIndex": 0,
      "timeoutSeconds": 10,
      "gracePeriodSeconds": 10,
      "intervalSeconds": 2,
      "maxConsecutiveFailures": 10
  }],
  "labels":{
    "HAPROXY_GROUP":"external",
    "HAPROXY_0_VHOST":"<ASC NAME>agents.westeurope.cloudapp.azure.com",
    "HAPROXY_0_MODE":"http"
  }
}
```

![alt tag](https://github.com/RTX/2016-Sela-BigData-Conf-Docker-Workshop/blob/master/204%20DCOS%20Azure/Images/07-Deploy-Service-02.png)

Click Deploy and wait a few seconds 


Browse  <ASC NAME>agents.westeurope.cloudapp.azure.com 





### Install DC/OS CLI

https://github.com/dcos/dcos-cli
https://dcos.io/docs/1.8/usage/cli/install/

