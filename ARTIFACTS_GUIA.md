# 📦 Cómo Usar los Artifacts de QA Generator

## 🎯 Guía Rápida para Usuarios

### ¿Qué son los Artifacts?

Los **Artifacts** son versiones ejecutables de QA Generator que se generan automáticamente cada vez que se hace un cambio en el código. Esto significa que **siempre tienes acceso a la versión más reciente** sin esperar releases oficiales.

---

## 🚀 Método 1: Acceso Directo (Recomendado)

### 📱 Desde tu Navegador

1. **Ve a GitHub Actions**

   ```
   https://github.com/tu-usuario/qa-generator/actions/workflows/build.yml
   ```

2. **Busca el último build exitoso** (marcado con ✅)

3. **Haz clic en el build**

4. **Scroll hacia abajo** hasta la sección "Artifacts"

5. **Descarga tu plataforma**:
   - `QA-Generator-Windows-build-XXX` (Windows)
   - `QA-Generator-macOS-build-XXX` (macOS)
   - `QA-Generator-Linux-build-XXX` (Linux)

---

## 🖥️ Método 2: Enlaces Directos

### Windows 🖥️

```
https://github.com/tu-usuario/qa-generator/actions/workflows/build.yml?query=branch%3Amain+is%3Asuccess
```

### macOS 🍎

```
https://github.com/tu-usuario/qa-generator/actions/workflows/build.yml?query=branch%3Amain+is%3Asuccess
```

### Linux 🐧

```
https://github.com/tu-usuario/qa-generator/actions/workflows/build.yml?query=branch%3Amain+is%3Asuccess
```

---

## 📥 Instalación por Plataforma

### Windows 🖥️

1. **Descarga** el archivo `QA-Generator-Windows-build-XXX.zip`
2. **Descomprime** en una carpeta de tu elección
3. **Ejecuta** `Iniciar_QA_Generator.bat`
4. **¡Listo!** La aplicación se abrirá automáticamente

**Contenido del ZIP:**

```
QA_Generator_Windows/
├── QA Generator-1.0.0.exe
├── Iniciar_QA_Generator.bat
├── GUIA_USUARIO.md
└── VERSION.txt
```

### macOS 🍎

1. **Descarga** el archivo `QA-Generator-macOS-build-XXX.tar.gz`
2. **Descomprime** haciendo doble clic
3. **Ejecuta** el archivo `.dmg`
4. **Arrastra** la aplicación a la carpeta Applications
5. **Ejecuta** desde Applications

**Contenido del TAR.GZ:**

```
QA_Generator_macOS/
├── QA Generator-1.0.0.dmg
├── GUIA_USUARIO.md
└── VERSION.txt
```

### Linux 🐧

1. **Descarga** el archivo `QA-Generator-Linux-build-XXX.tar.gz`
2. **Descomprime** con: `tar -xzf QA-Generator-Linux-build-XXX.tar.gz`
3. **Ejecuta** el archivo `.AppImage`
4. **Opcional**: Hazlo ejecutable con `chmod +x QA\ Generator-1.0.0.AppImage`

**Contenido del TAR.GZ:**

```
QA_Generator_Linux/
├── QA Generator-1.0.0.AppImage
├── GUIA_USUARIO.md
└── VERSION.txt
```

---

## 🔍 Información de Versión

Cada artifact incluye un archivo `VERSION.txt` con:

```
🚀 QA Generator v1.0.0 - Windows
📅 Build Date: 2025-07-09 10:30:15
📝 Commit: abc123def456
🌿 Branch: main
🔢 Build Number: 42
💻 Platform: Windows
```

---

## 🕐 Cuándo Usar Artifacts

### ✅ Usar Artifacts cuando:

- **Necesitas la última versión** con los cambios más recientes
- **Quieres probar un fix** específico
- **Desarrollas** y necesitas probar cambios
- **Haces QA** de features nuevas

### ❌ Usar Releases cuando:

- **Necesitas estabilidad** para producción
- **Quieres una versión oficialmente soportada**
- **Distribución** a usuarios finales
- **Documentación** completa está disponible

---

## 🔄 Frecuencia de Artifacts

| Trigger            | Descripción                       | Tiempo        |
| ------------------ | --------------------------------- | ------------- |
| **Push a main**    | Cada commit genera nuevo artifact | ~5-10 minutos |
| **Push a develop** | Builds de desarrollo              | ~5-10 minutos |
| **Pull Request**   | Testing de cambios propuestos     | ~5-10 minutos |
| **Manual**         | Trigger manual desde Actions      | ~5-10 minutos |

---

## 🚨 Solución de Problemas

### ❌ "No hay artifacts disponibles"

- **Causa**: El último build falló
- **Solución**: Revisa el build anterior exitoso

### ❌ "Artifact expirado"

- **Causa**: Los artifacts se eliminan después de 30 días
- **Solución**: Ejecuta un nuevo build manualmente

### ❌ "No puedo descargar"

- **Causa**: Necesitas permisos del repositorio
- **Solución**: Solicita acceso al repositorio

### ❌ "El ejecutable no funciona"

- **Causa**: Archivo corrupto o plataforma incorrecta
- **Solución**: Descarga nuevamente el artifact correcto

---

## 📊 Comparación: Artifacts vs Releases

| Aspecto           | Artifacts          | Releases   |
| ----------------- | ------------------ | ---------- |
| **Frecuencia**    | Cada push          | Ocasional  |
| **Estabilidad**   | Variable           | Alta       |
| **Acceso**        | Requiere GitHub    | Público    |
| **Documentación** | Básica             | Completa   |
| **Soporte**       | Limitado           | Completo   |
| **Uso**           | Desarrollo/Testing | Producción |

---

## 🔗 Enlaces Útiles

- [🚀 Últimos Builds](https://github.com/tu-usuario/qa-generator/actions/workflows/build.yml)
- [📖 Guía de Usuario](https://github.com/tu-usuario/qa-generator/blob/main/GUIA_USUARIO.md)
- [🔧 Documentación Técnica](https://github.com/tu-usuario/qa-generator/blob/main/DOCUMENTACION_TECNICA.md)
- [🐛 Reportar Issues](https://github.com/tu-usuario/qa-generator/issues)
- [📝 Releases Oficiales](https://github.com/tu-usuario/qa-generator/releases)

---

## 🎯 Consejos Pro

### Para Desarrolladores:

- Usa artifacts para probar tus cambios antes de hacer merge
- Comparte enlaces de artifacts con el equipo para testing
- Revisa el `VERSION.txt` para confirmar el commit

### Para QA:

- Descarga artifacts después de cada fix para validar
- Mantén un historial de qué artifacts has probado
- Usa artifacts para regression testing

### Para Product Owners:

- Usa artifacts para demos tempranas de features
- Comparte links de artifacts con stakeholders
- Valida requisitos antes de releases oficiales

---

**¿Necesitas ayuda?** 🆘  
Crea un [issue](https://github.com/tu-usuario/qa-generator/issues) o consulta la [documentación](https://github.com/tu-usuario/qa-generator/blob/main/DOCUMENTACION_TECNICA.md).

---

_Última actualización: Julio 2025_
