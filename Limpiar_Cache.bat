@echo off
title Limpieza QA Generator
color 0A
echo.
echo ===========================
echo   LIMPIEZA QA GENERATOR
echo ===========================
echo.
echo Limpiando archivos temporales...

if exist "dist-electron" (
    echo Eliminando dist-electron...
    rmdir /s /q "dist-electron"
)

if exist "dist" (
    echo Eliminando dist...
    rmdir /s /q "dist"
)

if exist "electron-cache" (
    echo Eliminando electron-cache...
    rmdir /s /q "electron-cache"
)

if exist "node_modules\.cache" (
    echo Eliminando cache de node_modules...
    rmdir /s /q "node_modules\.cache"
)

echo.
echo Limpieza completada!
echo.
pause
