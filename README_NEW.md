# 🚀 Generador de Casos de Prueba QA

Una aplicación de escritorio para generar casos de prueba automáticamente a partir de historias de usuario.

## ✨ Características

- 🤖 **Generación automática** de casos de prueba
- 📁 **Exportación múltiple**: TXT, CSV, XML, JSON
- 🔗 **Integración Azure DevOps**
- 🌙 **Modo oscuro** por defecto
- 🖥️ **Multiplataforma**: Windows, macOS, Linux
- 📦 **Aplicación portable** - No requiere instalación

## 🛠️ Desarrollo

### Requisitos previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
npm install
```

### Comandos disponibles

#### Desarrollo

```bash
npm run dev              # Servidor de desarrollo (web)
npm run electron-dev     # Desarrollo con Electron
```

#### Construcción

```bash
npm run build           # Construir aplicación web
npm run electron-build  # Construir y ejecutar Electron
```

#### Generación de ejecutables

```bash
npm run dist-win        # Ejecutable Windows (.exe)
npm run dist-mac        # Ejecutable macOS (.dmg)
npm run dist-linux      # Ejecutable Linux (.AppImage)
```

## 📦 Ejecutables multiplataforma

### GitHub Actions (Automático)

Los ejecutables se generan automáticamente para todas las plataformas cuando haces push a `main`:

1. **Windows**: `Generador de Casos de Prueba QA-1.0-portable.exe`
2. **macOS**: `Generador de Casos de Prueba QA-1.0-mac.dmg`
3. **Linux**: `Generador de Casos de Prueba QA-1.0-linux.AppImage`

### Descargar ejecutables

Ve a la pestaña **Actions** en GitHub y descarga los artifacts.

## 🏗️ Arquitectura

El proyecto usa **Atomic Design**:

- `atoms/`: Componentes básicos (Button, Input, Header)
- `molecules/`: Combinaciones de atoms (CriteriaList, TestCaseCard)
- `organisms/`: Componentes complejos (UserStoryForm, TestCasesList)
- `templates/`: Layouts de página (MainTemplate)

## 🔧 Tecnologías

- **Frontend**: React 19 + TypeScript + Vite
- **Desktop**: Electron 37
- **Styling**: CSS Modules
- **Build**: electron-builder
- **CI/CD**: GitHub Actions

## 📱 Uso

### Interfaz web

1. `npm run dev`
2. Abrir http://localhost:5173

### Aplicación de escritorio

1. `npm run electron-dev`
2. Se abre ventana nativa

### Generar casos de prueba

1. Introducir historia de usuario
2. Hacer clic en "Generar Casos de Prueba"
3. Exportar en formato deseado

## 🔗 Integración Azure DevOps

Para conectar con Azure DevOps:

1. Clic en "Configurar Azure DevOps"
2. Completar:
   - Organización
   - Proyecto
   - Personal Access Token (PAT)
3. Guardar configuración

## 🚀 Distribución

### Paquetes optimizados

- `npm run build` → Crear paquete optimizado
- Scripts automáticos en `/scripts/`

### Tamaños aproximados

- **Windows**: ~200MB
- **macOS**: ~200MB
- **Linux**: ~200MB

## 📄 Licencia

Este proyecto es privado y pertenece a Miguel Roldan.

## 👥 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 🆘 Soporte

Para problemas o preguntas, contactar al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Desarrollador**: Miguel Roldan  
**Fecha**: Julio 2025
