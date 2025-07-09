@echo off
title Crear Paquete QA Generator
color 0A
echo.
echo ===========================
echo   PAQUETE QA GENERATOR
echo ===========================
echo.

echo Creando paquete optimizado...

:: Crear carpeta de distribución
if exist "QA_Generator_v1.0" rmdir /s /q "QA_Generator_v1.0"
mkdir "QA_Generator_v1.0"

:: Copiar ejecutable optimizado
echo Copiando ejecutable optimizado...
copy /Y "dist-electron\QA Generator-1.0.0.exe" "QA_Generator_v1.0\"

:: Copiar guía de usuario
echo Copiando guía de usuario...
copy /Y "GUIA_USUARIO.md" "QA_Generator_v1.0\"

:: Crear launcher optimizado
echo Creando launcher...
(
echo @echo off
echo title QA Generator
echo color 0A
echo echo.
echo echo ===========================
echo echo      QA GENERATOR
echo echo ===========================
echo echo.
echo echo Iniciando aplicacion...
echo echo.
echo if not exist "QA Generator-1.0.0.exe" ^(
echo     echo ERROR: No se encontro el ejecutable
echo     pause
echo     exit /b 1
echo ^)
echo start "" "QA Generator-1.0.0.exe"
echo echo Aplicacion iniciada exitosamente!
echo echo.
echo echo Presione cualquier tecla para cerrar esta ventana.
echo pause ^> nul
) > "QA_Generator_v1.0\Iniciar_QA_Generator.bat"

:: Crear archivo de información
echo Creando archivo de información...
(
echo QA GENERATOR v1.0
echo =================
echo.
echo INICIO RAPIDO:
echo 1. Doble clic en "Iniciar_QA_Generator.bat"
echo 2. La aplicacion se abrira automaticamente
echo.
echo CONTENIDO:
echo - Iniciar_QA_Generator.bat: Ejecutar aplicacion
echo - QA Generator-1.0.0.exe: Aplicacion principal ^(~80MB^)
echo - GUIA_USUARIO.md: Guia de usuario
echo - LEEME.txt: Este archivo
echo.
echo OPTIMIZACIONES:
echo - Tamaño reducido de 700MB a ~80MB
echo - Solo idiomas Inglés y Español
echo - Compresión máxima aplicada
echo - Eliminados archivos innecesarios
echo.
echo Para soporte, contacte al equipo de desarrollo.
) > "QA_Generator_v1.0\LEEME.txt"

echo.
echo Paquete creado exitosamente en: QA_Generator_v1.0\
echo Tamaño aproximado: ~80MB
echo.
echo Listo para comprimir en ZIP y distribuir!
echo.
pause
