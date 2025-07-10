import React, { useState, useEffect } from "react";
import { Info } from "lucide-react"; 
import "./TextInput.scss";

type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle";

interface TextInputProps {
  label?: string;
  labelPosition?: LabelPosition;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  message?: string;
  variant?: Variant;
  name?: string;
  className?: string;
  MAX_INPUT_LENGTH?: number;
  multiline?: boolean;
  rows?: number;
  readOnly?: boolean;
  multiEntry?: boolean;
  infoTip?: string;
  showCharacterCount?: boolean; 
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  labelPosition = "external",
  placeholder = "",
  required = false,
  disabled = false,
  value = "",
  onChange,
  message = "",
  variant = "",
  name,
  className = "",
  MAX_INPUT_LENGTH = 20,
  multiline = false,
  rows = 4,
  readOnly = false,
  multiEntry = false,
  infoTip,
  showCharacterCount = false, 
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [chips, setChips] = useState<string[]>([]);

  useEffect(() => {
    if (!multiEntry) setInputValue(value);
  }, [value, multiEntry]);

  const showMessage = touched && variant && message;
  const currentLength = inputValue.length;
  const isNearLimit = currentLength >= MAX_INPUT_LENGTH * 0.8;
  const isAtLimit = currentLength >= MAX_INPUT_LENGTH;

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const handleChipRemove = (index: number) => {
    const updatedChips = chips.filter((_, i) => i !== index);
    setChips(updatedChips);
    onChange?.(updatedChips.join(", "));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (multiEntry) {
      setInputValue(newValue);
      if (newValue.endsWith(", ")) {
        const trimmed = newValue.replace(/,\s*$/, "").trim();
        if (trimmed && !chips.includes(trimmed)) {
          const updatedChips = [...chips, trimmed];
          setChips(updatedChips);
          setInputValue("");
          onChange?.(updatedChips.join(", "));
        }
      }
    } else {
      if (newValue.length > MAX_INPUT_LENGTH) {
        console.warn(`TextInput: Max length of ${MAX_INPUT_LENGTH} exceeded.`);
        return;
      }
      setInputValue(newValue);
      onChange?.(newValue);
    }
  };

  const getInputState = () => {
    if (disabled) return "disabled";
    if (variant === "error") return "error";
    if (focused) return "focused";
    if (inputValue) return "activated";
    return "default";
  };

  const inputState = getInputState();

  const inputClass = ["text-input", inputState, className].join(" ");

  const containerClass = [
    "text-input-container",
    labelPosition ? `label-${labelPosition}` : "",
    variant,
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

  const renderCharacterCount = () => {
    if (!showCharacterCount || multiEntry) return null;
    
    const counterClass = [
      "character-counter",
      isAtLimit ? "at-limit" : "",
      isNearLimit ? "near-limit" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={counterClass}>
        {currentLength}/{MAX_INPUT_LENGTH} chars used
      </div>
    );
  };

  return (
    <div className={containerClass}>
      {label && labelPosition === "external" && (
        <label htmlFor={name} className="text-input-label">
          {label}
          {required && <span className="required">*</span>}
          {renderInfoTip()}
        </label>
      )}

      <div className="input-wrapper">
        {label && labelPosition === "internal" && (
          <label
            htmlFor={name}
            className={`floating-label ${focused || inputValue ? "float" : ""}`}
          >
            {label}
            {required && <span className="required">*</span>}
            {renderInfoTip()}
          </label>
        )}

        {label && labelPosition === "middle" && (
          <label
            htmlFor={name}
            className={`middle-label ${focused ? "focused" : ""}`}
          >
            {label}
            {required && <span className="required">*</span>}
            {renderInfoTip()}
          </label>
        )}

        <div className="input-field-wrapper">
          {multiline ? (
            <textarea
              id={name}
              name={name}
              className={inputClass}
              value={inputValue}
              placeholder={
                labelPosition === "internal" || labelPosition === "middle"
                  ? ""
                  : placeholder
              }
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              disabled={disabled}
              rows={rows}
              readOnly={readOnly}
              maxLength={MAX_INPUT_LENGTH}
            />
          ) : (
            <input
              type="text"
              id={name}
              name={name}
              className={inputClass}
              value={inputValue}
              placeholder={
                labelPosition === "internal" || labelPosition === "middle"
                  ? ""
                  : placeholder
              }
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              maxLength={MAX_INPUT_LENGTH}
            />
          )}

          {variant === "error" && (
            <div className="text-input__error-icon">
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
      </div>

      {renderCharacterCount()}

      {multiEntry && chips.length > 0 && (
        <div className="chip-container">
          {chips.map((chip, index) => (
            <div className="chip" key={index}>
              {chip}
              <button type="button" onClick={() => handleChipRemove(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {showMessage && <div className={`message ${variant}`}>{message}</div>}
    </div>
  );
};

export default TextInput;