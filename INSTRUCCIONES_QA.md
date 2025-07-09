# 📋 Instrucciones para el QA - Generador de Casos de Prueba

## 📦 **Archivo a descargar:**

- **`QA_Generator_v1.0.zip`** (~124 MB)

## 🚀 **Pasos de instalación:**

### 1. **Descomprimir el archivo**

- Descomprimir `QA_Generator_v1.0.zip` en cualquier carpeta
- Se creará una carpeta `QA_Generator_Portable`

### 2. **Ejecutar la aplicación**

- Dentro de la carpeta `QA_Generator_Portable`
- Hacer **doble clic** en `🚀 Iniciar_QA_Generator.bat`
- La aplicación se abrirá automáticamente

## 📖 **Cómo usar la aplicación:**

### **Generar casos de prueba básicos:**

1. Escribir la historia de usuario en el campo de texto
2. Hacer clic en "Generar Casos de Prueba"
3. Los casos se generarán automáticamente

### **Exportar resultados:**

- **TXT**: Formato texto plano
- **CSV**: Para Excel/Google Sheets
- **XML**: Formato estructurado
- **JSON**: Formato técnico
- **Azure DevOps**: Subir directamente (requiere configuración)

### **Configurar Azure DevOps (opcional):**

1. Clic en "Configurar Azure DevOps"
2. Completar:
   - **Organización**: Nombre de tu organización
   - **Proyecto**: Nombre del proyecto
   - **PAT**: Personal Access Token
3. Guardar configuración

## 🔧 **Requisitos técnicos:**

- **Sistema operativo**: Windows 10/11
- **Espacio en disco**: ~200 MB
- **Permisos**: No requiere permisos de administrador
- **Internet**: Solo para Azure DevOps (opcional)

## 📁 **Estructura del paquete:**

```
QA_Generator_Portable/
├── 🚀 Iniciar_QA_Generator.bat    ← EJECUTAR ESTE ARCHIVO
├── GUIA_USUARIO.md               ← Manual detallado
├── LEEME.txt                     ← Información básica
└── dist-electron/                ← Archivos de la aplicación
    └── ...
```

## 🛠️ **Pruebas a realizar:**

### **Pruebas funcionales:**

- [ ] La aplicación se inicia correctamente
- [ ] Se pueden introducir historias de usuario
- [ ] Los casos de prueba se generan automáticamente
- [ ] La exportación funciona en todos los formatos
- [ ] El modo oscuro está activado por defecto
- [ ] Se puede cambiar entre modo claro/oscuro

### **Pruebas de usabilidad:**

- [ ] La interfaz es clara e intuitiva
- [ ] Los botones responden correctamente
- [ ] Los mensajes de error son comprensibles
- [ ] La navegación es fluida

### **Pruebas de exportación:**

- [ ] TXT: Archivo se crea y es legible
- [ ] CSV: Se abre correctamente en Excel
- [ ] XML: Estructura es válida
- [ ] JSON: Formato es correcto

### **Pruebas de Azure DevOps (si se configura):**

- [ ] La configuración se guarda correctamente
- [ ] Los casos se suben a Azure DevOps
- [ ] Los errores de conexión se manejan bien

## 🐛 **Reporte de problemas:**

Incluir en el reporte:

- **Descripción**: Qué pasó y qué se esperaba
- **Pasos**: Cómo reproducir el problema
- **Capturas**: Screenshots si es necesario
- **Sistema**: Versión de Windows
- **Archivos**: Logs si los hay

## 📞 **Contacto:**

- **Desarrollador**: Miguel Roldan
- **Version**: 1.0
- **Fecha**: Julio 2025

---

## 🎯 **Objetivo de las pruebas:**

Verificar que la aplicación funciona correctamente en un entorno de usuario final y que cumple con los requisitos de usabilidad y funcionalidad del equipo de QA.

¡Gracias por probar la aplicación! 🚀
