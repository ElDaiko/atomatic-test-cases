import type { TestCase } from "../types/types";

export interface AzureConfig {
  organization: string;
  project: string;
  personalAccessToken: string;
}

export interface AzureTestCase {
  id: number;
  title: string;
  description: string;
  steps: AzureTestStep[];
  expectedResult: string;
}

export interface AzureTestStep {
  action: string;
  expectedResult: string;
}

export interface AzureWorkItemResponse {
  id: number;
  url: string;
  fields: Record<string, unknown>;
}

export interface AzureCreateResult {
  success: boolean;
  workItem?: AzureWorkItemResponse;
  error?: string;
  testCaseTitle?: string;
}

// Función para convertir casos de prueba al formato de Azure DevOps
export const convertToAzureFormat = (
  testCases: TestCase[]
): AzureTestCase[] => {
  return testCases.map((testCase, index) => ({
    id: index + 1,
    title: testCase.description,
    description: testCase.scenario,
    steps: convertGherkinToAzureSteps(testCase.gherkinSteps),
    expectedResult: testCase.expectedResult,
  }));
};

const convertGherkinToAzureSteps = (
  gherkinSteps: string[]
): AzureTestStep[] => {
  const steps: AzureTestStep[] = [];
  let currentAction = "";
  let currentExpected = "";

  gherkinSteps.forEach((step) => {
    if (
      step.startsWith("Dado") ||
      step.startsWith("Cuando") ||
      step.startsWith("Y")
    ) {
      if (currentAction) {
        steps.push({
          action: currentAction,
          expectedResult:
            currentExpected || "El sistema debe responder correctamente",
        });
      }
      currentAction = step;
      currentExpected = "";
    } else if (step.startsWith("Entonces")) {
      currentExpected = step;
    }
  });

  // Agregar el último paso
  if (currentAction) {
    steps.push({
      action: currentAction,
      expectedResult:
        currentExpected || "El sistema debe responder correctamente",
    });
  }

  return steps;
};

// Función para generar XML compatible con Azure Test Plans
export const generateAzureTestPlanXML = (
  testCases: TestCase[],
  userStoryTitle: string
): string => {
  const azureTestCases = convertToAzureFormat(testCases);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<TestSuite>
  <Name>${userStoryTitle}</Name>
  <Description>Casos de prueba generados automáticamente</Description>
  <TestCases>
    ${azureTestCases
      .map(
        (testCase) => `
    <TestCase>
      <Title>${escapeXml(testCase.title)}</Title>
      <Description>${escapeXml(testCase.description)}</Description>
      <Steps>
        ${testCase.steps
          .map(
            (step, index) => `
        <Step>
          <StepNumber>${index + 1}</StepNumber>
          <Action>${escapeXml(step.action)}</Action>
          <ExpectedResult>${escapeXml(step.expectedResult)}</ExpectedResult>
        </Step>`
          )
          .join("")}
      </Steps>
      <ExpectedResult>${escapeXml(testCase.expectedResult)}</ExpectedResult>
    </TestCase>`
      )
      .join("")}
  </TestCases>
</TestSuite>`;

  return xmlContent;
};

// Función para crear casos de prueba en Azure DevOps usando REST API
export const createTestCasesInAzure = async (
  config: AzureConfig,
  testCases: TestCase[],
  userStoryTitle: string
): Promise<AzureCreateResult[]> => {
  const azureTestCases = convertToAzureFormat(testCases);
  const results: AzureCreateResult[] = [];

  for (const testCase of azureTestCases) {
    try {
      const workItem = await createWorkItemInAzure(
        config,
        testCase,
        userStoryTitle
      );
      results.push({ success: true, workItem });
    } catch (error) {
      console.error(`Error creando caso de prueba ${testCase.title}:`, error);
      results.push({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        testCaseTitle: testCase.title,
      });
    }
  }

  return results;
};

const createWorkItemInAzure = async (
  config: AzureConfig,
  testCase: AzureTestCase,
  userStoryTitle: string
): Promise<AzureWorkItemResponse> => {
  const url = `https://dev.azure.com/${config.organization}/${config.project}/_apis/wit/workitems/$Test%20Case?api-version=7.0`;

  const stepsHtml = testCase.steps
    .map(
      (step, index) =>
        `<step id="${index + 1}" type="ActionStep">
      <parameterizedString isformatted="true">${
        step.action
      }</parameterizedString>
      <parameterizedString isformatted="true">${
        step.expectedResult
      }</parameterizedString>
      <description/>
    </step>`
    )
    .join("");

  const body = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: testCase.title,
    },
    {
      op: "add",
      path: "/fields/System.Description",
      value: testCase.description,
    },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.TCM.Steps",
      value: `<steps id="0" last="${testCase.steps.length}">${stepsHtml}</steps>`,
    },
    {
      op: "add",
      path: "/fields/System.Tags",
      value: `AutoGenerated; ${userStoryTitle}`,
    },
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json-patch+json",
      Authorization: `Basic ${btoa(":" + config.personalAccessToken)}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Función auxiliar para escapar caracteres XML
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
};

// Función para generar formato CSV para importar a Azure
export const generateAzureCSV = (
  testCases: TestCase[],
  userStoryTitle: string
): string => {
  const azureTestCases = convertToAzureFormat(testCases);

  let csvContent =
    "Work Item Type,Title,Description,Steps,Expected Result,Tags\n";

  azureTestCases.forEach((testCase) => {
    const stepsText = testCase.steps
      .map((step) => `${step.action} -> ${step.expectedResult}`)
      .join(" | ");
    const row = [
      "Test Case",
      `"${testCase.title.replace(/"/g, '""')}"`,
      `"${testCase.description.replace(/"/g, '""')}"`,
      `"${stepsText.replace(/"/g, '""')}"`,
      `"${testCase.expectedResult.replace(/"/g, '""')}"`,
      `"AutoGenerated; ${userStoryTitle}"`,
    ].join(",");

    csvContent += row + "\n";
  });

  return csvContent;
};
