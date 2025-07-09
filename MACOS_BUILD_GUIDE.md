# 🍎 Guía para Generar Ejecutable macOS

## 📋 **Requisitos previos**

### **Para generar ejecutable macOS necesitas:**

- 🍎 **Una Mac** (física o virtual)
- 🛠️ **Xcode** instalado
- 📦 **Node.js 18+**
- 🔧 **npm** o **yarn**

### **⚠️ Limitación importante:**

**Electron-builder solo puede generar ejecutables macOS desde macOS**. No es posible hacerlo desde Windows.

## 🚀 **Método 1: Ejecutar en Mac**

### **1. Clonar el proyecto en Mac:**

```bash
git clone <tu-repositorio>
cd qa-aut
npm install
```

### **2. Generar ejecutable macOS:**

```bash
# Opción A: Script automatizado
chmod +x build-macos.sh
./build-macos.sh

# Opción B: Comando directo
npm run dist-mac
```

### **3. Resultado:**

- 📁 **Ubicación**: `dist-electron/`
- 📦 **Archivo**: `Generador de Casos de Prueba QA-1.0-mac.dmg`
- 🎯 **Arquitecturas**: Intel (x64) + Apple Silicon (arm64)

## ☁️ **Método 2: GitHub Actions (Recomendado)**

### **1. Configurar repositorio:**

```bash
# Subir código a GitHub
git add .
git commit -m "Add macOS build support"
git push origin main
```

### **2. Activar GitHub Actions:**

- Ve a tu repositorio en GitHub
- Pestaña **Actions**
- Se ejecutará automáticamente

### **3. Descargar ejecutables:**

- **Windows**: `windows-executable.zip`
- **macOS**: `macos-executable.zip`
- **Linux**: `linux-executable.zip`

## 📦 **Tipos de ejecutables por plataforma**

| Plataforma  | Formato     | Tamaño | Instalación        |
| ----------- | ----------- | ------ | ------------------ |
| **Windows** | `.exe`      | ~200MB | Portable           |
| **macOS**   | `.dmg`      | ~200MB | Arrastar a Apps    |
| **Linux**   | `.AppImage` | ~200MB | Ejecutable directo |

## 🔧 **Configuración actual**

### **Scripts disponibles:**

```json
{
  "dist-win": "npm run build && electron-builder --win",
  "dist-mac": "npm run build && electron-builder --mac",
  "dist-linux": "npm run build && electron-builder --linux"
}
```

### **Configuración electron-builder:**

```json
{
  "mac": {
    "target": ["dmg"],
    "arch": ["x64", "arm64"],
    "category": "public.app-category.developer-tools"
  }
}
```

## 🛠️ **Alternativas si no tienes Mac**

### **1. Usar macOS en VM:**

- **VirtualBox** + macOS (legal con hardware Apple)
- **VMware** + macOS

### **2. Servicios en la nube:**

- **MacStadium** (alquiler de Mac)
- **GitHub Actions** (gratis para repositorios públicos)
- **CircleCI** con macOS

### **3. Amigo/colega con Mac:**

- Enviar código
- Ejecutar `npm run dist-mac`
- Recibir `.dmg`

## 🎯 **Proceso paso a paso en Mac**

### **1. Preparar entorno:**

```bash
# Verificar Node.js
node --version  # Debe ser 18+

# Instalar Xcode Command Line Tools
xcode-select --install
```

### **2. Ejecutar build:**

```bash
# Instalar dependencias
npm install

# Construir aplicación
npm run build

# Generar ejecutable macOS
npm run dist-mac
```

### **3. Verificar resultado:**

```bash
# Ver archivos generados
ls -la dist-electron/

# Debería mostrar:
# Generador de Casos de Prueba QA-1.0-mac.dmg
```

## 🔐 **Firma de código (opcional)**

Para distribución oficial en Mac App Store:

```bash
# Certificado de desarrollador Apple
export CSC_LINK="path/to/certificate.p12"
export CSC_KEY_PASSWORD="certificate-password"

# Build firmado
npm run dist-mac
```

## 🚀 **Recomendación**

**Usa GitHub Actions** - es la forma más fácil y no requiere acceso a Mac física:

1. Subir código a GitHub
2. GitHub Actions genera ejecutables automáticamente
3. Descargar archivos desde la pestaña Actions

¿Quieres que configure GitHub Actions para tu repositorio?
