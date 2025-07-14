Component Overview:

This is a fully customizable and reusable **React + TypeScript** date input component supporting:
- Multiple date formats (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)
- Internal, external, or middle-aligned floating labels
- Built-in calendar picker with navigation
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
```

- `focused`: Tracks whether the input is currently focused
- `touched`: Tracks if the user has interacted with the field (triggers validation)
- `inputValue`: Local state for input value management
- `showDatePicker`: Controls calendar picker visibility
- `currentMonth`: Current month displayed in calendar
- `selectedDate`: Currently selected date object
- `inputError`: Local validation error messages

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
```
- Handles manual input validation and date parsing

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

---

### Structure Overview:

#### Container:
```tsx
<div className={containerClass}>
```
- Contains all elements. Dynamic class names depend on `labelPosition`, `variant`, and error state

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
      <Calendar size={16} />
    </div>
  )}
  
  {(variant === "error" || inputError) && (
    <div className="date-input__error-icon">...</div>
  )}
</div>
```
- Input field with calendar icon and error icon
- ReadOnly mode when `allowManualInput` is false

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
  </div>
)}
```
- Full calendar interface with month/year navigation
- Quick date selection buttons
- Calendar grid with day headers and date buttons

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

### Accessibility Notes:

- `htmlFor={name}` binds labels to input for screen readers
- Calendar navigation buttons include `title` attributes
- Disabled dates are properly marked with `disabled` attribute
- Error states are announced through ARIA attributes
- Keyboard navigation support for calendar interaction
- Focus management when opening/closing calendar
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
