@echo off
title Generador de Casos de Prueba QA
color 0A
echo.
echo =========================================
echo   GENERADOR DE CASOS DE PRUEBA QA
echo =========================================
echo.
echo Iniciando aplicacion...
cd /d "%~dp0dist-electron\win-unpacked"

if not exist "Generador de Casos de Prueba QA.exe" (
    echo ERROR: No se encontro el ejecutable
    echo Verifica que todos los archivos esten presentes
    pause
    exit /b 1
)

echo Ejecutando desde: %CD%
echo.
start "" "Generador de Casos de Prueba QA.exe"
echo Aplicacion iniciada exitosamente!
echo.
echo Presione cualquier tecla para cerrar esta ventana.
pause > nul
