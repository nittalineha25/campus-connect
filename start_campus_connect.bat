@echo off
title Campus Connect Launcher
color 0A

echo ========================================================
echo        STARTING CAMPUS CONNECT FULL-STACK PLATFORM       
echo ========================================================
echo.

cd /d "C:\Users\nitta\.gemini\antigravity\scratch\campus-connect"

:: Check if server is already running
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo [OK] Campus Connect server is already running on port 3000.
) else (
    echo [..] Starting Node.js server...
    start /b node server.js > server_output.log 2>&1
    timeout /t 2 /nobreak >nul
    echo [OK] Node.js server started!
)

:: Check if cloudflared is running
tasklist | findstr /i "cloudflared.exe" >nul
if %errorlevel% equ 0 (
    echo [OK] Cloudflare Tunnel is currently active.
) else (
    echo [..] Starting Cloudflare Tunnel for phone and laptop access...
    cd /d "C:\Users\nitta\.gemini\antigravity\scratch"
    start /b cloudflared.exe tunnel --url http://localhost:3000 > tunnel_output.log 2>&1
    timeout /t 5 /nobreak >nul
    echo [OK] Cloudflare Tunnel started!
)

echo.
echo ========================================================
echo   CAMPUS CONNECT IS READY!
echo.
echo   * Laptop / Local Browser: http://localhost:3000
echo   * Live Tunnel Link:
type "C:\Users\nitta\.gemini\antigravity\scratch\tunnel_output.log" 2>nul | findstr /i "trycloudflare.com"
echo.
echo ========================================================
echo Opening browser...
start http://localhost:3000

echo.
echo You can keep this window open or minimize it.
pause
