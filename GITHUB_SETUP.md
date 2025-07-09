# 🚀 Guía rápida para subir a GitHub y activar ejecutables automáticos

## 📋 **Pasos para configurar GitHub Actions:**

### **1. Crear repositorio en GitHub:**
1. Ve a [github.com](https://github.com) y haz login
2. Clic en "New repository" (botón verde)
3. Nombre: `qa-aut` (o el que prefieras)
4. Descripción: "Generador de Casos de Prueba QA"
5. Privacidad: **Private** (recomendado para trabajo)
6. ❌ **NO** marcar "Initialize with README"
7. Clic en "Create repository"

### **2. Conectar repositorio local:**
```bash
# Agregar origen remoto
git remote add origin https://github.com/TU-USUARIO/qa-aut.git

# Subir código
git push -u origin main
```

### **3. Resultado automático:**
Una vez que hagas `git push`, GitHub Actions **automáticamente**:
- ✅ Detectará el archivo `.github/workflows/build.yml`
- ✅ Ejecutará builds en 3 sistemas operativos
- ✅ Generará ejecutables para Windows, macOS y Linux

### **4. Descargar ejecutables:**
1. Ve a tu repositorio en GitHub
2. Pestaña **"Actions"**
3. Clic en el build más reciente
4. Bajar en "Artifacts":
   - 🪟 `windows-executable.zip`
   - 🍎 `macos-executable.zip`
   - 🐧 `linux-executable.zip`

## 🔧 **Comandos completos:**

```bash
# 1. Verificar que todo esté commiteado
git status

# 2. Crear repositorio en GitHub (paso manual)
# Ir a github.com → New repository

# 3. Conectar y subir
git remote add origin https://github.com/TU-USUARIO/qa-aut.git
git push -u origin main

# 4. Ver resultado
# Ir a github.com/TU-USUARIO/qa-aut/actions
```

## 🎯 **Ventajas de GitHub Actions:**

- 🆓 **Gratis** para repositorios privados (2000 minutos/mes)
- 🔄 **Automático** en cada push
- 🖥️ **Multiplataforma** sin necesidad de Mac física
- 📦 **Profesional** con artifacts organizados
- 🔐 **Seguro** con builds aislados

## 📋 **Archivos generados:**

Los siguientes archivos se crearán automáticamente:
- `Generador de Casos de Prueba QA-1.0-portable.exe` (Windows)
- `Generador de Casos de Prueba QA-1.0-mac.dmg` (macOS)
- `Generador de Casos de Prueba QA-1.0-linux.AppImage` (Linux)

## 🚀 **Próximos pasos:**

1. **Crear repositorio** en GitHub
2. **Ejecutar comandos** arriba
3. **Esperar ~5-10 minutos** para que se complete el build
4. **Descargar ejecutables** desde Actions
5. **Distribuir** a tu equipo de QA

¿Tienes alguna pregunta sobre el proceso?
