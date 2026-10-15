@echo off
cd /d "%~dp0"
echo Agridoot local app
echo Open http://127.0.0.1:5180 after the ready message.
node server.mjs
pause
