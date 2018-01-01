# 101 ASP.Net Container

### Build and run your first ASP.Net container 

##### In this Lab we will build and run a simple ASP.net web app container from scrach 


<br>
<br>

## Step 1
### Create and build a new Asp.Net Web Application project 

Open Visual stuio <br>
Create a new Project of type Web Application <br>
Select Asp.Net Framwork Application </br>
Select WebApi Application </br>
Restore Nuget packages and build the new project</br>



<br>


## Step 2 
### Create a new Docker file 

Add a new file to the project and name it Dockerfile. <br>

make sure the file have no extention <br>

Copy the content to the file 


```Dockerfile 
FROM microsoft/aspnet
WORKDIR /inetpub/wwwroot  
COPY /bin . 
```



<br>
<br>

## Step 3 
### Publish your Web App 

publish your web app to a local folder 




## Step 4 
### build your new container  

open terminal window <br>
nevigate in the terminal to the new published folder <br>

enter the next command in your terminal and press [Enter]
 
```Cmd 
    docker build -t webapp .
```



## Step 5 
### run the new container 
 
type the next command to run the new container 

```cmd
    docker run -d -p 90:80 webapp
```

## Step 6
### brows your newly created ASP.Net App

Open a browser window  and nevigate to <br>
http://127.0.0.1:90 <br>

you should see the newly created app running in your container 


## .Net 3.5 App lications 

If your application were based on an older version of .NET Framework, like .NET Framework 3.5, you could use a similar base image directive like the following. <br>


FROM microsoft/dotnet-framework:3.5

use this image instead of : microsoft/aspnet