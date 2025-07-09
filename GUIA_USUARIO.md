# 🚀 Generador de Casos de Prueba QA

## 📋 Instrucciones para el equipo de QA

### ⚡ Inicio rápido

1. **Descomprimir** este archivo en cualquier carpeta
2. **Doble clic** en `🚀 Iniciar_QA_Generator.bat`
3. **¡Listo!** La aplicación se abrirá automáticamente

### 📁 Contenido del paquete

- `🚀 Iniciar_QA_Generator.bat` - Ejecutar para iniciar la aplicación
- `dist-electron/` - Carpeta con el ejecutable y archivos necesarios
- `GUIA_USUARIO.md` - Este archivo de instrucciones

### 💡 Funcionalidades principales

#### ✅ Generación de casos de prueba

1. **Ingresa una historia de usuario** en el campo de texto
2. **Selecciona los criterios** que deseas incluir
3. **Haz clic en "Generar Casos de Prueba"**
4. Los casos se generarán automáticamente

#### 📄 Exportación de resultados

- **TXT** - Archivo de texto plano
- **CSV** - Para Excel o Google Sheets
- **XML** - Formato estructurado
- **JSON** - Para desarrolladores
- **Azure DevOps** - Integración directa (requiere configuración)

#### 🔧 Configuración de Azure DevOps (opcional)

1. Haz clic en **"Configurar Azure DevOps"**
2. Ingresa:
   - **Organización**: Tu organización de Azure DevOps
   - **Proyecto**: Nombre del proyecto
   - **Personal Access Token**: Token de acceso personal
3. Guarda la configuración

### 🎯 Ejemplo de uso

**Historia de usuario:**

> Como usuario, quiero poder iniciar sesión en el sistema para acceder a mi cuenta personal

**Criterios sugeridos:**

- Validación de campos obligatorios
- Manejo de errores
- Casos de éxito
- Seguridad
- Accesibilidad

**Resultado:** La aplicación generará casos de prueba específicos para cada criterio seleccionado.

### 🔍 Resolución de problemas

#### ❌ La aplicación no inicia

- Verifica que todos los archivos estén en la carpeta
- Ejecuta como administrador si es necesario
- Desactiva temporalmente el antivirus

#### ❌ Problemas con Azure DevOps

- Verifica tu conexión a internet
- Confirma que el Personal Access Token sea válido
- Asegúrate de que el token tenga permisos de "Work Items (Read & Write)"

#### ❌ No se generan casos de prueba

- Verifica que hayas ingresado una historia de usuario
- Selecciona al menos un criterio
- Revisa que la historia esté bien redactada

### 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo con:

- Descripción del problema
- Pasos para reproducir el error
- Capturas de pantalla si es necesario

### 🔄 Versión

- **Versión actual**: 1.0.0
- **Última actualización**: Julio 2025
- **Compatibilidad**: Windows 10/11

---

_Aplicación desarrollada para optimizar el proceso de generación de casos de prueba en el equipo de QA_
