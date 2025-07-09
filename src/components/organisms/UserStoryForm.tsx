import React from "react";
import CriteriaList from "../molecules/CriteriaList";
import type { UserStory } from "../../types/types";
import "./UserStoryForm.css";

interface UserStoryFormProps {
  userStory: UserStory;
  criteriaInput: string;
  isLoading: boolean;
  onDescriptionChange: (description: string) => void;
  onCriteriaInputChange: (criteria: string) => void;
  onGenerateTestCases: () => void;
}

const UserStoryForm: React.FC<UserStoryFormProps> = ({
  userStory,
  criteriaInput,
  isLoading,
  onDescriptionChange,
  onCriteriaInputChange,
  onGenerateTestCases,
}) => {
  return (
    <div className="input-section">
      <h2>📝 Historia de Usuario</h2>

      <div className="form-group">
        <label htmlFor="description">
          <strong>Descripción de la Historia de Usuario:</strong>
        </label>
        <textarea
          id="description"
          value={userStory.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
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
          Escribe cada criterio en una línea separada (presiona Enter para crear
          un nuevo criterio)
        </p>
        <textarea
          value={criteriaInput}
          onChange={(e) => onCriteriaInputChange(e.target.value)}
          placeholder="Ejemplo:
En la parte izquierda se encuentra los iconos de los tres niveles
En el centro logo de la marca
En la parte derecha se encuentra los iconos de activar y desactivar el audio
Cada nivel tiene un escenario diferente
Se muestra el personaje seleccionado anteriormente por la usuaria"
          rows={8}
          className="criteria-input"
        />

        <CriteriaList criteria={userStory.acceptanceCriteria} />
      </div>

      <button
        onClick={onGenerateTestCases}
        disabled={isLoading}
        className="generate-btn"
      >
        {isLoading ? "⏳ Generando..." : "🚀 Generar Casos de Prueba"}
      </button>
    </div>
  );
};

export default UserStoryForm;
