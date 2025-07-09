import type { UserStory, TestCase } from "../types/types";

export function generateTestCases(userStory: UserStory): TestCase[] {
  const testCases: TestCase[] = [];

  // Generar casos de prueba basados en cada criterio de aceptación
  userStory.acceptanceCriteria.forEach((criteria, index) => {
    const testCase = generateTestCaseFromCriteria(
      userStory.description,
      criteria,
      index + 1
    );
    testCases.push(testCase);
  });

  // Generar casos de prueba adicionales comunes
  const commonTestCases = generateCommonTestCases(userStory);
  testCases.push(...commonTestCases);

  return testCases;
}

function generateTestCaseFromCriteria(
  description: string,
  criteria: string,
  index: number
): TestCase {
  const testCaseId = `TC_${String(index).padStart(3, "0")}`;

  // Extraer información del criterio
  const scenario = extractScenarioFromCriteria(criteria);
  const gherkinSteps = generateGherkinSteps(criteria, description);
  const expectedResult = extractExpectedResult(criteria);

  return {
    id: testCaseId,
    description: `Verificar ${scenario.toLowerCase()}`,
    scenario,
    gherkinSteps,
    expectedResult,
  };
}

function extractScenarioFromCriteria(criteria: string): string {
  // Detectar patrones comunes en criterios de aceptación
  if (
    criteria.toLowerCase().includes("usuario") ||
    criteria.toLowerCase().includes("usuaria")
  ) {
    return "Interacción del usuario con la funcionalidad";
  }
  if (
    criteria.toLowerCase().includes("botón") ||
    criteria.toLowerCase().includes("boton")
  ) {
    return "Funcionalidad de botón";
  }
  if (
    criteria.toLowerCase().includes("nivel") ||
    criteria.toLowerCase().includes("escenario")
  ) {
    return "Navegación entre niveles/escenarios";
  }
  if (
    criteria.toLowerCase().includes("tiempo") ||
    criteria.toLowerCase().includes("barra")
  ) {
    return "Funcionalidad de tiempo";
  }
  if (
    criteria.toLowerCase().includes("selección") ||
    criteria.toLowerCase().includes("seleccion")
  ) {
    return "Proceso de selección";
  }
  if (
    criteria.toLowerCase().includes("audio") ||
    criteria.toLowerCase().includes("sonido")
  ) {
    return "Control de audio";
  }
  if (criteria.toLowerCase().includes("personaje")) {
    return "Visualización del personaje";
  }
  if (
    criteria.toLowerCase().includes("logo") ||
    criteria.toLowerCase().includes("marca")
  ) {
    return "Elementos de marca/logo";
  }

  return "Validación de criterio funcional";
}

function generateGherkinSteps(criteria: string, description: string): string[] {
  const steps: string[] = [];

  // Given - Condición inicial
  steps.push("Dado que el usuario está en la aplicación");

  if (description.toLowerCase().includes("personaje")) {
    steps.push("Y que ha seleccionado un personaje previamente");
  }

  if (criteria.toLowerCase().includes("nivel")) {
    steps.push("Y que se encuentra en la pantalla de niveles");
  }

  // When - Acción del usuario
  if (
    criteria.toLowerCase().includes("botón") ||
    criteria.toLowerCase().includes("boton")
  ) {
    if (criteria.toLowerCase().includes("enviar")) {
      steps.push('Cuando el usuario hace clic en el botón "Enviar"');
    } else if (criteria.toLowerCase().includes("audio")) {
      steps.push("Cuando el usuario hace clic en el icono de audio");
    } else {
      steps.push("Cuando el usuario interactúa con el botón correspondiente");
    }
  } else if (
    criteria.toLowerCase().includes("selección") ||
    criteria.toLowerCase().includes("seleccion")
  ) {
    steps.push("Cuando el usuario realiza las selecciones requeridas");
  } else if (criteria.toLowerCase().includes("tiempo")) {
    steps.push("Cuando transcurre el tiempo establecido");
  } else {
    steps.push("Cuando se ejecuta la funcionalidad correspondiente");
  }

  // Then - Resultado esperado
  if (
    criteria.toLowerCase().includes("activa") &&
    criteria.toLowerCase().includes("botón")
  ) {
    steps.push("Entonces el botón debe estar activado");
  } else if (
    criteria.toLowerCase().includes("muestra") ||
    criteria.toLowerCase().includes("encuentra")
  ) {
    steps.push(
      "Entonces debe mostrarse correctamente el elemento especificado"
    );
  } else if (criteria.toLowerCase().includes("nivel")) {
    steps.push("Entonces debe navegarse al nivel correspondiente");
  } else if (criteria.toLowerCase().includes("modal")) {
    steps.push("Entonces debe abrirse la modal de resultados");
  } else if (criteria.toLowerCase().includes("disminuy")) {
    steps.push("Entonces la barra de tiempo debe disminuir progresivamente");
  } else {
    steps.push("Entonces el sistema debe comportarse según lo especificado");
  }

  // And - Validaciones adicionales
  if (
    criteria.toLowerCase().includes("tres") &&
    criteria.toLowerCase().includes("seleccion")
  ) {
    steps.push(
      "Y debe validarse que se han realizado las tres selecciones requeridas"
    );
  }

  if (
    criteria.toLowerCase().includes("escenario") &&
    criteria.toLowerCase().includes("diferente")
  ) {
    steps.push("Y cada nivel debe mostrar un escenario único");
  }

  return steps;
}

