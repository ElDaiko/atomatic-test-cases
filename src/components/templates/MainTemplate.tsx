import React, { useState, useEffect } from "react";
import Header from "../atoms/Header";
import UserStoryForm from "../organisms/UserStoryForm";
import TestCasesList from "../organisms/TestCasesList";
import AzureConfigModal from "../AzureConfigModal";
import { generateTestCases } from "../../utils/testCaseGenerator";
import {
  createTestCasesInAzure,
  generateAzureTestPlanXML,
  generateAzureCSV,
  type AzureConfig,
  type AzureCreateResult,
} from "../../utils/azureIntegration";
import type { UserStory, TestCase } from "../../types/types";
import "./MainTemplate.css";

const MainTemplate: React.FC = () => {
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Effect to update body class for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [isDarkMode]);

  const handleCriteriaInputChange = (value: string) => {
    setCriteriaInput(value);
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

  const handleExportToAzureAPI = () => {
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`test-case-generator ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Header
        title="🧪 Generador de Casos de Prueba QA"
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <UserStoryForm
        userStory={userStory}
        criteriaInput={criteriaInput}
        isLoading={isLoading}
        onDescriptionChange={(description) =>
          setUserStory((prev) => ({ ...prev, description }))
        }
        onCriteriaInputChange={handleCriteriaInputChange}
        onGenerateTestCases={handleGenerateTestCases}
      />

      <TestCasesList
        testCases={generatedTestCases}
        onCopy={handleCopyTestCases}
        onExportTxt={handleExportTestCases}
        onExportToAzureAPI={handleExportToAzureAPI}
        onExportToAzureCSV={handleExportToAzureCSV}
        onExportToAzureXML={handleExportToAzureXML}
        onExportToAzureJSON={handleExportToAzureJSON}
        isExportingToAzure={isExportingToAzure}
      />

      <AzureConfigModal
        isOpen={isAzureModalOpen}
        onClose={() => setIsAzureModalOpen(false)}
        onSave={handleAzureConfigSave}
        currentConfig={azureConfig || undefined}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default MainTemplate;
