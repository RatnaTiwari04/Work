Component Overview:

This is a fully customizable and reusable **React + TypeScript** date input component supporting:
- Multiple date formats (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)
- Date and time selection with 12/24 hour formats
- Internal, external, or middle-aligned floating labels
- Built-in calendar picker with navigation
- Integrated time picker with customizable minute steps
- Manual input and calendar selection modes
- Date validation and range restrictions
- Quick date selection options
- Weekend and today highlighting
- Disabled/enabled date configurations
- Optional validation states with messages (error, warning, etc.)
- Disabled, read-only, and required states

**Component Location:**
```
/components/DateInput/DateInput.tsx
```

---

### Props Table:

| Prop Name          | Type                                                | Description                                         |
|--------------------|-----------------------------------------------------|-----------------------------------------------------|
| `label`            | `string`                                            | Text label for the input                            |
| `labelPosition`    | `"internal" \| "external" \| "middle"`              | Position of the label                               |
| `placeholder`      | `string`                                            | Placeholder text (defaults to date format)          |
| `required`         | `boolean`                                           | Marks the field as required                         |
| `disabled`         | `boolean`                                           | Disables input field and calendar                   |
| `readOnly`         | `boolean`                                           | Renders the input as read-only                      |
| `value`            | `string`                                            | Current value of the input (controlled input)       |
| `onChange`         | `(value: string) => void`                           | Callback on value change                            |
| `message`          | `string`                                            | Optional helper or error message                    |
| `variant`          | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state of the field                           |
| `name`             | `string`                                            | HTML name and id for accessibility                  |
| `className`        | `string`                                            | Optional class for styling overrides                |
| `infoTip`          | `string`                                            | Tooltip message displayed with info icon            |
| `dateFormat`       | `"MM/DD/YYYY" \| "DD/MM/YYYY" \| "YYYY-MM-DD"`      | Date format for input and display                   |
| `minDate`          | `string`                                            | Minimum selectable date                             |
| `maxDate`          | `string`                                            | Maximum selectable date                             |
| `showCalendar`     | `boolean`                                           | Shows/hides calendar picker icon                    |
| `allowManualInput` | `boolean`                                           | Allows typing dates directly                        |
| `highlightToday`   | `boolean`                                           | Highlights today's date in calendar                 |
| `highlightWeekends`| `boolean`                                           | Highlights weekend dates in calendar                |
| `disabledDates`    | `string[]`                                          | Array of disabled date strings                      |
| `enabledDatesOnly` | `string[]`                                          | Array of only enabled date strings                  |
| `firstDayOfWeek`   | `0 \| 1`                                            | First day of week (0=Sunday, 1=Monday)              |
| `yearRange`        | `[number, number]`                                  | Min and max years for navigation                    |
| `quickDateOptions` | `{ label: string; value: string }[]`                | Quick date selection buttons                        |
| `showTime`         | `boolean`                                           | Enable time selection functionality                 |
| `timeFormat`       | `"12" \| "24"`                                      | Time format (12-hour with AM/PM or 24-hour)        |
| `minuteStep`       | `number`                                            | Step interval for minute selection (default: 1)    |
| `defaultTime`      | `string`                                            | Default time when no time is set (e.g., "12:00 AM") |

---

### Component Logic:

```ts
const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [inputValue, setInputValue] = useState(value);
const [showDatePicker, setShowDatePicker] = useState(false);
const [currentMonth, setCurrentMonth] = useState(new Date());
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [inputError, setInputError] = useState("");

// Time-related state
const [selectedHour, setSelectedHour] = useState(12);
const [selectedMinute, setSelectedMinute] = useState(0);
const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");
```

- `focused`: Tracks whether the input is currently focused
- `touched`: Tracks if the user has interacted with the field (triggers validation)
- `inputValue`: Local state for input value management
- `showDatePicker`: Controls calendar picker visibility
- `currentMonth`: Current month displayed in calendar
- `selectedDate`: Currently selected date object
- `inputError`: Local validation error messages
- `selectedHour`: Currently selected hour value
- `selectedMinute`: Currently selected minute value
- `selectedPeriod`: AM/PM selection for 12-hour format

#### Focus and Blur Handlers:
```ts
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
```
- Opens calendar on focus (if enabled) and validates input on blur

