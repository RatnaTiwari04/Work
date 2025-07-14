import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import "./Checkbox.scss";

type Variant = "error" | "warning" | "info" | "success" | "";

interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  options: CheckboxOption[];
  message?: string;
  variant?: Variant;
  name: string;
  className?: string;
  infoTip?: string;
  inline?: boolean;
  readOnly?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  required = false,
  disabled = false,
  value = [],
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
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const showMessage = touched && variant && message;

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const handleChange = (optionValue: string) => {
    if (disabled || readOnly) return;
    
    let newValues: string[];
    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter(val => val !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }
    
    setSelectedValues(newValues);
    setTouched(true);
    onChange?.(newValues);
  };

  const getCheckboxState = () => {
    if (disabled) return "disabled";
    if (variant === "error") return "error";
    if (focused) return "focused";
    if (selectedValues.length > 0) return "activated";
    return "default";
  };

  const checkboxState = getCheckboxState();
  const shouldAutoWrap = !inline && options.length > 3;

  const containerClass = [
    "checkbox-container",
    variant,
    inline ? "inline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const groupClass = [
    "checkbox-group",
    checkboxState,
    inline ? "inline" : "",
    shouldAutoWrap ? "auto-wrap" : "",
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
        <label className="checkbox-label">
          {label}
          {required && <span className="required">*</span>}
          {renderInfoTip()}
        </label>
      )}

      <div className="checkbox-wrapper">
        <div className={groupClass}>
          {options.map((option, index) => {
            const isChecked = selectedValues.includes(option.value);
            const isDisabled = disabled || option.disabled;
            
            const optionClass = [
              "checkbox-option",
              isChecked ? "checked" : "",
              isDisabled ? "disabled" : "",
              checkboxState,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={option.value} className={optionClass}>
                <input
                  type="checkbox"
                  id={`${name}-${index}`}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleChange(option.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isDisabled}
                  readOnly={readOnly}
                  className="checkbox-input-hidden"
                />
                <label htmlFor={`${name}-${index}`} className="checkbox-field">
                  <div className="checkbox-box">
                    <div className="checkbox-checkmark">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="checkbox-option-label">
                    {option.label}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        {variant === "error" && (
          <div className="checkbox__error-icon">
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

export default Checkbox;