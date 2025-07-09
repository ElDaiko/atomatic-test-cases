@echo off
title Build QA Generator
color 0A
echo.
echo ===========================
echo   BUILD QA GENERATOR
echo ===========================
echo.

echo Limpiando archivos anteriores...
call Limpiar_Cache.bat

echo.
echo Instalando dependencias...
npm install

echo.
echo Construyendo aplicacion...
npm run build

echo.
echo Generando ejecutable optimizado...
npm run dist

echo.
echo Build completado!
echo El ejecutable se encuentra en: dist-electron/
echo.
pause
