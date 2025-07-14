import React, { useState, useEffect } from "react";
import { Info, Mail, AlertCircle, CheckCircle } from "lucide-react";
import "./EmailInput.scss";

type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle";

interface EmailInputProps {
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
  readOnly?: boolean;
  multiEntry?: boolean;
  infoTip?: string;
  showValidation?: boolean;
  allowMultiple?: boolean;
  validateOnBlur?: boolean;
  customValidation?: (email: string) => boolean;
  fixedDomain?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  label,
  labelPosition = "external",
  placeholder = "Enter email address",
  required = false,
  disabled = false,
  value = "",
  onChange,
  message = "",
  variant = "",
  name,
  className = "",
  readOnly = false,
  multiEntry = false,
  infoTip,
  showValidation = true,
  allowMultiple = false,
  validateOnBlur = true,
  customValidation,
  fixedDomain = "",
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [validationState, setValidationState] = useState<"valid" | "invalid" | "">("");
  const [validationMessage, setValidationMessage] = useState("");
  const [emailChips, setEmailChips] = useState<string[]>([]);

  useEffect(() => {
    if (multiEntry) {
      // For multi-entry, parse the value into chips
      if (value) {
        const emails = value.split(',').map(e => e.trim()).filter(Boolean);
        setEmailChips(emails);
        setInputValue("");
      }
    } else {
      // For single entry, handle fixed domain
      if (fixedDomain && value?.endsWith(fixedDomain)) {
        setInputValue(value.replace(fixedDomain, ""));
      } else {
        setInputValue(value || "");
      }
    }
  }, [value, fixedDomain, multiEntry]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getFullEmail = (input: string) => {
    return fixedDomain ? `${input}${fixedDomain}` : input;
  };

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) return !required;

    if (customValidation) return customValidation(email);
    if (allowMultiple) {
      const emails = email.split(',').map(e => e.trim());
      return emails.every(e => emailRegex.test(e));
    }

