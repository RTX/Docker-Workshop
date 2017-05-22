# 101 Windows Containers 

### Setup Windows Server 2016 Containers Role

##### 

In this Lab we will setup a fresh windows server 2016 and install the latest version of docker runtime for windows 

if you already have an old version of docker you can follow the update steps below from step 4

<br>
<br>
## Step 1 
### Enable Docker on windows 2016

To install Docker we'll use the OneGet MicrosoftDockerProvider. 

this provider will automaticaly enables the containers feature and modules on your windows server 2016 machine. 

Open PowerShell CLI  with elevated privileges 

```powershell
    Install-Module -Name DockerMsftProvider -Repository PSGallery -Force
```


<br>
<br>

## Step 2 
### Install latest version of Docker 

The next command will use the previues installd module to install the latest avaliable version of docker 

```powershell
    Install-Package -Name docker -ProviderName DockerMsftProvider
```



<br>
<br>

## Step 3 
### Reboot 


Reboot your machine 

```powershell
    Restart-Computer -Force
```



## Step 4 
### Update an old version of docker on windows server 

you can skip this step if its a clean install and jump to step 5 
<br>
Check the currant docker version on your machine 
 
```powershell
    Get-Package -Name Docker -ProviderName DockerMsftProvider
```


Find what is  the Latest docker version 
 
```powershell
    Find-Package -Name Docker -ProviderName DockerMsftProvider
```


Update Docker 
 
```powershell
    Install-Package -Name Docker -ProviderName DockerMsftProvider -Update -Force
   
```
```powershell
    Start-Service Docker
   
```

## Step 5 
### Install Windows updates 
 
Make sure your windows is updated to the latest version 

```cmd
    sconfig
```

Select option 6

```cmd
===============================================================================
                         Server Configuration
===============================================================================

1) Domain/Workgroup:                    Workgroup:  WORKGROUP
2) Computer Name:                       WIN-HEFDK4V68M5
3) Add Local Administrator
4) Configure Remote Management          Enabled

5) Windows Update Settings:             DownloadOnly
6) Download and Install Updates
7) Remote Desktop:                      Disabled

```



https://store.docker.com/editions/community/docker-ce-desktop-windows
## Step 6
### Run your first windows container 

Open a Terminal window  

```cmd
    docker run microsoft/dotnet-samples:dotnetapp-nanoserver



Dotnet-bot: Welcome to using .NET Core!
    __________________
                      \
                       \
                          ....
                          ....'
                           ....
                        ..........
                    .............'..'..
                 ................'..'.....
               .......'..........'..'..'....
              ........'..........'..'..'.....
             .'....'..'..........'..'.......'.
             .'..................'...   ......
             .  ......'.........         .....
             .                           ......
            ..    .            ..        ......
           ....       .                 .......
           ......  .......          ............
            ................  ......................
            ........................'................
           ......................'..'......    .......
        .........................'..'.....       .......
     ........    ..'.............'..'....      ..........
   ..'..'...      ...............'.......      ..........
  ...'......     ...... ..........  ......         .......
 ...........   .......              ........        ......
.......        '...'.'.              '.'.'.'         ....
.......       .....'..               ..'.....
   ..       ..........               ..'........
          ............               ..............
         .............               '..............
        ...........'..              .'.'............
       ...............              .'.'.............
      .............'..               ..'..'...........
      ...............                 .'..............
       .........                        ..............
        .....


**Environment**
Platform: .NET Core 1.0
OS: Microsoft Windows 10.0.14393
```



https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/quick-start-windows-server
