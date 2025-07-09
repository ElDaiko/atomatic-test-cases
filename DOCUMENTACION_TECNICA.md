# 📋 QA Generator - Documentación Técnica Completa

## 🎯 Descripción del Proyecto

**QA Generator** es una aplicación de escritorio desarrollada con **Electron + React + TypeScript** que permite generar automáticamente casos de prueba a partir de historias de usuario y criterios de aceptación. La aplicación utiliza algoritmos de procesamiento de texto para crear casos de prueba en formato Gherkin y permite exportar los resultados en múltiples formatos.

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Desktop**: Electron 37
- **Build Tool**: Vite 7
- **UI Components**: Componentes React personalizados
- **Styling**: CSS modules
- **Testing**: Formato Gherkin
- **Build**: Electron Builder

### Estructura de Archivos

```
qa-aut/
├── 📁 src/                          # Código fuente React
│   ├── 📁 components/               # Componentes UI
│   │   ├── 📁 atoms/               # Componentes básicos
│   │   ├── 📁 molecules/           # Componentes compuestos
│   │   ├── 📁 organisms/           # Componentes complejos
│   │   └── 📁 templates/           # Plantillas de página
│   ├── 📁 types/                   # Definiciones TypeScript
│   ├── 📁 utils/                   # Utilidades y lógica de negocio
│   └── 📁 assets/                  # Recursos estáticos
├── 📁 public/                      # Archivos públicos
├── 📁 dist/                        # Build de React (generado)
├── 📁 dist-electron/               # Build de Electron (generado)
├── 📄 main.js                      # Proceso principal de Electron
├── 📄 package.json                 # Configuración del proyecto
├── 📄 vite.config.ts              # Configuración de Vite
├── 📄 electron-builder.config.js   # Configuración de empaquetado
└── 📄 *.bat                        # Scripts de Windows
```

## 🔧 Funcionalidades Principales

### 1. Generación de Casos de Prueba

- **Input**: Historia de usuario + criterios de aceptación
- **Procesamiento**: Algoritmos de NLP básico
- **Output**: Casos de prueba en formato Gherkin

### 2. Exportación Multi-formato

- **TXT**: Texto plano
- **CSV**: Compatible con Excel
- **XML**: Formato estructurado
- **JSON**: Para APIs y desarrollo
- **Azure DevOps**: Integración directa con work items

### 3. Integración Azure DevOps

- Configuración de organización y proyecto
- Autenticación con Personal Access Token
- Creación automática de work items

## 🏭 Proceso de Build y Deployment

### Scripts Disponibles

```bash
# Desarrollo
npm run dev                # Servidor de desarrollo Vite
npm run electron-dev       # Desarrollo con Electron

# Producción
npm run build              # Build de React
npm run electron-build     # Build completo con Electron
npm run dist               # Genera ejecutable optimizado
npm run dist-win           # Build específico para Windows
```

### Configuración de Build

El archivo `package.json` contiene la configuración de **electron-builder**:

```json
{
  "build": {
    "appId": "com.qa-aut.test-generator",
    "productName": "QA Generator",
    "directories": {
      "output": "dist-electron"
    },
    "win": {
      "target": "portable",
      "artifactName": "${productName}-${version}.${ext}"
    },
    "compression": "maximum"
  }
}
```

## 📦 Git Artifacts: Concepto y Implementación

### ¿Qué son los Git Artifacts?

Los **Git Artifacts** son archivos o conjuntos de archivos que se generan durante el proceso de Continuous Integration/Continuous Deployment (CI/CD). Estos archivos son el resultado de operaciones de build, compilación, testing, o empaquetado, y se almacenan temporalmente en la plataforma de control de versiones para su posterior descarga o distribución.

### Características de los Artifacts:

- **Temporales**: Se almacenan por un tiempo limitado (configurable)
- **Versionados**: Cada build genera artifacts únicos
- **Accesibles**: Disponibles para descarga directa
- **Rastreables**: Vinculados a commits específicos