    return emailRegex.test(email);
  };

  const getValidationMessage = (email: string): string => {
    if (!email.trim()) return required ? "Email is required" : "";

    if (allowMultiple) {
      const emails = email.split(',').map(e => e.trim());
      const invalidEmails = emails.filter(e => !emailRegex.test(e));
      if (invalidEmails.length > 0) {
        return `Invalid email${invalidEmails.length > 1 ? 's' : ''}: ${invalidEmails.join(', ')}`;
      }
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const handleValidation = (input: string) => {
    const fullEmail = getFullEmail(input);
    const isValid = validateEmail(fullEmail);
    const validationMsg = getValidationMessage(fullEmail);

    setValidationState(fullEmail.trim() ? (isValid ? "valid" : "invalid") : "");
    setValidationMessage(validationMsg);
  };

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    if (validateOnBlur && !multiEntry) {
      handleValidation(inputValue);
    }
  };

  const handleChipRemove = (index: number) => {
    const updatedChips = emailChips.filter((_, i) => i !== index);
    setEmailChips(updatedChips);
    onChange?.(updatedChips.join(", "));
  };

  const addEmailChip = (email: string) => {
    const trimmedEmail = email.trim();
    if (trimmedEmail && !emailChips.includes(trimmedEmail)) {
      const fullEmail = getFullEmail(trimmedEmail);
      if (validateEmail(fullEmail)) {
        const updatedChips = [...emailChips, fullEmail];
        setEmailChips(updatedChips);
        setInputValue("");
        onChange?.(updatedChips.join(", "));
        setValidationState("");
        setValidationMessage("");
      } else {
        // Show validation error for invalid email
        setValidationState("invalid");
        setValidationMessage(getValidationMessage(fullEmail));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (multiEntry && (e.key === ', ')) {
      e.preventDefault();
      if (inputValue.trim()) {
        addEmailChip(inputValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    if (multiEntry) {
      // Handle multi-entry mode
      setInputValue(input);
      
      // Check if user typed comma followed by space
      if (input.endsWith(", ")) {
        const emailToAdd = input.replace(/,\s*$/, "").trim();
        if (emailToAdd) {
          addEmailChip(emailToAdd);
        }
      }
    } else {
      // Handle single entry mode
      if (fixedDomain && input.includes(fixedDomain)) {
        input = input.replace(fixedDomain, "");
      }

      setInputValue(input);

      const fullEmail = getFullEmail(input);
      onChange?.(fullEmail);

      if (showValidation && touched) {
        handleValidation(input);
      }
    }
  };

  const showMessage = touched && ((variant && message) || (showValidation && validationMessage));
  const displayMessage = (variant && message) || validationMessage;
  const currentVariant = variant || (validationState === "invalid" ? "error" : validationState === "valid" ? "success" : "");

  const getInputState = () => {
    if (disabled) return "disabled";
    if (currentVariant === "error") return "error";
    if (currentVariant === "success") return "success";
    if (focused) return "focused";
    if (inputValue || (multiEntry && emailChips.length > 0)) return "activated";
    return "default";
  };

  const inputState = getInputState();
  const inputClass = ["email-input", inputState, className].join(" ");
  const containerClass = ["email-input-container", labelPosition ? `label-${labelPosition}` : "", currentVariant].filter(Boolean).join(" ");

  const renderInfoTip = () =>
    infoTip && (
      <span className="info-icon" aria-label="Info">
        <Info size={16} strokeWidth={1.5} />
        <div className="tooltip">{infoTip}</div>
      </span>
    );

  const renderValidationIcon = () => {
    if (!showValidation || !inputValue.trim() || multiEntry) return null;
    if (validationState === "valid") return <div className="email-input__validation-icon success"><CheckCircle size={16} /></div>;
    if (validationState === "invalid") return <div className="email-input__validation-icon error"><AlertCircle size={16} /></div>;
    return null;
  };

  const renderEmailIcon = () => {
    if (!showValidation || !inputValue.trim() || validationState === "" || multiEntry) {
      return <div className="email-input__email-icon"><Mail size={16} /></div>;
    }
    return null;
  };

  const getPlaceholderText = () => {
    if (labelPosition === "internal" || labelPosition === "middle") return "";
    if (multiEntry) {
      return emailChips.length > 0 ? "Add another email..." : "Enter email addresses (comma separated)";
    }
    return placeholder;
  };

  return (
    <div className={containerClass}>
      {label && labelPosition === "external" && (
        <label htmlFor={name} className="email-input-label">
          {label}
          {required && <span className="required">*</span>}
          {renderInfoTip()}
        </label>
      )}

      <div className="input-wrapper">
        {label && labelPosition === "internal" && (
          <label htmlFor={name} className={`floating-label ${focused || inputValue || (multiEntry && emailChips.length > 0) ? "float" : ""}`}>
            {label}
            {required && <span className="required">*</span>}
            {renderInfoTip()}
          </label>
        )}

        {label && labelPosition === "middle" && (
          <label htmlFor={name} className={`middle-label ${focused ? "focused" : ""}`}>
            {label}
            {required && <span className="required">*</span>}
            {renderInfoTip()}
          </label>
        )}

        <div className="input-field-wrapper">
          <input
            type="text"
            id={name}
            name={name}
            className={inputClass}
            value={inputValue}
            placeholder={getPlaceholderText()}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required && (!multiEntry || emailChips.length === 0)}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete="email"
          />
          {fixedDomain && !multiEntry && <span className="email-input__fixed-domain-addon">{fixedDomain}</span>}
          {renderValidationIcon()}
          {renderEmailIcon()}
        </div>
      </div>

      {multiEntry && emailChips.length > 0 && (
        <div className="chip-container">
          {emailChips.map((email, index) => (
            <div className="chip" key={index}>
              {email}
              <button type="button" onClick={() => handleChipRemove(index)} disabled={disabled || readOnly}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {showMessage && <div className={`message ${currentVariant}`}>{displayMessage}</div>}
    </div>
  );
};

export default EmailInput;