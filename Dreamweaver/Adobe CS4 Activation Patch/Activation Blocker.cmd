@ echo off
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 0 echo 127.0.0.1				activate.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				practivate.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				ereg.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				activate.wip3.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				wip3.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				3dns-3.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				3dns-2.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				adobe-dns.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				adobe-dns-2.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				adobe-dns-3.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				ereg.wip3.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				activate-sea.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				wwis-dubc1-vip60.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 1 echo 127.0.0.1				activate-sjc0.adobe.com>>%WINDIR%\system32\drivers\etc\hosts
FIND /C /I "activate.adobe.com" %WINDIR%\system32\drivers\etc\hosts
echo
cls
cls
echo Server Blacklist Added!
pause