#### Input Change Handler:
```ts
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value;
  setInputValue(newValue);

  if (allowManualInput) {
    if (showTime) {
      const datePart = newValue.split(' ')[0];
      if (isValidDate(datePart)) {
        const date = parseDate(datePart);
        if (date && !isDateDisabled(date)) {
          setSelectedDate(date);
          setCurrentMonth(date);
          onChange?.(newValue);
        }
      }
    } else {
      if (isValidDate(newValue)) {
        const date = parseDate(newValue);
        if (date && !isDateDisabled(date)) {
          setSelectedDate(date);
          setCurrentMonth(date);
          onChange?.(newValue);
        }
      }
    }
  }
};
```
- Handles manual input validation and date parsing
- Updated to handle date-time input when `showTime` is enabled

#### Time-Related Functions:

```ts
const parseTimeString = (timeStr: string) => {
  const timeRegex12 = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
  const timeRegex24 = /^(\d{1,2}):(\d{2})$/;
  
  if (timeFormat === "12") {
    const match = timeStr.match(timeRegex12);
    if (match) {
      const hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      const period = match[3].toUpperCase() as "AM" | "PM";
      
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(period);
    }
  } else {
    const match = timeStr.match(timeRegex24);
    if (match) {
      const hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  }
};
```
- Parses time strings for both 12-hour and 24-hour formats

```ts
const parseDateTime = (dateTimeStr: string) => {
  const parts = dateTimeStr.split(' ');
  if (parts.length >= 1) {
    const datePart = parts[0];
    if (isValidDate(datePart)) {
      setSelectedDate(parseDate(datePart));
    }
    
    if (parts.length > 1 && showTime) {
      const timePart = parts.slice(1).join(' ');
      parseTimeString(timePart);
    }
  }
};
```
- Handles combined date-time string parsing

