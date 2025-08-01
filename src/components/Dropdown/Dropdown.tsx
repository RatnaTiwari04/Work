import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, X, Info, Search } from "lucide-react";
import "./Dropdown.scss";

type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle" | "left-inline"; 

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  leftSideContent?: string;
  rightSideContent?: string;
}

interface DropdownProps {
  label?: string;
  labelPosition?: LabelPosition;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  message?: string;
  variant?: Variant;
  name?: string;
  className?: string;
  options: DropdownOption[];
  multiSelect?: boolean;
  searchable?: boolean;
  allowCustomInput?: boolean;
  infoTip?: string;
  maxHeight?: number;
  showClearButton?: boolean;
  maxChipsToShow?: number;
  showLabelWithValue?: boolean;
  showRadioButtons?: boolean;
  showIcons?: boolean;
  showSideContent?: boolean;
  sideContentPosition?: "left" | "right" | "both";
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  labelPosition = "external",
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  value,
  onChange,
  message = "",
  variant = "",
  name,
  className = "",
  options = [],
  multiSelect = false,
  searchable = false,
  allowCustomInput = false,
  infoTip,
  maxHeight = 200,
  showClearButton = true,
  maxChipsToShow = 3,
  showLabelWithValue = false,
  showRadioButtons = true,
  showIcons = true,
  showSideContent = false,
  sideContentPosition = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [singleValue, setSingleValue] = useState<string>("");
  const [customInputValue, setCustomInputValue] = useState<string>("");
  const [showAllChips, setShowAllChips] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  // Get the effective placeholder - use provided placeholder or first option's label
  const getEffectivePlaceholder = () => {
    if (placeholder !== undefined) {
      return placeholder;
    }
    
    // If no placeholder is provided, use the first option's label as default
    if (options.length > 0) {
      return options[0].label;
    }
    
    // Fallback if no options are available
    return "Select an option";
  };

  const effectivePlaceholder = getEffectivePlaceholder();