function extractExpectedResult(criteria: string): string {
  if (
    criteria.toLowerCase().includes("activa") &&
    criteria.toLowerCase().includes("botón")
  ) {
    return "El botón se activa correctamente después de completar las condiciones requeridas";
  }
  if (
    criteria.toLowerCase().includes("muestra") &&
    criteria.toLowerCase().includes("personaje")
  ) {
    return "Se visualiza el personaje seleccionado previamente por el usuario";
  }
  if (criteria.toLowerCase().includes("modal")) {
    return "Se abre la modal de resultados correctamente";
  }
  if (
    criteria.toLowerCase().includes("tiempo") &&
    criteria.toLowerCase().includes("disminuy")
  ) {
    return "La barra de tiempo disminuye de forma progresiva y visible";
  }
  if (
    criteria.toLowerCase().includes("nivel") &&
    criteria.toLowerCase().includes("escenario")
  ) {
    return "Cada nivel presenta un escenario visualmente diferenciado";
  }
  if (criteria.toLowerCase().includes("audio")) {
    return "El audio se activa/desactiva según la acción del usuario";
  }
  if (
    criteria.toLowerCase().includes("tres") &&
    criteria.toLowerCase().includes("secciones")
  ) {
    return "El usuario puede seleccionar elementos de las tres secciones disponibles";
  }
  if (
    criteria.toLowerCase().includes("logo") ||
    criteria.toLowerCase().includes("marca")
  ) {
    return "El logo de la marca se muestra correctamente en la posición especificada";
  }
  if (
    criteria.toLowerCase().includes("iconos") &&
    criteria.toLowerCase().includes("niveles")
  ) {
    return "Los iconos de niveles se muestran y activan según el progreso del usuario";
  }

  return "El sistema cumple con el criterio de aceptación especificado";
}

function generateCommonTestCases(userStory: UserStory): TestCase[] {
  const commonCases: TestCase[] = [];

  // Caso de prueba para flujo completo
  if (userStory.description.toLowerCase().includes("nivel")) {
    commonCases.push({
      id: `TC_${String(userStory.acceptanceCriteria.length + 1).padStart(
        3,
        "0"
      )}`,
      description: "Verificar flujo completo de la funcionalidad",
      scenario: "Flujo completo del usuario",
      gherkinSteps: [
        "Dado que el usuario está en la aplicación",
        "Y que ha seleccionado un personaje",
        "Cuando el usuario completa todos los pasos requeridos",
        "Y realiza las tres selecciones necesarias",
        'Y hace clic en el botón "Enviar"',
        "Entonces debe completar el nivel exitosamente",
        "Y debe poder avanzar al siguiente nivel",
      ],
      expectedResult:
        "El usuario completa exitosamente el flujo completo de la funcionalidad",
    });
  }

  // Caso de prueba negativo
  commonCases.push({
    id: `TC_${String(userStory.acceptanceCriteria.length + 2).padStart(
      3,
      "0"
    )}`,
    description: "Verificar validaciones cuando no se cumplen las condiciones",
    scenario: "Validación de condiciones no cumplidas",
    gherkinSteps: [
      "Dado que el usuario está en la aplicación",
      "Cuando el usuario intenta proceder sin cumplir todas las condiciones",
      "Entonces el sistema debe prevenir la acción",
      "Y debe mostrar retroalimentación apropiada al usuario",
    ],
    expectedResult:
      "El sistema valida correctamente las condiciones y previene acciones no válidas",
  });

  return commonCases;
}
