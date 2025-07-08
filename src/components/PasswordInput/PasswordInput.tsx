import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle, Lock } from "lucide-react";
import "./PasswordInput.scss";

type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle";
type StrengthLevel = "weak" | "fair" | "good" | "strong" | "";

interface PasswordInputProps {
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
  readOnly?: boolean;
  showStrengthIndicator?: boolean;
  showToggle?: boolean;
  minLength?: number;
  lockVisibility?: boolean;
  holdToShow?: boolean; 
}

const PasswordInput: React.FC<PasswordInputProps> = ({
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
  MAX_INPUT_LENGTH = 50,
  readOnly = false,
  showStrengthIndicator = false,
  showToggle = true,
  minLength = 6,
  lockVisibility = false, // Default: visibility can be toggled
  holdToShow = false, // Default: normal toggle behavior
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const showMessage = touched && variant && message;

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > MAX_INPUT_LENGTH) {
      console.warn(`PasswordInput: Max length of ${MAX_INPUT_LENGTH} exceeded.`);
      return;
    }
    onChange?.(newValue);
  };

  const togglePasswordVisibility = () => {
    if (lockVisibility) return; // Can't toggle if locked
    if (holdToShow) return; // Can't toggle if in hold mode
    setShowPassword(!showPassword);
  };

  const handleMouseDown = () => {
    if (lockVisibility) return; // Can't show if locked
    if (!holdToShow) return; // Only works in hold mode
    
    setIsHolding(true);
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    if (!holdToShow) return; // Only works in hold mode
    
    setIsHolding(false);
    setShowPassword(false);
  };

  const handleMouseLeave = () => {
    if (!holdToShow) return; // Only works in hold mode
    
    setIsHolding(false);
    setShowPassword(false);
  };

  const handleTouchStart = () => {
    if (lockVisibility) return; // Can't show if locked
    if (!holdToShow) return; // Only works in hold mode
    
    setIsHolding(true);
    setShowPassword(true);
  };

  const handleTouchEnd = () => {
    if (!holdToShow) return; // Only works in hold mode
    
    setIsHolding(false);
    setShowPassword(false);
  };

  const getPasswordStrength = (password: string): StrengthLevel => {
    if (!password) return "";

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score < 2) return "weak";
    if (score < 4) return "fair";
    if (score < 6) return "good";
    return "strong";
  };

  const getInputState = () => {
    if (disabled) return "disabled";
    if (variant === "error") return "error";
    if (focused) return "focused";
    if (value) return "activated";
    return "default";
  };

  const inputState = getInputState();
  const passwordStrength = showStrengthIndicator ? getPasswordStrength(value) : "";

  const inputClass = [
    "password-input",
    inputState,
    className,
  ].join(" ");

  const containerClass = [
    "password-input-container",
    labelPosition ? `label-${labelPosition}` : "",
    variant,
    passwordStrength ? `strength-${passwordStrength}` : "",
    lockVisibility ? "locked" : "",
    holdToShow ? "hold-to-show" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Determine which icon to show
  const getToggleIcon = () => {
    if (lockVisibility) return <Lock size={16} />;
    if (holdToShow) {
      return isHolding ? <EyeOff size={16} /> : <Eye size={16} />;
    }
    return showPassword ? <EyeOff size={16} /> : <Eye size={16} />;
  };

  // Determine aria-label for accessibility
  const getAriaLabel = () => {
    if (lockVisibility) return "Password visibility locked";
    if (holdToShow) return isHolding ? "Release to hide password" : "Hold to show password";
    return showPassword ? "Hide password" : "Show password";
  };

  return (
    <div className={containerClass}>
      {label && labelPosition === "external" && (
        <label htmlFor={name} className="password-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {label && labelPosition === "internal" && (
          <label
            htmlFor={name}
            className={`floating-label ${focused || value ? "float" : ""}`}
          >
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}

        {label && labelPosition === "middle" && (
          <label
            htmlFor={name}
            className={`middle-label ${focused ? "focused" : ""}`}
          >
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}

        <div className="input-field-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            className={inputClass}
            value={value}
            placeholder={labelPosition === "internal" || labelPosition === "middle" ? "" : placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            minLength={minLength}
          />

          {variant === "error" && (
            <div className="password-input__error-icon">
              <AlertCircle size={16} />
            </div>
          )}

          {showToggle && (
            <button
              type="button"
              className={`password-toggle ${lockVisibility ? "locked" : ""} ${holdToShow ? "hold-mode" : ""} ${isHolding ? "holding" : ""}`}
              onClick={togglePasswordVisibility}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              disabled={disabled}
              aria-label={getAriaLabel()}
              title={getAriaLabel()}
            >
              {getToggleIcon()}
            </button>
          )}
        </div>
      </div>

      {showStrengthIndicator && value && (
        <div className="password-strength">
          <div className="strength-bar">
            <div className={`strength-fill ${passwordStrength}`}></div>
          </div>
          <span className={`strength-text ${passwordStrength}`}>
            {passwordStrength === "weak" && "Weak"}
            {passwordStrength === "fair" && "Fair"}
            {passwordStrength === "good" && "Good"}
            {passwordStrength === "strong" && "Strong"}
          </span>
        </div>
      )}

      {showMessage && <div className={`message ${variant}`}>{message}</div>}
    </div>
  );
};

export default PasswordInput;