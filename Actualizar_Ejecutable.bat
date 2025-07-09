@echo off
echo Actualizando ejecutable QA Generator...
echo.

echo 1. Construyendo aplicacion web...
call npm run build
if %errorlevel% neq 0 (
    echo Error al construir la aplicacion
    pause
    exit /b 1
)

echo 2. Copiando archivos actualizados al ejecutable...
copy /Y main.js dist-electron\win-unpacked\main.js
xcopy /Y /E dist dist-electron\win-unpacked\dist\

echo 3. Actualizacion completada
echo.
echo El ejecutable ha sido actualizado exitosamente.
echo Ubicacion: dist-electron\win-unpacked\Generador de Casos de Prueba QA.exe
echo.
pause
