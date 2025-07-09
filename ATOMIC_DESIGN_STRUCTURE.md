# Estructura de Componentes - Atomic Design

## Átomos (Atoms)

- **Button** - Botón reutilizable
- **Input** - Campo de entrada
- **TextArea** - Área de texto
- **Header** - Cabecera con título y botón dark mode

## Moléculas (Molecules)

- **CriteriaList** - Lista de criterios de aceptación
- **TestCaseCard** - Tarjeta individual de caso de prueba
- **ExportActions** - Acciones de exportación y copia

## Organismos (Organisms)

- **UserStoryForm** - Formulario completo de historia de usuario
- **TestCasesList** - Lista completa de casos de prueba generados

## Templates

- **MainTemplate** - Plantilla principal que organiza toda la aplicación

## Modales

- **AzureConfigModal** - Modal de configuración de Azure DevOps

## Beneficios de esta estructura:

1. **Reutilización**: Componentes atómicos pueden ser reutilizados
2. **Mantenibilidad**: Código organizado y fácil de mantener
3. **Escalabilidad**: Fácil agregar nuevos componentes
4. **Testabilidad**: Componentes pequeños y enfocados
5. **Consistencia**: Diseño uniforme en toda la aplicación

## Funcionalidades implementadas:

- ✅ Modo oscuro por defecto con toggle
- ✅ Estructura de componentes siguiendo Atomic Design
- ✅ Estilos limpios y organizados
- ✅ Responsividad mejorada
- ✅ Transiciones suaves entre modos
- ✅ Código limpio sin duplicaciones
