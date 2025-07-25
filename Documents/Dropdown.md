# Dropdown Component

## Component Overview
This is a fully customizable and reusable **React + TypeScript** dropdown component supporting:
- Single and multi-select functionality
- Internal, external, middle-aligned, or left-inline floating labels
- Optional validation states with messages (error, warning, info, success)
- Searchable options with filtering
- Custom input support for adding new values
- Disabled, required, and read-only states
- Chip-based display for multi-select with expansion/collapse
- Clear button functionality
- Customizable maximum height and chip display limits

**Component Location:**
```
/components/Dropdown/Dropdown.tsx
```

---

## Props Table

| Prop Name          | Type                                                   | Description                                         | Default|
|--------------------|--------------------------------------------------------|---------------------------------------------------- |--------|
| `label`            | `string`                                               | Text label for the dropdown                         | -       |
| `labelPosition`    | `"internal" \| "external" \| "middle" \| "left-inline"`| Position of the label                               | `"external"` |
| `placeholder`      | `string`                                               | Placeholder text                                    | `"Select an option"` |
| `required`         | `boolean`                                              | Marks the field as required                         | `false` |
| `disabled`         | `boolean`                                              | Disables dropdown field                             | `false` |
| `readOnly`         | `boolean`                                              | Makes dropdown read-only (prevents interaction)     | `false` |
| `value`            | `string \| string[]`                                   | Current value(s) of the dropdown (controlled)       | -       |
| `onChange`         | `(value: string \| string[]) => void`                  | Callback on value change                            | -       |
| `message`          | `string`                                               | Optional helper or error message                    | `""` |
| `variant`          | `"error" \| "warning" \| "info" \| "success" \| ""`    | Visual state of the field                           | `""` |
| `name`             | `string`                                               | HTML name and id for accessibility                  | -       |
| `className`        | `string`                                               | Optional class for styling overrides                | `""` |
| `options`          | `DropdownOption[]`                                     | Array of selectable options                         | `[]` |
| `multiSelect`      | `boolean`                                              | Enables multi-select mode                           | `false` |
| `searchable`       | `boolean`                                              | Enables search functionality                        | `false` |
| `allowCustomInput` | `boolean`                                              | Allows custom input values                          | `false` |
| `infoTip`          | `string`                                               | Tooltip message for additional information          | -       |
| `maxHeight`        | `number`                                               | Maximum height of dropdown menu                     | `200` |
| `showClearButton`  | `boolean`                                              | Shows clear button when value exists                | `true` |
| `maxChipsToShow`   | `number`                                               | Maximum chips to display before "more"              | `3` |
| `showLabelWithValue` | `boolean`                                            | Shows label with value (backward compatibility)     |`false` |

---

## Interface Definitions

### DropdownOption
```ts
interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Type Definitions
```ts
type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle" | "left-inline";
```

---

## Component Logic

### State Management
```ts
const [isOpen, setIsOpen] = useState(false);
const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [selectedValues, setSelectedValues] = useState<string[]>([]);
const [singleValue, setSingleValue] = useState<string>("");
const [customInputValue, setCustomInputValue] = useState<string>("");
const [showAllChips, setShowAllChips] = useState(false);
```

**State Variables:**
- `isOpen`: Controls dropdown menu visibility
- `focused`: Tracks focus state for label styling
- `touched`: Tracks user interaction for validation message display
- `searchTerm`: Stores current search query for filtering
- `selectedValues`: Array of selected values for multi-select mode
- `singleValue`: Single selected value for single-select mode
- `customInputValue`: Custom input text when `allowCustomInput` is enabled
- `showAllChips`: Controls chip expansion/collapse in multi-select

### Key Handlers

#### Toggle Handler
```ts
const handleToggle = () => {
  if (disabled || readOnly) return;
  setIsOpen(!isOpen);
  setFocused(!isOpen);
  if (!isOpen && searchable) {
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }
};
```

#### Option Selection
```ts
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
```

#### Clear Functionality
```ts
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
```

---

## Structure Overview

### Container
```tsx
<div className={containerClass} ref={dropdownRef}>
```
Contains all elements with dynamic classes based on `labelPosition`, `variant`, `readOnly`, and state

### Labels

#### External Label
```tsx
{label && labelPosition === "external" && (
  <label htmlFor={name} className="dropdown-label">
    {label}
    {required && <span className="required">*</span>}
    {renderInfoTip()}
  </label>
)}
```

#### Internal Label (Floating)
```tsx
{label && labelPosition === "internal" && (
  <label
    htmlFor={name}
    className={`floating-label ${focused || isOpen || hasValue ? "float" : ""}`}
  >
    {label}
    {required && <span className="required">*</span>}
    {renderInfoTip()}
  </label>
)}
```

#### Middle Label
```tsx
{label && labelPosition === "middle" && (
  <label
    htmlFor={name}
    className={`middle-label ${focused || isOpen ? "focused" : ""}`}
  >
    {label}
    {required && <span className="required">*</span>}
    {renderInfoTip()}
  </label>
)}
```

#### Left-Inline Label
The `left-inline` position displays the label inline with the selected value:
- Format: `"Label: Selected Value"`
- Integrates with `showLabelWithValue` for backward compatibility
- Works with both custom input and standard selection modes

### Dropdown Field
```tsx
<div className={dropdownClass} onClick={handleToggle}>
  <div className="dropdown-content">
    {allowCustomInput ? (
      <input ref={customInputRef} ... />
    ) : (
      <>
        <span className="dropdown-placeholder">...</span>
        <span className="dropdown-value">...</span>
      </>
    )}
  </div>
  <div className="dropdown-icons">...</div>
