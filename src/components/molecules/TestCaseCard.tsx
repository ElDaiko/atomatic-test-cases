import React from "react";
import type { TestCase } from "../../types/types";
import "./TestCaseCard.css";

interface TestCaseCardProps {
  testCase: TestCase;
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase }) => {
  return (
    <div className="test-case-card">
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
  );
};

export default TestCaseCard;
