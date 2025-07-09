import React from "react";
import "./CriteriaList.css";

interface CriteriaListProps {
  criteria: string[];
}

const CriteriaList: React.FC<CriteriaListProps> = ({ criteria }) => {
  if (criteria.length === 0) return null;

  return (
    <div className="criteria-preview">
      <h4>Criterios detectados ({criteria.length}):</h4>
      <div className="criteria-list">
        {criteria.map((criterion, index) => (
          <div key={index} className="criteria-item">
            <span className="criteria-number">{index + 1}.</span>
            <span className="criteria-text">{criterion}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaList;
