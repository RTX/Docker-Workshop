# 100 Install Chocolatey

 

In this Lab we will install Chocolatey Windows package installer 

<br>
<br>

## Step 1

open cmd and run this comand 


```cmd
    
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
   
```


<br>

## for more information see this link 

https://chocolatey.org/install