```ts
const formatTime = (): string => {
  if (timeFormat === "12") {
    const displayHour = selectedHour === 0 ? 12 : selectedHour;
    return `${displayHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
  } else {
    return `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
  }
};
```
- Formats time based on selected format (12/24 hour)

```ts
const formatDateTime = (date: Date): string => {
  const dateStr = formatDate(date);
  if (showTime) {
    return `${dateStr} ${formatTime()}`;
  }
  return dateStr;
};
```
- Combines date and time formatting when time is enabled

#### Time Selection Handlers:

```ts
const handleTimeChange = () => {
  if (selectedDate) {
    const formattedValue = formatDateTime(selectedDate);
    setInputValue(formattedValue);
    onChange?.(formattedValue);
  }
};

const handleHourChange = (hour: number) => {
  setSelectedHour(hour);
  setTimeout(handleTimeChange, 0);
};

const handleMinuteChange = (minute: number) => {
  setSelectedMinute(minute);
  setTimeout(handleTimeChange, 0);
};

const handlePeriodChange = (period: "AM" | "PM") => {
  setSelectedPeriod(period);
  setTimeout(handleTimeChange, 0);
};
```
- Handle time component changes and update the main input value

#### Date Validation:
```ts
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
```
- Validates date format and checks against restrictions

#### Enhanced Input Validation for Time:
```ts
const validateInput = () => {
  if (!inputValue) {
    setInputError("");
    return;
  }
  
  if (showTime) {
    // For date-time validation, extract date part
    const datePart = inputValue.split(' ')[0];
    if (!isValidDate(datePart)) {
      setInputError("Invalid date format");
      return;
    }
    const date = parseDate(datePart);
    if (date && isDateDisabled(date)) {
      setInputError("This date is not available");
      return;
    }
  } else {
    if (!isValidDate(inputValue)) {
      setInputError("Invalid date format");
      return;
    }
    const date = parseDate(inputValue);
    if (date && isDateDisabled(date)) {
      setInputError("This date is not available");
      return;
    }
  }
  setInputError("");
};
```
- Updated validation to handle date-time inputs

---

### Structure Overview:

#### Container:
```tsx
<div className={containerClass}>
```
- Contains all elements. Dynamic class names depend on `labelPosition`, `variant`, error state, and `showTime`

#### Labels:
```tsx
{label && labelPosition === "external" && <label>...}
{label && labelPosition === "internal" && <label className={...}>...}
{label && labelPosition === "middle" && <label className={...}>...}
```
- External: Above the input with info tip
- Internal: Floats inside the input, moves up when focused/filled
- Middle: Centered inside until focused, then moves up

#### Input Field Wrapper:
```tsx
<div className="input-field-wrapper">
  <input
    ref={dateInputRef}
    type="text"
    className={inputClass}
    value={inputValue}
    placeholder={getPlaceholder()}
    onChange={handleInputChange}
    onFocus={handleFocus}
    onBlur={handleBlur}
    required={required}
    disabled={disabled}
    readOnly={readOnly || !allowManualInput}
  />
  
  {showCalendar && (
    <div className="calendar-icon" onClick={handleCalendarClick}>
      {showTime ? <Clock size={16} /> : <Calendar size={16} />}
    </div>
  )}
  
  {(variant === "error" || inputError) && (
    <div className="date-input__error-icon">...</div>
  )}
</div>
```
- Input field with calendar icon and error icon
- Calendar icon changes to Clock icon when `showTime` is enabled
- ReadOnly mode when `allowManualInput` is false

#### Enhanced Placeholder Generation:
```ts
const getPlaceholder = () => {
  if (placeholder) return placeholder;
  if (showTime) {
    const timeFormat12 = timeFormat === "12" ? " hh:mm AM/PM" : " HH:mm";
    return dateFormat.toLowerCase() + timeFormat12;
  }
  return dateFormat.toLowerCase();
};
```
- Automatically generates placeholder text including time format when enabled

#### Calendar Picker:
```tsx
{showDatePicker && (
  <div ref={calendarRef} className="date-picker">
    <div className="date-picker-header">
      <div className="navigation">...</div>
    </div>
    
    {quickDateOptions.length > 0 && (
      <div className="quick-dates">...</div>
    )}
    
    <div className="calendar-grid">
      <div className="calendar-header">...</div>
      <div className="calendar-body">...</div>
    </div>

    {showTime && (
      <div className="time-picker">
        <div className="time-picker-header">
          <Clock size={16} />
          <span>Select Time</span>
        </div>
        <div className="time-controls">
          <div className="time-control">
            <label>Hour</label>
            <select
              value={selectedHour}
              onChange={(e) => handleHourChange(Number(e.target.value))}
              className="time-select"
            >
              {generateHours().map((hour) => (
                <option key={hour} value={hour}>
                  {timeFormat === "12" ? hour : hour.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          
          <div className="time-separator">:</div>
          
          <div className="time-control">
            <label>Minute</label>
            <select
              value={selectedMinute}
              onChange={(e) => handleMinuteChange(Number(e.target.value))}
              className="time-select"
            >
              {generateMinutes().map((minute) => (
                <option key={minute} value={minute}>
                  {minute.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          {timeFormat === "12" && (
            <>
              <div className="time-separator"></div>
              <div className="time-control">
                <label>Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => handlePeriodChange(e.target.value as "AM" | "PM")}
                  className="time-select"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </div>
)}
```
- Full calendar interface with month/year navigation
- Quick date selection buttons
- Calendar grid with day headers and date buttons
- Integrated time picker section with hour, minute, and period selects

#### Time Selection Generators:

```ts
const generateHours = () => {
  if (timeFormat === "12") {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  } else {
    return Array.from({ length: 24 }, (_, i) => i);
  }
};

const generateMinutes = () => {
  const minutes = [];
  for (let i = 0; i < 60; i += minuteStep) {
    minutes.push(i);
  }
  return minutes;
};
```
- Generate hour options based on time format (1-12 for 12-hour, 0-23 for 24-hour)
- Generate minute options based on `minuteStep` prop

#### Date Navigation:
```tsx
const navigateMonth = (direction: "prev" | "next") => {
  const newMonth = new Date(currentMonth);
  direction === "prev"
    ? newMonth.setMonth(newMonth.getMonth() - 1)
    : newMonth.setMonth(newMonth.getMonth() + 1);
  setCurrentMonth(newMonth);
};
```
- Handles month and year navigation in calendar

#### Calendar Day Generation:
```tsx
const generateCalendarDays = () => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // ... calendar day calculation logic
  return days;
};
```
- Generates calendar days including previous/next month overflow

#### Dynamic Day Classes:
```tsx
const getDayClasses = (date: Date): string => {
  const classes = ["calendar-day"];
  const isToday = date.toDateString() === today.toDateString();
  const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isDisabled = isDateDisabled(date);
  
  // Apply conditional classes...
  return classes.join(" ");
};
```
- Dynamic styling for calendar days based on state

#### Enhanced Date Selection:
```ts
const handleDateSelect = (date: Date) => {
  if (isDateDisabled(date)) return;
  
  setSelectedDate(date);
  setCurrentMonth(date);
  
  const formattedValue = showTime ? formatDateTime(date) : formatDate(date);
  setInputValue(formattedValue);
  onChange?.(formattedValue);
  
  if (!showTime) {
    setShowDatePicker(false);
  }
  setInputError("");
};
```
- Calendar stays open when time selection is enabled, closes immediately for date-only mode
- Uses appropriate formatting based on `showTime` setting

#### Message Display:
```tsx
{showMessage && (
  <div className={`message ${inputError ? "error" : variant}`}>
    {displayMessage}
  </div>
)}
```
- Shows validation messages or input errors after user interaction

---

### Date Format Support:

The component supports three date formats:
- **MM/DD/YYYY**: American format (default)
- **DD/MM/YYYY**: European format
- **YYYY-MM-DD**: ISO format

Format conversion is handled by `formatDate()` and `parseDate()` functions that work with the selected `dateFormat` prop.

When `showTime` is enabled, the output format becomes:
- **MM/DD/YYYY HH:mm AM/PM** (12-hour format)
- **MM/DD/YYYY HH:mm** (24-hour format)

---

### Time Selection Features:

#### Time Formats:
- **12-hour format**: Displays hours 1-12 with AM/PM selector
- **24-hour format**: Displays hours 00-23 without period selector

#### Minute Step Control:
```tsx
<DateInput
  showTime={true}
  minuteStep={15}  // Options: 1, 5, 10, 15, 30
  timeFormat="12"
/>
```
- Controls the increment of available minute options
- Common values: 1 (every minute), 5, 15, 30

#### Default Time:
```tsx
<DateInput
  showTime={true}
  defaultTime="09:30 AM"  // 12-hour format
  // or
  defaultTime="14:30"     // 24-hour format
/>
```
- Sets initial time when no time is specified
- Format must match the selected `timeFormat`

#### Time Picker Integration:
- Time picker appears below the calendar when `showTime={true}`
- Calendar remains open until user clicks outside or selects a different date
- Time changes immediately update the input value
- Validation includes both date and time portions

---

### Calendar Features:

#### Quick Date Selection:
```tsx
quickDateOptions={[
  { label: "Today", value: "12/25/2023" },
  { label: "Tomorrow", value: "12/26/2023" },
  { label: "Next Week", value: "01/01/2024" }
]}
```
Note: When using with `showTime={true}`, quick date options will use the currently selected time.

#### Date Restrictions:
- `minDate`/`maxDate`: Define selectable date range
- `disabledDates`: Array of specific disabled dates
- `enabledDatesOnly`: Whitelist of allowed dates

#### Visual Highlighting:
- `highlightToday`: Highlights current date
- `highlightWeekends`: Highlights Saturday/Sunday
- Selected date styling
- Current month vs other month styling

---

### Usage Examples:

#### Basic Date and Time Selection:
```tsx
<DateInput
  label="Appointment Date & Time"
  showTime={true}
  timeFormat="12"
  minuteStep={15}
  defaultTime="09:00 AM"
  onChange={(value) => console.log(value)} // "12/25/2023 09:00 AM"
/>
```

#### 24-Hour Format:
```tsx
<DateInput
  label="Schedule Time"
  showTime={true}
  timeFormat="24"
  minuteStep={30}
  defaultTime="14:00"
  dateFormat="DD/MM/YYYY"
  onChange={(value) => console.log(value)} // "25/12/2023 14:00"
/>
```

#### Date Only (Default Behavior):
```tsx
<DateInput
  label="Birth Date"
  showTime={false} // or omit this prop
  dateFormat="MM/DD/YYYY"
  onChange={(value) => console.log(value)} // "12/25/2023"
/>
```

---

### Accessibility Notes:

- `htmlFor={name}` binds labels to input for screen readers
- Calendar navigation buttons include `title` attributes
- Disabled dates are properly marked with `disabled` attribute
- Error states are announced through ARIA attributes
- Keyboard navigation support for calendar interaction
- Focus management when opening/closing calendar
- Time selects are properly labeled and accessible
- Time picker maintains focus within component when tabbing
- `readOnly` allows selection/copying but prevents editing

---

### Click Outside Handling:

```tsx
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
```
- Closes calendar when clicking outside the component
- Works for both date-only and date-time modes

---

### CSS Class Structure:

The component adds these classes for time-related styling:
- `.date-input-container.with-time`: Applied when `showTime={true}`
- `.time-picker`: Main time picker container
- `.time-picker-header`: Header with clock icon and title
- `.time-controls`: Container for time selection controls
- `.time-control`: Individual time input groups (hour, minute, period)
- `.time-select`: Select dropdowns for time values
- `.time-separator`: Visual separator between time components