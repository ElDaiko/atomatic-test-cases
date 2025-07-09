import React from "react";
import TestCaseCard from "../molecules/TestCaseCard";
import ExportActions from "../molecules/ExportActions";
import type { TestCase } from "../../types/types";
import "./TestCasesList.css";

interface TestCasesListProps {
  testCases: TestCase[];
  onCopy: () => void;
  onExportTxt: () => void;
  onExportToAzureAPI: () => void;
  onExportToAzureCSV: () => void;
  onExportToAzureXML: () => void;
  onExportToAzureJSON: () => void;
  isExportingToAzure: boolean;
}

const TestCasesList: React.FC<TestCasesListProps> = ({
  testCases,
  onCopy,
  onExportTxt,
  onExportToAzureAPI,
  onExportToAzureCSV,
  onExportToAzureXML,
  onExportToAzureJSON,
  isExportingToAzure,
}) => {
  if (testCases.length === 0) return null;

  return (
    <div className="output-section">
      <div className="output-header">
        <h2>🧪 Casos de Prueba Generados</h2>
        <ExportActions
          onCopy={onCopy}
          onExportTxt={onExportTxt}
          onExportToAzureAPI={onExportToAzureAPI}
          onExportToAzureCSV={onExportToAzureCSV}
          onExportToAzureXML={onExportToAzureXML}
          onExportToAzureJSON={onExportToAzureJSON}
          isExportingToAzure={isExportingToAzure}
        />
      </div>

      <div className="test-cases-container">
        {testCases.map((testCase, index) => (
          <TestCaseCard key={index} testCase={testCase} />
        ))}
      </div>
    </div>
  );
};

export default TestCasesList;