</div>
```
- Displays current value(s) or placeholder
- Includes clear button and chevron icons
- Supports custom input mode
- Respects `readOnly` state

### Dropdown Menu
```tsx
{isOpen && !readOnly && (
  <div className="dropdown-menu" style={{ maxHeight: `${maxHeight}px` }}>
    {searchable && <div className="dropdown-search">...</div>}
    <div className="dropdown-options">...</div>
  </div>
)}
```
- Conditionally rendered based on `isOpen` state and `readOnly` prop
- Includes search input when `searchable` is true
- Contains filtered options list

### Multi-Select Chips
```tsx
const renderChips = () => {
  const reversedValues = [...selectedValues].reverse();
  const shouldShowMoreButton = reversedValues.length > maxChipsToShow;
  const chipsToShow = showAllChips ? reversedValues : reversedValues.slice(0, maxChipsToShow);
  // ...
};
```
- Displays selected values as removable chips in reverse order (most recent first)
- Supports expand/collapse for large selections
- Includes remove functionality per chip
- Respects `readOnly` state for chip removal

### Validation Icon
```tsx
{variant === "error" && (
  <div className="dropdown__error-icon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
      <path d="M8 4v4M8 10h0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  </div>
)}
```

### Message Display
```tsx
{showMessage && <div className={`message ${variant}`}>{message}</div>}
```
Displays contextual messages after user interaction

---

## Key Features

### Label Positioning Options

1. **External**: Label appears above the dropdown field
2. **Internal**: Floating label that moves up when focused or has value
3. **Middle**: Label centered in field, moves up when focused
4. **Left-Inline**: Label appears inline with the selected value (`"Label: Value"`)

### Search Functionality
- Filters options by both label and value
- Auto-focuses search input when dropdown opens
- Real-time filtering as user types
- Case-insensitive matching

### Custom Input Support
- Allows users to enter custom values
- Supports Enter key to add custom options
- Integrates with existing option selection
- Works with left-inline labels

### Multi-Select Capabilities
- Checkbox-style selection
- Chip-based value display with reverse order (newest first)
- Expandable/collapsible chip container
- Individual chip removal
- Smart display limit with "show more/less" functionality

### State Management
- **Disabled**: Completely prevents interaction
- **Read-Only**: Prevents interaction while maintaining visual appearance
- **Required**: Shows asterisk indicator and supports validation
- **Validation States**: Error, warning, info, success with contextual styling

### Keyboard Navigation
- Enter/Space to toggle dropdown
- Escape to close dropdown
- Full keyboard accessibility support
- Tab navigation through chips and controls

---

## Accessibility Features

- `htmlFor={name}` binds labels to the dropdown for screen readers
- `role="combobox"` and `aria-expanded` for proper ARIA support
- `role="option"` and `aria-selected` for option accessibility
- `aria-readonly` attribute for read-only state
- Clear button includes `aria-label` for screen reader users
- Keyboard navigation support throughout the component
- Focus management for search input and custom input modes
- Proper color contrast for validation states
- Semantic HTML structure with appropriate roles

---

## Usage Examples

### Basic Single Select
```tsx
<Dropdown
  label="Country"
  name="country"
  options={countryOptions}
  value={selectedCountry}
  onChange={setSelectedCountry}
/>
```

### Multi-Select with Search
```tsx
<Dropdown
  label="Skills"
  name="skills"
  options={skillOptions}
  multiSelect
  searchable
  value={selectedSkills}
  onChange={setSelectedSkills}
  maxChipsToShow={2}
/>
```

### Custom Input with Left-Inline Label
```tsx
<Dropdown
  label="Custom Option"
  labelPosition="left-inline"
  name="custom"
  options={baseOptions}
  allowCustomInput
  value={customValue}
  onChange={setCustomValue}
/>
```

### Read-Only State
```tsx
<Dropdown
  label="Status"
  name="status"
  options={statusOptions}
  value={currentStatus}
  readOnly
/>
```

### With Validation
```tsx
<Dropdown
  label="Required Field"
  name="required"
  options={options}
  required
  variant="error"
  message="This field is required"
  value={value}
  onChange={setValue}
/>
```

---

## Styling

The component uses SCSS modules with the following main classes:
- `.dropdown-container` - Main container with label position variants
- `.dropdown` - Input field with state classes
- `.dropdown-menu` - Dropdown options container
- `.chip-container` - Multi-select chips wrapper
- `.message` - Validation message with variant styling

State-specific classes are automatically applied based on component state and props.