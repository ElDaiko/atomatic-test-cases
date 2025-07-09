# 🚀 QA Generator - Guía de Usuario

## ⚡ Inicio Rápido

1. **Descomprimir** el archivo ZIP
2. **Doble clic** en `Iniciar_QA_Generator.bat`
3. **¡Listo!** La aplicación se abre automáticamente

## 📁 Contenido

- `Iniciar_QA_Generator.bat` - Ejecutar aplicación
- `QA Generator.exe` - Aplicación principal
- `GUIA_USUARIO.md` - Esta guía

## 💡 Cómo Usar

### 1. Crear Historia de Usuario

- Ingresa la descripción de tu historia de usuario
- Ejemplo: "Como usuario quiero poder hacer login"

### 2. Agregar Criterios de Aceptación

- Cada línea es un criterio
- Ejemplo:
  ```
  El usuario debe poder ingresar email y contraseña
  El sistema debe validar las credenciales
  El usuario debe ser redirigido al dashboard
  ```

### 3. Generar Casos de Prueba

- Clic en "Generar Casos de Prueba"
- Se crearán automáticamente en formato Gherkin

### 4. Exportar Resultados

- **TXT**: Archivo de texto plano
- **CSV**: Para Excel
- **XML**: Formato estructurado
- **JSON**: Para APIs
- **Azure DevOps**: Integración directa

## 🔧 Configuración Azure DevOps

Para usar la integración:

1. Clic en "Configurar Azure DevOps"
2. Ingresa:

   - **Organización**: tu-organizacion
   - **Proyecto**: tu-proyecto
   - **Token**: Personal Access Token

3. Clic en "Exportar a Azure DevOps"

## ❓ Soporte

Para dudas o problemas, contacta al equipo de desarrollo.

---

_QA Generator v1.0 - Optimizado para máximo rendimiento_

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