### Implementación en el Proyecto QA Generator

Para implementar artifacts en tu proyecto, necesitas crear un workflow de GitHub Actions:

```yaml
# .github/workflows/build-and-release.yml
name: Build and Release QA Generator

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: windows-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build

      - name: Build Electron app
        run: npm run dist

      - name: Create release package
        run: |
          mkdir QA_Generator_Release
          copy "dist-electron\\QA Generator-1.0.0.exe" "QA_Generator_Release\\"
          copy "GUIA_USUARIO.md" "QA_Generator_Release\\"
          copy "Iniciar_QA_Generator.bat" "QA_Generator_Release\\"
          echo "QA Generator v1.0.0 - Build %DATE%" > QA_Generator_Release\\LEEME.txt

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: QA-Generator-${{ github.sha }}
          path: QA_Generator_Release/
          retention-days: 30
```

### Flujo de Artifacts:

1. **Trigger**: Push o PR a ramas principales
2. **Build**: Compilación automática del proyecto
3. **Package**: Creación del ejecutable optimizado
4. **Upload**: Subida como artifact
5. **Access**: Link de descarga disponible en GitHub

### Ventajas de usar Artifacts:

- ✅ **Automatización**: Build automático en cada push
- ✅ **Consistencia**: Mismo entorno de build siempre
- ✅ **Trazabilidad**: Cada build vinculado a un commit
- ✅ **Distribución**: Enlaces directos de descarga
- ✅ **Testing**: Posibilidad de probar builds automáticamente

## 🚀 Ejecutables y Distribución

### Generación de Ejecutables

El proyecto utiliza **Electron Builder** para generar ejecutables:

```bash
# Generar ejecutable optimizado
npm run dist

# Output:
# dist-electron/QA Generator-1.0.0.exe (Windows)
# dist-electron/QA Generator-1.0.0.dmg (macOS)
# dist-electron/QA Generator-1.0.0.AppImage (Linux)
```

### Optimizaciones Implementadas:

1. **Compresión máxima**: `compression: "maximum"`
2. **Portable**: No requiere instalación
3. **Ejecutable único**: Todo incluido en un archivo
4. **Recursos mínimos**: Solo locales necesarios
5. **Sin firma**: Para distribución interna

### Scripts de Distribución

```batch
# Iniciar_QA_Generator.bat
@echo off
title QA Generator - Iniciando...
echo 🚀 Iniciando QA Generator...
echo.
"QA Generator-1.0.0.exe"
if errorlevel 1 (
    echo ❌ Error al iniciar la aplicación
    pause
)
```

## 🧪 Lógica de Generación de Test Cases

### Algoritmo Principal

La generación de casos de prueba se basa en el análisis de texto de las historias de usuario:

```typescript
// src/utils/testCaseGenerator.ts
export function generateTestCases(userStory: UserStory): TestCase[] {
  const testCases: TestCase[] = [];

  // 1. Casos basados en criterios de aceptación
  userStory.acceptanceCriteria.forEach((criteria, index) => {
    const testCase = generateTestCaseFromCriteria(
      userStory.description,
      criteria,
      index + 1
    );
    testCases.push(testCase);
  });

  // 2. Casos de prueba comunes
  const commonTestCases = generateCommonTestCases(userStory);
  testCases.push(...commonTestCases);

  return testCases;
}
```

### Patrones de Detección

El algoritmo detecta patrones comunes en los criterios:

```typescript
function extractScenarioFromCriteria(criteria: string): string {
  // Patrones de validación
  if (criteria.toLowerCase().includes("validar")) {
    return "Validación de datos";
  }

  // Patrones de autenticación
  if (
    criteria.toLowerCase().includes("login") ||
    criteria.toLowerCase().includes("autenticar")
  ) {
    return "Proceso de autenticación";
  }

  // Patrones de navegación
  if (
    criteria.toLowerCase().includes("redirect") ||
    criteria.toLowerCase().includes("navegar")
  ) {
    return "Navegación del usuario";
  }

  return "Funcionalidad general";
}
```

