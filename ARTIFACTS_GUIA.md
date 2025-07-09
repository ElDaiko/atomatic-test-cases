# 📦 Cómo Usar los Artifacts de QA Generator

## 🎯 Guía Rápida para Usuarios

### ¿Qué son los Artifacts?

Los **Artifacts** son versiones ejecutables de QA Generator que se generan automáticamente cada vez que se hace un cambio en el código. Esto significa que **siempre tienes acceso a la versión más reciente** sin esperar releases oficiales.

---

## 🚀 Método 1: Acceso Directo (Recomendado)

### 📱 Desde tu Navegador

1. **Ve a GitHub Actions**

   ```
   https://github.com/ElDaiko/atomatic-test-cases/actions/workflows/build.yml
   ```

2. **Busca el último build exitoso** (marcado con ✅)

3. **Haz clic en el build**

4. **Scroll hacia abajo** hasta la sección "Artifacts"

5. **Descarga tu plataforma**:
   - `Windows-qa-automatization` (Windows)
   - `macOS-qa-automatization` (macOS)
   - `Linux-qa-automatization` (Linux)

---

## 🖥️ Método 2: Enlaces Directos

### Windows 🖥️

```
https://github.com/ElDaiko/atomatic-test-cases/actions/workflows/build.yml?query=branch%3Amain+is%3Asuccess
```

### macOS 🍎

```
https://github.com/ElDaiko/atomatic-test-cases/actions/workflows/build.yml?query=branch%3Amain+is%3Asuccess
```

### Linux 🐧

```
https://github.com/ElDaiko/atomatic-test-cases/actions/workflows/build.yml?query=branch%3Amain+is%3Asuccess
```

---

## 📥 Instalación por Plataforma

### Windows 🖥️

1. **Descarga** el artifact `Windows-qa-automatization`
2. **Extrae** en una carpeta de tu elección
3. **Ejecuta** `Iniciar_QA_Generator.bat`
4. **¡Listo!** La aplicación se abrirá automáticamente

**Contenido del artifact:**

```
Windows-qa-automatization/
├── QA Generator-1.0.0.exe
├── Iniciar_QA_Generator.bat
├── GUIA_USUARIO.md
└── VERSION.txt
```

### macOS 🍎

1. **Descarga** el artifact `macOS-qa-automatization`
2. **Extrae** haciendo doble clic
3. **Ejecuta** el archivo `.dmg`
4. **Si aparece el mensaje "Apple no pudo verificar que el contenido no sea malicioso"**:
   - Haz clic en **"Cancelar"** (no "Mover a la Papelera")
   - Ve a **Preferencias del Sistema** → **Seguridad y Privacidad**
   - En la pestaña **"General"**, verás un mensaje sobre la aplicación bloqueada
   - Haz clic en **"Abrir de todos modos"**
   - Confirma haciendo clic en **"Abrir"**
5. **Arrastra** la aplicación a la carpeta Applications
6. **Ejecuta** desde Applications

**Contenido del artifact:**

```
macOS-qa-automatization/
├── QA Generator-1.0.0.dmg
├── GUIA_USUARIO.md
└── VERSION.txt
```

**⚠️ Nota de Seguridad para macOS:**
- Este mensaje es normal para aplicaciones no firmadas con certificado de desarrollador
- La aplicación es segura, pero macOS no puede verificarlo automáticamente
- Solo acepta ejecutar aplicaciones de fuentes confiables

### Linux 🐧

1. **Descarga** el artifact `Linux-qa-automatization`
2. **Extrae** con: `tar -xzf Linux-qa-automatization.tar.gz` (si viene comprimido)
3. **Haz ejecutable** el AppImage: `chmod +x "QA Generator-1.0.0.AppImage"`
4. **Ejecuta** el archivo `.AppImage`

**Contenido del artifact:**

```
Linux-qa-automatization/
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

### 🍎 **Problemas Específicos de macOS**

#### "Apple no pudo verificar que el contenido no sea malicioso"

**Causa**: La aplicación no está firmada con un certificado de desarrollador de Apple

**Solución Paso a Paso**:

1. **NO hagas clic en "Mover a la Papelera"**
2. Haz clic en **"Cancelar"**
3. Ve a **Preferencias del Sistema** (o **Configuración del Sistema** en macOS 13+)
4. Selecciona **"Seguridad y Privacidad"**
5. En la pestaña **"General"**, verás un mensaje como:
   ```
   "QA Generator" fue bloqueado porque no proviene de un desarrollador identificado
   ```
6. Haz clic en **"Abrir de todos modos"**
7. Confirma haciendo clic en **"Abrir"** en el diálogo de confirmación

#### "La aplicación está dañada y no se puede abrir"

**Causa**: Atributos de cuarentena de macOS

**Solución**:
```bash
# Remover atributos de cuarentena
xattr -d com.apple.quarantine "/path/to/QA Generator.app"

# O para todo el directorio
xattr -dr com.apple.quarantine "/path/to/QA Generator.app"
```

#### "No se puede abrir porque el desarrollador no se puede verificar"

**Solución Alternativa**:
1. **Clic derecho** en la aplicación
2. Selecciona **"Abrir"**
3. Confirma en el diálogo que aparece

**⚠️ Importante**: Solo ejecuta aplicaciones de fuentes confiables. Los artifacts de este repositorio son seguros, pero macOS no puede verificarlo automáticamente.

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

- [🚀 Últimos Builds](https://github.com/ElDaiko/atomatic-test-cases/actions/workflows/build.yml)
- [📖 Guía de Usuario](https://github.com/ElDaiko/atomatic-test-cases/blob/main/GUIA_USUARIO.md)
- [🔧 Documentación Técnica](https://github.com/ElDaiko/atomatic-test-cases/blob/main/DOCUMENTACION_TECNICA.md)
- [🐛 Reportar Issues](https://github.com/ElDaiko/atomatic-test-cases/issues)
- [📝 Releases Oficiales](https://github.com/ElDaiko/atomatic-test-cases/releases)

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
Crea un [issue](https://github.com/ElDaiko/atomatic-test-cases/issues) o consulta la [documentación](https://github.com/ElDaiko/atomatic-test-cases/blob/main/DOCUMENTACION_TECNICA.md).

---

_Última actualización: Julio 2025_
