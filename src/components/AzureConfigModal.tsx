import React, { useState } from "react";
import type { AzureConfig } from "../utils/azureIntegration";
import "./AzureConfigModal.css";

interface AzureConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AzureConfig) => void;
  currentConfig?: AzureConfig;
  isDarkMode?: boolean;
}

const AzureConfigModal: React.FC<AzureConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentConfig,
  isDarkMode = false,
}) => {
  const [config, setConfig] = useState<AzureConfig>({
    organization: currentConfig?.organization || "",
    project: currentConfig?.project || "",
    personalAccessToken: currentConfig?.personalAccessToken || "",
  });

  const handleSave = () => {
    if (
      !config.organization ||
      !config.project ||
      !config.personalAccessToken
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    onSave(config);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>⚙️ Configuración de Azure DevOps</h3>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="organization">Organización de Azure DevOps:</label>
            <input
              id="organization"
              type="text"
              value={config.organization}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, organization: e.target.value }))
              }
              placeholder="tu-organizacion"
              className="form-input"
            />
            <small>
              Ejemplo: si tu URL es https://dev.azure.com/mi-empresa, entonces
              es "mi-empresa"
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="project">Proyecto:</label>
            <input
              id="project"
              type="text"
              value={config.project}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, project: e.target.value }))
              }
              placeholder="nombre-del-proyecto"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pat">Personal Access Token (PAT):</label>
            <input
              id="pat"
              type="password"
              value={config.personalAccessToken}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  personalAccessToken: e.target.value,
                }))
              }
              placeholder="tu-personal-access-token"
              className="form-input"
            />
            <small>
              Necesitas un PAT con permisos de "Work Items (Read & Write)".
              <a
                href="https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver cómo crearlo
              </a>
            </small>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default AzureConfigModal;