### Generación de Gherkin

```typescript
function generateGherkinSteps(criteria: string, description: string): string[] {
  const steps: string[] = [];

  // Given - Contexto
  steps.push(
    `Given que el usuario está en la página de ${extractContext(description)}`
  );

  // When - Acción
  steps.push(`When el usuario ${extractAction(criteria)}`);

  // Then - Resultado
  steps.push(`Then el sistema ${extractExpectedResult(criteria)}`);

  return steps;
}
```

## 📊 Tipos de Datos y Interfaces

```typescript
// src/types/types.ts
export interface UserStory {
  description: string;
  acceptanceCriteria: string[];
}

export interface TestCase {
  id: string; // TC_001, TC_002, etc.
  description: string; // Descripción del caso
  scenario: string; // Escenario a probar
  gherkinSteps: string[]; // Pasos en formato Gherkin
  expectedResult: string; // Resultado esperado
}

export interface GherkinStep {
  type: "Given" | "When" | "Then" | "And";
  text: string;
}
```

## 🔌 Integración con Azure DevOps

### Configuración

```typescript
// src/utils/azureIntegration.ts
interface AzureConfig {
  organization: string; // tu-organizacion
  project: string; // tu-proyecto
  personalAccessToken: string; // PAT token
}

export async function createWorkItem(
  testCase: TestCase,
  config: AzureConfig
): Promise<void> {
  const workItem = {
    title: testCase.description,
    description: testCase.gherkinSteps.join("\\n"),
    workItemType: "Test Case",
    state: "Design",
  };

  // Llamada a Azure DevOps REST API
  const response = await fetch(
    `https://dev.azure.com/${config.organization}/${config.project}/_apis/wit/workitems/$Test Case?api-version=6.0`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(":" + config.personalAccessToken)}`,
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify(workItem),
    }
  );
}
```

## 🛠️ Comandos de Desarrollo

### Instalación y Setup

```bash
# Clonar el repositorio
git clone <repository-url>
cd qa-aut

# Instalar dependencias
npm install

# Desarrollo
npm run electron-dev

# Build de producción
npm run dist
```

### Estructura de Desarrollo

```bash
# Limpiar cache
npm run clean

# Linting
npm run lint

# Preview de build
npm run preview

# Build específico por plataforma
npm run dist-win    # Windows
npm run dist-mac    # macOS
npm run dist-linux  # Linux
```

## 📈 Optimizaciones Implementadas

### 1. Performance

- **Vite**: Build tool rápido
- **Lazy Loading**: Componentes cargados bajo demanda
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Código comprimido en producción

### 2. Bundle Size

- **Electron Builder**: Compresión máxima
- **Recursos selectivos**: Solo archivos necesarios
- **Portable**: Sin instalador adicional

### 3. User Experience

- **Splash Screen**: Carga inicial optimizada
- **Responsive**: Interfaz adaptable
- **Error Handling**: Manejo robusto de errores

## 🚦 Troubleshooting

### Problemas Comunes

1. **Build falla**:

   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Electron no inicia**:

   - Verificar Node.js version (18+)
   - Limpiar cache: `npm run clean`
   - Reinstalar dependencias

3. **Artifacts no se generan**:
   - Verificar GitHub Actions habilitado
   - Revisar permisos del repositorio
   - Comprobar syntax del workflow

### Logs y Debugging

```bash
# Habilitar logs detallados
DEBUG=electron-builder npm run dist

# Desarrollo con DevTools
npm run electron-dev
```

## 📚 Referencias y Recursos

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Electron Builder](https://www.electron.build)
- [GitHub Actions](https://docs.github.com/actions)
- [Azure DevOps REST API](https://docs.microsoft.com/en-us/rest/api/azure/devops)

---

**Versión**: 1.0.0  
**Fecha**: Julio 2025  
**Autor**: Miguel Roldan  
**Licencia**: Uso Interno
