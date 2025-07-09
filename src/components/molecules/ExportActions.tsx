import React from "react";
import "./ExportActions.css";

interface ExportActionsProps {
  onCopy: () => void;
  onExportTxt: () => void;
  onExportToAzureAPI: () => void;
  onExportToAzureCSV: () => void;
  onExportToAzureXML: () => void;
  onExportToAzureJSON: () => void;
  isExportingToAzure: boolean;
}

const ExportActions: React.FC<ExportActionsProps> = ({
  onCopy,
  onExportTxt,
  onExportToAzureAPI,
  onExportToAzureCSV,
  onExportToAzureXML,
  onExportToAzureJSON,
  isExportingToAzure,
}) => {
  return (
    <div className="action-buttons">
      <button onClick={onCopy} className="copy-btn">
        📋 Copiar
      </button>
      <button onClick={onExportTxt} className="export-btn">
        💾 Exportar TXT
      </button>
      <div className="azure-export-dropdown">
        <button className="azure-export-btn">
          🔷 Exportar a Azure DevOps
          <span style={{ fontSize: "0.7rem" }}>▼</span>
        </button>
        <div className="azure-export-options">
          <button
            onClick={onExportToAzureAPI}
            className="azure-option"
            disabled={isExportingToAzure}
          >
            ♦ Crear en Azure DevOps
            <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              {isExportingToAzure ? "Exportando..." : "Vía API REST"}
            </small>
          </button>
          <div className="azure-option-separator"></div>
          <button onClick={onExportToAzureCSV} className="azure-option">
            ♦ Exportar CSV
            <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              Para Excel/Azure
            </small>
          </button>
          <button onClick={onExportToAzureXML} className="azure-option">
            📄 Exportar XML
            <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              Test Plans
            </small>
          </button>
          <button onClick={onExportToAzureJSON} className="azure-option">
            ♦ Exportar JSON
            <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              Formato completo
            </small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportActions;
