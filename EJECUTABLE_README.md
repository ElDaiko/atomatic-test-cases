# Generador de Casos de Prueba QA - Ejecutable

## 📁 Archivos principales

- **`Generador de Casos de Prueba QA.exe`** - Ejecutable principal (ubicado en `dist-electron/win-unpacked/`)
- **`Iniciar_QA_Generator.bat`** - Script de inicio rápido

## 🚀 Cómo usar

### Opción 1: Ejecutar directamente

1. Navegue a la carpeta `dist-electron/win-unpacked/`
2. Haga doble clic en `Generador de Casos de Prueba QA.exe`

### Opción 2: Usar el script de inicio

1. Haga doble clic en `Iniciar_QA_Generator.bat` en la carpeta raíz

## 🔧 Desarrollo

### Comandos disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir la aplicación web
- `npm run electron` - Ejecutar la aplicación Electron
- `npm run electron-dev` - Desarrollo con Electron
- `npm run dist-simple` - Generar nuevo ejecutable

### Generar nuevo ejecutable

```bash
npm run dist-simple
```

## 📦 Distribución

El ejecutable es **portable** y no requiere instalación. Simplemente copie la carpeta `dist-electron/win-unpacked/` completa a donde desee usar la aplicación.

## 🔍 Resolución de problemas

### Error de permisos al generar ejecutable

- Ejecute el terminal como administrador
- O use `npm run dist-simple` que evita algunos problemas de permisos

### La aplicación no inicia

- Verifique que todos los archivos en `dist-electron/win-unpacked/` estén presentes
- Asegúrese de que no hay antivirus bloqueando la ejecución

## 🎯 Funcionalidades

- ✅ Generación automática de casos de prueba
- ✅ Exportación a múltiples formatos (TXT, CSV, XML, JSON)
- ✅ Integración con Azure DevOps
- ✅ Interfaz oscura por defecto
- ✅ Aplicación de escritorio portable
