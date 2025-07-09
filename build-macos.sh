#!/bin/bash

# Script para generar ejecutable macOS
# Debe ejecutarse en una Mac con Xcode instalado

echo "==========================================="
echo "  GENERADOR EJECUTABLE MACOS"
echo "==========================================="
echo ""

# Verificar que estamos en macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ ERROR: Este script debe ejecutarse en macOS"
    echo "   Electron-builder requiere macOS para generar .dmg"
    echo ""
    echo "🔧 ALTERNATIVAS:"
    echo "   1. Ejecutar en una Mac real"
    echo "   2. Usar macOS en máquina virtual"
    echo "   3. Usar GitHub Actions (CI/CD)"
    echo ""
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js no está instalado"
    echo "   Instalar desde: https://nodejs.org"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ ERROR: npm no está instalado"
    exit 1
fi

echo "✅ Verificaciones pasadas"
echo "📦 Instalando dependencias..."

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "🏗️  Construyendo aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ ERROR: Falló el build de la aplicación"
    exit 1
fi

echo "📱 Generando ejecutable macOS..."
npx electron-builder --mac --x64 --arm64

if [ $? -eq 0 ]; then
    echo ""
    echo "==========================================="
    echo "  ✅ EJECUTABLE MACOS GENERADO"
    echo "==========================================="
    echo ""
    echo "📁 Ubicación: dist-electron/"
    echo "📦 Archivos generados:"
    ls -la dist-electron/*.dmg 2>/dev/null || echo "   - Generador de Casos de Prueba QA-1.0-mac.dmg"
    echo ""
    echo "🎯 Arquitecturas:"
    echo "   - Intel (x64)"
    echo "   - Apple Silicon (arm64)"
    echo ""
    echo "📤 Listo para distribuir en macOS!"
else
    echo "❌ ERROR: Falló la generación del ejecutable"
    echo "   Revisar los logs arriba para más detalles"
    exit 1
fi
