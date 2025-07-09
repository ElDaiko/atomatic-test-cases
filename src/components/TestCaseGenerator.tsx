import React, { useState } from "react";
import { generateTestCases } from "../utils/testCaseGenerator";
import {
  createTestCasesInAzure,
  generateAzureTestPlanXML,
  generateAzureCSV,
  type AzureConfig,
  type AzureCreateResult,
} from "../utils/azureIntegration";
import AzureConfigModal from "./AzureConfigModal";
import type { UserStory, TestCase } from "../types/types";
import "./TestCaseGenerator.css";

const TestCaseGenerator: React.FC = () => {
  const [userStory, setUserStory] = useState<UserStory>({
    description: "",
    acceptanceCriteria: [],
  });
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [criteriaInput, setCriteriaInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAzureModalOpen, setIsAzureModalOpen] = useState(false);
  const [azureConfig, setAzureConfig] = useState<AzureConfig | null>(null);
  const [isExportingToAzure, setIsExportingToAzure] = useState(false);

  // Debug: mostrar estado del modal
  console.log("Estado del modal Azure:", isAzureModalOpen);

  const handleCriteriaInputChange = (value: string) => {
    setCriteriaInput(value);

    // Procesar criterios automáticamente al escribir
    const criteriaLines = value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    setUserStory((prev) => ({
      ...prev,
      acceptanceCriteria: criteriaLines,
    }));
  };

  const handleGenerateTestCases = async () => {
    if (!userStory.description || userStory.acceptanceCriteria.length === 0) {
      alert(
        "Por favor, completa la descripción y al menos un criterio de aceptación"
      );
      return;
    }

    setIsLoading(true);
    try {
      const testCases = generateTestCases(userStory);
      setGeneratedTestCases(testCases);
    } catch (error) {
      console.error("Error generando casos de prueba:", error);
      alert("Error al generar los casos de prueba");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTestCases = () => {
    const textToCopy = generatedTestCases
      .map(
        (testCase) => `
ID: ${testCase.id}
Descripción: ${testCase.description}

Escenario: ${testCase.scenario}
${testCase.gherkinSteps.join("\n")}

Resultado Esperado: ${testCase.expectedResult}
---`
      )
      .join("\n\n");

    navigator.clipboard.writeText(textToCopy);
    alert("Casos de prueba copiados al portapapeles");
  };

  const handleExportTestCases = () => {
    const textToExport = generatedTestCases
      .map(
        (testCase) => `
ID: ${testCase.id}
Descripción: ${testCase.description}

Escenario: ${testCase.scenario}
${testCase.gherkinSteps.join("\n")}

Resultado Esperado: ${testCase.expectedResult}
---`
      )
      .join("\n\n");

    const blob = new Blob([textToExport], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "casos_de_prueba.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToAzureXML = () => {
    const xmlContent = generateAzureTestPlanXML(
      generatedTestCases,
      userStory.description
    );
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "casos_de_prueba_azure.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToAzureCSV = () => {
    const csvContent = generateAzureCSV(
      generatedTestCases,
      userStory.description
    );
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "casos_de_prueba_azure.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToAzureJSON = () => {
    const jsonContent = JSON.stringify(
      {
        userStory: userStory,
        testCases: generatedTestCases,
        exportDate: new Date().toISOString(),
        format: "Azure DevOps JSON Export",
      },
      null,
      2
    );

    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "casos_de_prueba_azure.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToAzureTFS = () => {
    // Formato TFS/Team Foundation Server
    const tfsContent = generateTFSFormat(
      generatedTestCases,
      userStory.description
    );
    const blob = new Blob([tfsContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "casos_de_prueba_tfs.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTFSFormat = (testCases: TestCase[], description: string) => {
    const header = `# Test Cases for: ${description}\n# Generated on: ${new Date().toLocaleDateString()}\n# Format: Team Foundation Server\n\n`;

    const content = testCases
      .map((testCase, index) => {
        return `## Test Case ${index + 1}: ${testCase.id}

**Title:** ${testCase.description}

**Area:** Functional Testing
**Priority:** 2 - Normal
**Category:** Acceptance Test

**Test Steps:**
${testCase.gherkinSteps
  .map((step, stepIndex) => `${stepIndex + 1}. ${step}`)
  .join("\n")}

**Expected Result:**
${testCase.expectedResult}

**Test Type:** Manual
**State:** Design
**Reason:** New

---`;
      })
      .join("\n");

    return header + content;
  };

  const handleExportToAzureAPI = () => {
    console.log("Abriendo modal de Azure DevOps");
    setIsAzureModalOpen(true);
  };

  const handleAzureConfigSave = async (config: AzureConfig) => {
    setAzureConfig(config);
    setIsAzureModalOpen(false);
    setIsExportingToAzure(true);

    try {
      const results: AzureCreateResult[] = await createTestCasesInAzure(
        config,
        generatedTestCases,
        userStory.description
      );

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;

      if (failCount === 0) {
        alert(
          `✅ Se crearon ${successCount} casos de prueba exitosamente en Azure DevOps`
        );
      } else {
        alert(
          `⚠️ Se crearon ${successCount} casos de prueba. ${failCount} fallaron. Revisa la consola para detalles.`
        );
        console.log("Resultados detallados:", results);
      }
    } catch (error) {
      console.error("Error exportando a Azure DevOps:", error);
      alert(
        "❌ Error al exportar a Azure DevOps. Revisa la configuración y conectividad."
      );
    } finally {
      setIsExportingToAzure(false);
    }
  };

  const handleExportToAzureWorkItems = () => {
    // Formato para Work Items de Azure DevOps
    const workItemsContent = generateAzureWorkItemsFormat(
      generatedTestCases,
      userStory.description
    );
    const blob = new Blob([workItemsContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "azure_work_items.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateAzureWorkItemsFormat = (
    testCases: TestCase[],
    description: string
  ) => {
    const workItems = testCases.map((testCase) => ({
      op: "add",
      path: "/fields/System.WorkItemType",
      value: "Test Case",
      fields: {
        "System.Title": testCase.description,
        "System.Description": `<div>${testCase.scenario}</div>`,
        "System.State": "Design",
        "System.Reason": "New test case",
        "System.AreaPath": "TestCases",
        "System.IterationPath": "TestCases",
        "Microsoft.VSTS.TCM.Steps": testCase.gherkinSteps.map(
          (step, stepIndex) => ({
            id: stepIndex + 1,
            action: step,
            expectedResult:
              stepIndex === testCase.gherkinSteps.length - 1
                ? testCase.expectedResult
                : "",
          })
        ),
      },
    }));

    return JSON.stringify(
      {
        userStory: description,
        workItems: workItems,
        exportDate: new Date().toISOString(),
        format: "Azure DevOps Work Items",
      },
      null,
      2
    );
  };

  const handleExportToAzureTestPlan = () => {
    // Formato específico para Test Plans de Azure DevOps
    const testPlanContent = generateAzureTestPlanFormat(
      generatedTestCases,
      userStory.description
    );
    const blob = new Blob([testPlanContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "azure_test_plan.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateAzureTestPlanFormat = (
    testCases: TestCase[],
    description: string
  ) => {
    return JSON.stringify(
      {
        name: `Test Plan - ${description}`,
        description: `Test plan generated for: ${description}`,
        state: "Active",
        testCases: testCases.map((testCase, index) => ({
          id: index + 1,
          title: testCase.description,
          priority: 2,
          state: "Design",
          steps: testCase.gherkinSteps.map((step, stepIndex) => ({
            id: stepIndex + 1,
            action: step,
            expectedResult:
              stepIndex === testCase.gherkinSteps.length - 1
                ? testCase.expectedResult
                : "",
          })),
          automationStatus: "Not Automated",
        })),
        exportDate: new Date().toISOString(),
        format: "Azure DevOps Test Plan",
      },
      null,
      2
    );
  };

  return (
    <div className="test-case-generator">
      <div className="input-section">
        <h2>📝 Historia de Usuario</h2>

        <div className="form-group">
          <label htmlFor="description">
            <strong>Descripción de la Historia de Usuario:</strong>
          </label>
          <textarea
            id="description"
            value={userStory.description}
            onChange={(e) =>
              setUserStory((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Ej: Yo como usuaria de los juegos Nosotras quiero vestir al personaje correctamente para poder pasar los 3 niveles."
            rows={4}
            className="description-input"
          />
        </div>

        <div className="form-group">
          <label>
            <strong>Criterios de Aceptación:</strong>
          </label>
          <p className="help-text">
            Escribe cada criterio en una línea separada (presiona Enter para
            crear un nuevo criterio)
          </p>
          <textarea
            value={criteriaInput}
            onChange={(e) => handleCriteriaInputChange(e.target.value)}
            placeholder="Ejemplo:
En la parte izquierda se encuentra los iconos de los tres niveles
En el centro logo de la marca
En la parte derecha se encuentra los iconos de activar y desactivar el audio
Cada nivel tiene un escenario diferente
Se muestra el personaje seleccionado anteriormente por la usuaria"
            rows={8}
            className="criteria-input"
          />

          {userStory.acceptanceCriteria.length > 0 && (
            <div className="criteria-preview">
              <h4>
                Criterios detectados ({userStory.acceptanceCriteria.length}):
              </h4>
              <div className="criteria-list">
                {userStory.acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="criteria-item">
                    <span className="criteria-number">{index + 1}.</span>
                    <span className="criteria-text">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleGenerateTestCases}
          disabled={isLoading}
          className="generate-btn"
        >
          {isLoading ? "⏳ Generando..." : "🚀 Generar Casos de Prueba"}
        </button>
      </div>

      {generatedTestCases.length > 0 && (
        <div className="output-section">
          <div className="output-header">
            <h2>🧪 Casos de Prueba Generados</h2>
            <div className="action-buttons">
              <button onClick={handleCopyTestCases} className="copy-btn">
                📋 Copiar
              </button>
              <button onClick={handleExportTestCases} className="export-btn">
                💾 Exportar TXT
              </button>
              <div className="azure-export-dropdown">
                <button className="azure-export-btn">
                  🔷 Exportar a Azure DevOps
                  <span style={{ fontSize: "0.7rem" }}>▼</span>
                </button>
                <div className="azure-export-options">
                  <div className="azure-option-title">
                    Exportar como archivo
                  </div>
                  <button
                    onClick={handleExportToAzureXML}
                    className="azure-option"
                  >
                    📄 Exportar XML
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Para Test Plans
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureCSV}
                    className="azure-option"
                  >
                    📊 Exportar CSV
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Para Excel
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureJSON}
                    className="azure-option"
                  >
                    📋 Exportar JSON
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Formato completo
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureWorkItems}
                    className="azure-option"
                  >
                    🗂️ Work Items JSON
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Para importar
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureTestPlan}
                    className="azure-option"
                  >
                    📋 Test Plan JSON
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Plan de pruebas
                    </small>
                  </button>
                  <div className="azure-option-separator"></div>
                  <div className="azure-option-title">Integración directa</div>
                  <button
                    onClick={handleExportToAzureAPI}
                    className="azure-option"
                    disabled={isExportingToAzure}
                  >
                    🚀 Crear en Azure DevOps
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      {isExportingToAzure ? "Exportando..." : "Vía API REST"}
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureTFS}
                    className="azure-option"
                  >
                    🏢 Exportar a TFS
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Team Foundation
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureWorkItems}
                    className="azure-option"
                  >
                    🛠️ Exportar a Work Items
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Azure DevOps
                    </small>
                  </button>
                  <button
                    onClick={handleExportToAzureTestPlan}
                    className="azure-option"
                  >
                    📋 Exportar a Test Plan
                    <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      Azure DevOps
                    </small>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="test-cases-container">
            {generatedTestCases.map((testCase, index) => (
              <div key={index} className="test-case-card">
                <div className="test-case-header">
                  <h3>ID: {testCase.id}</h3>
                  <span className="test-case-type">Funcional</span>
                </div>

                <div className="test-case-content">
                  <div className="description-section">
                    <strong>Descripción:</strong>
                    <p>{testCase.description}</p>
                  </div>

                  <div className="scenario-section">
                    <strong>Escenario:</strong>
                    <p>{testCase.scenario}</p>
                  </div>

                  <div className="gherkin-section">
                    <strong>Pasos (Gherkin):</strong>
                    <div className="gherkin-steps">
                      {testCase.gherkinSteps.map((step, stepIndex) => (
                        <div key={stepIndex} className="gherkin-step">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="expected-result-section">
                    <strong>Resultado Esperado:</strong>
                    <p>{testCase.expectedResult}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AzureConfigModal
        isOpen={isAzureModalOpen}
        onClose={() => {
          console.log("Cerrando modal de Azure DevOps");
          setIsAzureModalOpen(false);
        }}
        onSave={handleAzureConfigSave}
        currentConfig={azureConfig || undefined}
      />
    </div>
  );
};

export default TestCaseGenerator;
