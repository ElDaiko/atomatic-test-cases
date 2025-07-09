@echo off
echo Creando paquete portable para QA...
echo.

:: Crear carpeta de distribución
if exist "QA_Generator_Portable" rmdir /s /q "QA_Generator_Portable"
mkdir "QA_Generator_Portable"

:: Copiar ejecutable y archivos necesarios
echo Copiando ejecutable...
xcopy /E /I /Y "dist-electron\win-unpacked" "QA_Generator_Portable\dist-electron\win-unpacked"

:: Copiar archivos de usuario
echo Copiando guías de usuario...
copy /Y "GUIA_USUARIO.md" "QA_Generator_Portable\"

:: Crear launcher mejorado
echo Creando launcher...
echo @echo off > "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo title Generador de Casos de Prueba QA >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo color 0A >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo. >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo ========================================= >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo   GENERADOR DE CASOS DE PRUEBA QA >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo ========================================= >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo. >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo Iniciando aplicacion... >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo cd /d "%%~dp0dist-electron\win-unpacked" >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo if not exist "Generador de Casos de Prueba QA.exe" ^( >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo     echo ERROR: No se encontro el ejecutable >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo     pause >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo     exit /b 1 >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo ^) >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo start "" "Generador de Casos de Prueba QA.exe" >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo Aplicacion iniciada exitosamente! >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo. >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo echo Presione cualquier tecla para cerrar esta ventana. >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"
echo pause ^> nul >> "QA_Generator_Portable\🚀 Iniciar_QA_Generator.bat"

:: Crear archivo de información
echo Creando archivo de información...
echo GENERADOR DE CASOS DE PRUEBA QA > "QA_Generator_Portable\LEEME.txt"
echo ================================= >> "QA_Generator_Portable\LEEME.txt"
echo. >> "QA_Generator_Portable\LEEME.txt"
echo INICIO RAPIDO: >> "QA_Generator_Portable\LEEME.txt"
echo 1. Doble clic en "🚀 Iniciar_QA_Generator.bat" >> "QA_Generator_Portable\LEEME.txt"
echo 2. La aplicacion se abrira automaticamente >> "QA_Generator_Portable\LEEME.txt"
echo. >> "QA_Generator_Portable\LEEME.txt"
echo CONTENIDO: >> "QA_Generator_Portable\LEEME.txt"
echo - 🚀 Iniciar_QA_Generator.bat: Ejecutar aplicacion >> "QA_Generator_Portable\LEEME.txt"
echo - GUIA_USUARIO.md: Instrucciones detalladas >> "QA_Generator_Portable\LEEME.txt"
echo - dist-electron/: Archivos del programa >> "QA_Generator_Portable\LEEME.txt"
echo. >> "QA_Generator_Portable\LEEME.txt"
echo Version: 1.0.0 >> "QA_Generator_Portable\LEEME.txt"
echo Fecha: %date% >> "QA_Generator_Portable\LEEME.txt"

echo.
echo ✅ Paquete portable creado exitosamente!
echo.
echo 📁 Ubicación: QA_Generator_Portable\
echo 📦 Tamaño: ~200MB
echo 🎯 Listo para enviar al equipo de QA
echo.
echo Instrucciones para el QA:
echo 1. Descomprimir/copiar la carpeta QA_Generator_Portable
echo 2. Doble clic en "🚀 Iniciar_QA_Generator.bat"
echo 3. Seguir las instrucciones en GUIA_USUARIO.md
echo.
pause
