import React, { useState, useEffect, useRef } from "react";
import { Calendar, Info, ChevronLeft, ChevronRight } from "lucide-react";
import "./DateInput.scss";

type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle";
type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

interface DateInputProps {
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
  infoTip?: string;
  dateFormat?: DateFormat;
  minDate?: string;
  maxDate?: string;
  showCalendar?: boolean;
  allowManualInput?: boolean;
  highlightToday?: boolean;
  highlightWeekends?: boolean;
  disabledDates?: string[];
  enabledDatesOnly?: string[];
  firstDayOfWeek?: 0 | 1;
  yearRange?: [number, number];
  quickDateOptions?: { label: string; value: string }[];
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  labelPosition = "external",
  placeholder,
  required = false,
  disabled = false,
  value = "",
  onChange,
  message = "",
  variant = "",
  name,
  className = "",
  readOnly = false,
  infoTip,
  dateFormat = "MM/DD/YYYY",
  minDate,
  maxDate,
  showCalendar = true,
  allowManualInput = true,
  highlightToday = true,
  highlightWeekends = false,
  disabledDates = [],
  enabledDatesOnly = [],
  quickDateOptions = [],
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputError, setInputError] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
    if (value && isValidDate(value)) {
      setSelectedDate(parseDate(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPlaceholder = () => placeholder || dateFormat.toLowerCase();

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    switch (dateFormat) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  const parseDate = (dateString: string): Date | null => {
    const separators = ["/", "-"];
    let parts: string[] = [];

    for (const sep of separators) {
      if (dateString.includes(sep)) {
        parts = dateString.split(sep);
        break;
      }
    }

    if (parts.length !== 3) return null;

    let day: number, month: number, year: number;

    switch (dateFormat) {
      case "DD/MM/YYYY":
        [day, month, year] = parts.map(Number);
        break;
      case "YYYY-MM-DD":
        [year, month, day] = parts.map(Number);
        break;
      default:
        [month, day, year] = parts.map(Number);
        break;
    }

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
      ? date
      : null;
  };

  const isValidDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = parseDate(dateString);
    return date !== null;
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = formatDate(date);
    if (minDate && date < parseDate(minDate)!) return true;
    if (maxDate && date > parseDate(maxDate)!) return true;
    if (disabledDates.includes(dateStr)) return true;
    if (enabledDatesOnly.length > 0 && !enabledDatesOnly.includes(dateStr)) return true;
    return false;
  };

  const handleFocus = () => {
    setFocused(true);
    if (showCalendar && !readOnly && !disabled) {
      setShowDatePicker(true);
    }
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    validateInput();
  };

  const validateInput = () => {
    if (!inputValue) {
      setInputError("");
      return;
    }
    if (!isValidDate(inputValue)) {
      setInputError("Invalid date format");
      return;
    }
    const date = parseDate(inputValue);
    if (date && isDateDisabled(date)) {
      setInputError("This date is not available");
      return;
    }
    setInputError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (allowManualInput) {
      if (isValidDate(newValue)) {
        const date = parseDate(newValue);
        if (date && !isDateDisabled(date)) {
          setSelectedDate(date);
          setCurrentMonth(date);
          onChange?.(newValue);
        }
      }
    }
  };

  const handleCalendarClick = () => {
    if (!disabled && !readOnly && showCalendar) {
      setShowDatePicker(!showDatePicker);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    const formattedDate = formatDate(date);
    setSelectedDate(date);
    setCurrentMonth(date);
    setInputValue(formattedDate);
    onChange?.(formattedDate);
    setShowDatePicker(false);
    setInputError("");
  };

  const handleQuickDateSelect = (dateValue: string) => {
    if (isValidDate(dateValue)) {
      const date = parseDate(dateValue);
      if (date && !isDateDisabled(date)) {
        handleDateSelect(date);
      }
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    direction === "prev"
      ? newMonth.setMonth(newMonth.getMonth() - 1)
      : newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const navigateYear = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    direction === "prev"
      ? newMonth.setFullYear(newMonth.getFullYear() - 1)
      : newMonth.setFullYear(newMonth.getFullYear() + 1);
    setCurrentMonth(newMonth);
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);

    const firstDayOfWeek = firstDay.getDay();
    const adjustedFirstDay = (firstDayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - adjustedFirstDay);

    const days = [];
    const current = new Date(startDate);

    while (current <= endDate || current.getDay() !== firstDayOfWeek) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getDayClasses = (date: Date): string => {
    const classes = ["calendar-day"];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isDisabled = isDateDisabled(date);

    if (!isCurrentMonth) classes.push("other-month");
    if (isToday && highlightToday) classes.push("today");
    if (isSelected) classes.push("selected");
    if (isWeekend && highlightWeekends) classes.push("weekend");
    if (isDisabled) classes.push("disabled");

    return classes.join(" ");
  };

  const getInputState = () => {
    if (disabled) return "disabled";
    if (variant === "error" || inputError) return "error";
    if (focused) return "focused";
    if (inputValue) return "activated";
    return "default";
  };

  const inputState = getInputState();
  const inputClass = ["date-input", inputState, className].join(" ");

  const containerClass = [
    "date-input-container",
    labelPosition ? `label-${labelPosition}` : "",
    variant,
    inputError ? "error" : "",
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

  const showMessage = (touched && variant && message) || inputError;
  const displayMessage = inputError || message;

  return (
    <div className={containerClass}>
      {label && labelPosition === "external" && (
        <label htmlFor={name} className="date-input-label">
          {label}
          {required && <span className="required">*</span>}
          {renderInfoTip()}
        </label>
      )}

      <div className="input-wrapper">
        {label && labelPosition === "internal" && (
          <label htmlFor={name} className={`floating-label ${focused || inputValue ? "float" : ""}`}>
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
            ref={dateInputRef}
            type="text"
            id={name}
            name={name}
            className={inputClass}
            value={inputValue}
            placeholder={
              labelPosition === "internal" || labelPosition === "middle"
                ? ""
                : getPlaceholder()
            }
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            readOnly={readOnly || !allowManualInput}
          />

          {showCalendar && (
            <div className="calendar-icon" onClick={handleCalendarClick}>
              <Calendar size={16} />
            </div>
          )}

          {(variant === "error" || inputError) && (
            <div className="date-input__error-icon">
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

        {showDatePicker && (
          <div ref={calendarRef} className="date-picker">
            <div className="date-picker-header">
              <div className="navigation">
                <button onClick={() => navigateYear("prev")} className="nav-button" title="Previous Year">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => navigateMonth("prev")} className="nav-button" title="Previous Month">
                  <ChevronLeft size={12} />
                </button>
                <div className="month-year">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <button onClick={() => navigateMonth("next")} className="nav-button" title="Next Month">
                  <ChevronRight size={12} />
                </button>
                <button onClick={() => navigateYear("next")} className="nav-button" title="Next Year">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {quickDateOptions.length > 0 && (
              <div className="quick-dates">
                {quickDateOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className="quick-date-button"
                    onClick={() => handleQuickDateSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            <div className="calendar-grid">
              <div className="calendar-header">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={index} className="day-header">
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar-body">
                {generateCalendarDays().map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={getDayClasses(date)}
                    onClick={() => handleDateSelect(date)}
                    disabled={isDateDisabled(date)}
                  >
                    {date.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showMessage && (
        <div className={`message ${inputError ? "error" : variant}`}>
          {displayMessage}
        </div>
      )}
    </div>
  );
};

export default DateInput;
