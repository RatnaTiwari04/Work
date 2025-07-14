import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import "./RadioButton.scss";

type Variant = "error" | "warning" | "info" | "success" | "";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  message?: string;
  variant?: Variant;
  name: string;
  className?: string;
  infoTip?: string;
  inline?: boolean;
  readOnly?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  required = false,
  disabled = false,
  value = "",
  onChange,
  options = [],
  message = "",
  variant = "",
  name,
  className = "",
  infoTip,
  inline = false,
  readOnly = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const showMessage = touched && variant && message;

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const handleChange = (optionValue: string) => {
    if (disabled || readOnly) return;
    setSelectedValue(optionValue);
    setTouched(true);
    onChange?.(optionValue);
  };

  const getRadioState = () => {
    if (disabled) return "disabled";
    if (variant === "error") return "error";
    if (focused) return "focused";
    if (selectedValue) return "activated";
    return "default";
  };

  const radioState = getRadioState();

  const containerClass = [
    "radio-button-container",
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

  return (
    <div className={containerClass}>
      {label && (
        <label className="radio-button-label">
          {label}
          {required && <span className="required">*</span>}
          {renderInfoTip()}
        </label>
      )}

      <div className="radio-wrapper">
        <div className={`radio-group ${radioState} ${inline ? "inline" : ""}`}>
          {options.map((option, index) => {
            const isChecked = selectedValue === option.value;
            const isDisabled = disabled || option.disabled;
            
            const optionClass = [
              "radio-option",
              isChecked ? "checked" : "",
              isDisabled ? "disabled" : "",
              radioState,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={option.value} className={optionClass}>
                <input
                  type="radio"
                  id={`${name}-${index}`}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleChange(option.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isDisabled}
                  readOnly={readOnly}
                  className="radio-input-hidden"
                />
                {/* Fixed: Use label to wrap the entire radio button field */}
                <label htmlFor={`${name}-${index}`} className="radio-button-field">
                  <div className="radio-circle">
                    <div className="radio-dot" />
                  </div>
                  <span className="radio-option-label">
                    {option.label}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        {variant === "error" && (
          <div className="radio-button__error-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
              <path
                d="M8 4v4M8 10h0"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      {showMessage && <div className={`message ${variant}`}>{message}</div>}
    </div>
  );
};

export default RadioButton;