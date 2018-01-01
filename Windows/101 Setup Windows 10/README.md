# 101 Install Docker On Windows 10 

### Install Docker Community Edition (CE) on windows 10 

##### 

In this Lab we will install "Docker for windows (CE)" on a windows 10 machine 

<br>
<br>

## Step 1
### Enable Hyper-V virtualization on your BIOS 

Docker for Windows requires 64bit Windows 10 Pro with Hyper-V 
Hyper-V virtualization needs to be enabled on your BIOS 

## Important : Enableing Hyper-V virtualization on your BIOS will disable Orcale VirtualBox 

<br>
<br>

## Step 2
### Download and install Docker Community Edition (CE) for windows 

Download installers from the Stable or Edge channel.

Edge channel will contain the latest and gratest features 
Keep in mind that edge build might be unstable and mught crash from time to time


Stable : https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe
<br>
Edge : https://download.docker.com/win/edge/Docker%20for%20Windows%20Installer.exe


<br>


## Step 2 
### Install latest version of Docker 

The next command will use the previues installd module to install the latest avaliable version of docker 


<br>

## Step 3 
### Start Docker  


Start "Docker for windows" </br>
on the first time docker will install a small VM as your new docker host using alpine linux distribution  on the Hyper-V hypervisor named "MobyLinuxVM" <br>
You can find docker icon on your windows tray icons as a small whale carying boxes on his back :) 

<br>

## Step 4 
### Switch to Windows containers 

right click on the "Docker" icon on your tray icons <br>
click "Switch to windows containers" <br><br>

docker will stop the linux docker host (the alpine VM) and  will start a new windows container host that will enable you to run Windows Containers 




Update Docker 
 
```powershell
    Install-Package -Name Docker -ProviderName DockerMsftProvider -Update -Force
   
```
```powershell
    Start-Service Docker
   
```

## Step 5 
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


