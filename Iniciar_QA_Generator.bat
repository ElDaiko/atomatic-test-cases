@echo off
title QA Generator
color 0A
echo.
echo ===========================
echo      QA GENERATOR
echo ===========================
echo.
echo Iniciando aplicacion...
cd /d "%~dp0dist-electron\win-unpacked"

if not exist "QA Generator.exe" (
    echo ERROR: No se encontro el ejecutable
    echo Verifica que todos los archivos esten presentes
    pause
    exit /b 1
)

echo Ejecutando desde: %CD%
echo.
start "" "QA Generator.exe"
echo Aplicacion iniciada exitosamente!
echo.
echo Presione cualquier tecla para cerrar esta ventana.
pause > nul