  useEffect(() => {
    if (multiSelect) {
      setSelectedValues(Array.isArray(value) ? value : []);
    } else {
      const val = typeof value === 'string' ? value : '';
      setSingleValue(val);
      if (allowCustomInput) {
        setCustomInputValue(val);
      }
    }
  }, [value, multiSelect, allowCustomInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocused(false);
        setTouched(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showMessage = touched && variant && message;
  const hasValue = multiSelect ? selectedValues.length > 0 : (allowCustomInput ? customInputValue !== "" : singleValue !== "");

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.leftSideContent && option.leftSideContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (option.rightSideContent && option.rightSideContent.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getDisplayValue = () => {
    if (multiSelect) {
      if (selectedValues.length === 0) {
        return "";
      }
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || selectedValues[0];
      }
      return `${selectedValues.length} items selected`;
    } else {
      if (allowCustomInput) {
        return customInputValue;
      }
      if (!singleValue) {
        return "";
      }
      const option = options.find(opt => opt.value === singleValue);
      return option?.label || singleValue;
    }
  };

  // Fixed function to get display value with side content
  const getDisplayValueWithSideContent = () => {
    // For multiSelect, don't show side content in the main display
    if (multiSelect) {
      return getLeftInlineDisplayValue();
    }

    const selectedOption = options.find(opt => opt.value === singleValue);
    
    if (!selectedOption || !singleValue) {
      return getLeftInlineDisplayValue();
    }

    // Handle side content display
    if (showSideContent) {
      const leftContent = selectedOption.leftSideContent;
      const rightContent = selectedOption.rightSideContent;

      if (sideContentPosition === "both" && leftContent && rightContent) {
        return (
          <div className="side-content-display">
            <span className="left-content">{leftContent}</span>
            <span className="right-content">{rightContent}</span>
          </div>
        );
      } else if (sideContentPosition === "left" && leftContent) {
        return (
          <div className="side-content-display">
            <span className="left-content">{leftContent}</span>
          </div>
        );
      } else if (sideContentPosition === "right" && rightContent) {
        return (
          <div className="side-content-display">
            <span className="left-content">{selectedOption.label}</span>
            <span className="right-content">{rightContent}</span>
          </div>
        );
      }
    }

    return getLeftInlineDisplayValue();
  };

  // Original function for left-inline label
  const getLeftInlineDisplayValue = () => {
    const displayValue = getDisplayValue();
    if (labelPosition === "left-inline" && label) {
      return displayValue ? (
        <>
          <span className="label-part">{label}: </span>
          <span className="value-part">{displayValue}</span>
        </>
      ) : (
        <span className="label-part">{label}: </span>
      );
    }
    if (showLabelWithValue && label) {
      return displayValue ? (
        <>
          <span className="label-part">{label}: </span>
          <span className="value-part">{displayValue}</span>
        </>
      ) : (
        <span className="label-part">{label}: </span>
      );
    }
    return displayValue;
  };

  const handleToggle = () => {
    if (disabled || readOnly) return;
    setIsOpen(!isOpen);
    setFocused(!isOpen);
    if (!isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (readOnly) return;
    
    if (multiSelect) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(val => val !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSingleValue(optionValue);
      if (allowCustomInput) {
        const option = options.find(opt => opt.value === optionValue);
        setCustomInputValue(option?.label || optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
      setFocused(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (readOnly) return;
    
    if (multiSelect) {
      setSelectedValues([]);
      onChange?.([]);
    } else {
      setSingleValue("");
      if (allowCustomInput) {
        setCustomInputValue("");
      }
      onChange?.("");
    }
  };

  const handleRemoveChip = (valueToRemove: string) => {
    if (readOnly) return;
    
    const newValues = selectedValues.filter(val => val !== valueToRemove);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    
    const newValue = e.target.value;
    setCustomInputValue(newValue);
    onChange?.(newValue);
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) return;
    
    if (e.key === 'Enter' && customInputValue.trim()) {
      const existingOption = options.find(opt => 
        opt.value === customInputValue || opt.label === customInputValue
      );
      if (!existingOption) {
        setSingleValue(customInputValue);
        onChange?.(customInputValue);
      }
      setIsOpen(false);
      setFocused(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setFocused(false);
    }
  };

  const getInputState = () => {
    if (disabled) return "disabled";
    if (readOnly) return "readonly";
    if (variant === "error") return "error";
    if (focused || isOpen) return "focused";
    if (hasValue) return "activated";
    return "default";
  };

  const inputState = getInputState();
  const containerClass = [
    "dropdown-container",
    labelPosition ? `label-${labelPosition}` : "",
    variant,
    isOpen ? "open" : "",
    allowCustomInput ? "custom-input" : "",
    readOnly ? "readonly" : "",
    showLabelWithValue ? "label-with-value" : "",
    showSideContent ? "with-side-content" : "",
  ].filter(Boolean).join(" ");

  const dropdownClass = ["dropdown", inputState, className].join(" ");

  const renderInfoTip = () =>
    infoTip && (
      <span className="info-icon" aria-label="Info">
        <Info size={16} strokeWidth={1.5} />
        <div className="tooltip">{infoTip}</div>
      </span>
    );

  const handleShowMoreChips = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setShowAllChips(!showAllChips);
  };

  const renderChips = () => {
    if (!multiSelect || selectedValues.length === 0) return null;

    const reversedValues = [...selectedValues].reverse();
    
    const shouldShowMoreButton = reversedValues.length > maxChipsToShow;
    const chipsToShow = showAllChips ? reversedValues : reversedValues.slice(0, maxChipsToShow);
    const remainingCount = reversedValues.length - maxChipsToShow;

    return (
      <div className="chip-container">
        {chipsToShow.map((value) => {
          const option = options.find(opt => opt.value === value);
          return (
            <div className="chip" key={value}>
              {option?.label || value}
              {!readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveChip(value);
                  }}
                  aria-label={`Remove ${option?.label || value}`}
                >
                  &times;
                </button>
              )}
            </div>
          );
        })}
        {shouldShowMoreButton && (
          <div 
            className="chip more-chip clickable" 
            onClick={handleShowMoreChips}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleShowMoreChips(e);
              }
            }}
          >
            {showAllChips ? (
              <>Show less</>
            ) : (
              <>+{remainingCount} more</>
            )}
          </div>
        )}
      </div>
    );
  };

  // Check if we should show left-inline label functionality
  const shouldShowLeftInlineLabel = labelPosition === "left-inline" || showLabelWithValue;

  return (
    <div className={containerClass} ref={dropdownRef}>
      {label && labelPosition === "external" && (
        <label htmlFor={name} className="dropdown-label">
          {label}
          {required && <span className="required">*</span>}
          {renderInfoTip()}
        </label>
      )}

      <div className="dropdown-wrapper">
        {label && labelPosition === "internal" && !shouldShowLeftInlineLabel && (
          <label
            htmlFor={name}
            className={`floating-label ${focused || isOpen || hasValue ? "float" : ""}`}
          >
            {label}
            {required && <span className="required">*</span>}
            {renderInfoTip()}
          </label>
        )}

        {label && labelPosition === "middle" && !shouldShowLeftInlineLabel && (
          <label
            htmlFor={name}
            className={`middle-label ${focused || isOpen ? "focused" : ""}`}
          >
            {label}
            {required && <span className="required">*</span>}
            {renderInfoTip()}
          </label>
        )}

        <div className="dropdown-field-wrapper">
          <div
            className={dropdownClass}
            onClick={!allowCustomInput ? handleToggle : undefined}
            onKeyDown={!allowCustomInput ? handleKeyDown : undefined}
            tabIndex={disabled || allowCustomInput || readOnly ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-readonly={readOnly}
          >
            <div className="dropdown-content">
              {multiSelect && selectedValues.length > 0 && renderChips()}

              {allowCustomInput ? (
                <input
                  ref={customInputRef}
                  type="text"
                  value={shouldShowLeftInlineLabel ? 
                    (customInputValue ? `${label}: ${customInputValue}` : `${label}: `) : 
                    customInputValue
                  }
                  onChange={handleCustomInputChange}
                  onKeyDown={handleCustomInputKeyDown}
                  onFocus={() => !readOnly && setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={
                    shouldShowLeftInlineLabel 
                      ? (label ? `${label}: ` : effectivePlaceholder)
                      : (labelPosition === "internal" || labelPosition === "middle" ? "" : effectivePlaceholder)
                  }
                  disabled={disabled}
                  readOnly={readOnly}
                  className="custom-input-field"
                />
              ) : (
                <>
                  {!hasValue && !shouldShowLeftInlineLabel && (
                    <span className="dropdown-placeholder">
                      {labelPosition === "internal" || labelPosition === "middle" 
                        ? "" 
                        : effectivePlaceholder}
                    </span>
                  )}
                  {((!multiSelect && hasValue) || shouldShowLeftInlineLabel) && (
                    <span className="dropdown-value">
                      {showSideContent ? getDisplayValueWithSideContent() : getLeftInlineDisplayValue()}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="dropdown-icons">
              {showClearButton && hasValue && !disabled && !readOnly && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  <X size={14} />
                </button>
              )}
              {!readOnly && (
                <div className="chevron-icon" onClick={allowCustomInput ? handleToggle : undefined}>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              )}
            </div>
          </div>

          {variant === "error" && (
            <div className="dropdown__error-icon">
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

        {isOpen && !readOnly && (
          <div 
            className="dropdown-menu" 
            style={{ 
              maxHeight: `${maxHeight}px`,
              width: '100%'
            }}
          >
            {searchable && (
              <div className="dropdown-search">
                <Search size={14} className="search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            <div className="dropdown-options">
              {filteredOptions.length === 0 ? (
                <div className="no-options">No options available</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`dropdown-option ${
                      multiSelect
                        ? selectedValues.includes(option.value) ? "selected" : ""
                        : singleValue === option.value ? "selected" : ""
                    } ${option.disabled ? "disabled" : ""} ${
                      showSideContent ? "with-side-content" : ""
                    }`}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                    role="option"
                    aria-selected={
                      multiSelect
                        ? selectedValues.includes(option.value)
                        : singleValue === option.value
                    }
                  >
                    {multiSelect ? (
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          checked={selectedValues.includes(option.value)}
                          onChange={() => {}}
                          tabIndex={-1}
                          placeholder={`Select ${option.label}`}
                          title={`Select ${option.label}`}
                        />
                      </div>
                    ) : (
                      showRadioButtons && (
                        <div className="radio">
                          <input
                            type="radio"
                            name={`${name || 'dropdown'}-radio`}
                            checked={singleValue === option.value}
                            onChange={() => {}}
                            tabIndex={-1}
                            title={`Select ${option.label}`}
                          />
                        </div>
                      )
                    )}
                    
                    {showIcons && option.icon && (
                      <div className="option-icon">
                        {option.icon}
                      </div>
                    )}
                    
                    {showSideContent ? (
                      <div className="option-content-wrapper">
                        {(sideContentPosition === "left" || sideContentPosition === "both") && option.leftSideContent ? (
                          <span className="option-left-content">{option.leftSideContent}</span>
                        ) : (
                          <span className="option-label">{option.label}</span>
                        )}
                        
                        {(sideContentPosition === "right" || sideContentPosition === "both") && option.rightSideContent && (
                          <span className="option-right-content">{option.rightSideContent}</span>
                        )}
                      </div>
                    ) : (
                      <span className="option-label">{option.label}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {showMessage && <div className={`message ${variant}`}>{message}</div>}
    </div>
  );
};

export default Dropdown;