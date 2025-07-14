import React, { useState } from "react";
import { Info } from "lucide-react";
import "./RadioButton.scss";

type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "left" | "right" | "top" | "bottom";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  label?: string;
  labelPosition?: LabelPosition;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  required?: boolean;
  disabled?: boolean;
  message?: string;
  variant?: Variant;
  className?: string;
  inline?: boolean;
  infoTip?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  labelPosition = "top",
  options,
  value = "",
  onChange,
  name,
  required = false,
  disabled = false,
  message = "",
  variant = "",
  className = "",
  inline = false,
  infoTip,
}) => {
  const [touched, setTouched] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const showMessage = touched && variant && message;

  const handleChange = (optionValue: string) => {
    if (disabled) return;
    
    setSelectedValue(optionValue);
    setTouched(true);
    onChange?.(optionValue);
  };

  const getRadioState = () => {
    if (disabled) return "disabled";
    if (variant === "error") return "error";
    return "default";
  };

  const radioState = getRadioState();

  const containerClass = [
    "radio-button-container",
    labelPosition ? `label-${labelPosition}` : "",
    variant,
    inline ? "inline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderInfoTip = () =>
    infoTip && (
      <span className="info-icon" aria-label="Info">
        <Info size={16} strokeWidth={1.5} />
        <div className="tooltip">{infoTip}</div>
      </span>
    );

  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <div className="radio-group-label">
        {label}
        {required && <span className="required">*</span>}
        {renderInfoTip()}
      </div>
    );
  };

  const renderRadioOptions = () => (
    <div className={`radio-options ${inline ? "inline" : ""}`}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        const isDisabled = disabled || option.disabled;
        
        const radioItemClass = [
          "radio-item",
          radioState,
          isSelected ? "selected" : "",
          isDisabled ? "disabled" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={option.value} className={radioItemClass}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => handleChange(option.value)}
              required={required}
              disabled={isDisabled}
              className="radio-input"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="radio-label"
            >
              <span className="radio-indicator">
                <span className="radio-dot" />
              </span>
              <span className="radio-text">{option.label}</span>
            </label>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={containerClass}>
      {labelPosition === "top" && renderLabel()}
      
      <div className="radio-wrapper">
        {labelPosition === "left" && renderLabel()}
        
        {renderRadioOptions()}
        
        {labelPosition === "right" && renderLabel()}
      </div>
      
      {labelPosition === "bottom" && renderLabel()}
      
      {showMessage && <div className={`message ${variant}`}>{message}</div>}
    </div>
  );
};

export default RadioButton;