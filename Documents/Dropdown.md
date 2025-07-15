Component Overview:

This is a fully customizable and reusable **React + TypeScript** dropdown component supporting:
- Single and multi-select functionality
- Internal, external, or middle-aligned floating labels
- Optional validation states with messages (error, warning, info, success)
- Searchable options with filtering
- Custom input support for adding new values
- Disabled and required states
- Chip-based display for multi-select with expansion/collapse
- Clear button functionality
- Customizable maximum height and chip display limits

**Component Location:**
```
/components/Dropdown/Dropdown.tsx
```

---

### Props Table:

| Prop Name          | Type                                                | Description                                         |
|--------------------|-----------------------------------------------------|-----------------------------------------------------|
| `label`            | `string`                                            | Text label for the dropdown                         |
| `labelPosition`    | `"internal" \| "external" \| "middle"`              | Position of the label                               |
| `placeholder`      | `string`                                            | Placeholder text (default: "Select an option")      |
| `required`         | `boolean`                                           | Marks the field as required                         |
| `disabled`         | `boolean`                                           | Disables dropdown field                             |
| `value`            | `string \| string[]`                                | Current value(s) of the dropdown (controlled)       |
| `onChange`         | `(value: string \| string[]) => void`               | Callback on value change                            |
| `message`          | `string`                                            | Optional helper or error message                    |
| `variant`          | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state of the field                           |
| `name`             | `string`                                            | HTML name and id for accessibility                  |
| `className`        | `string`                                            | Optional class for styling overrides                |
| `options`          | `DropdownOption[]`                                  | Array of selectable options                         |
| `multiSelect`      | `boolean`                                           | Enables multi-select mode                           |
| `searchable`       | `boolean`                                           | Enables search functionality                        |
| `allowCustomInput` | `boolean`                                           | Allows custom input values                          |
| `infoTip`          | `string`                                            | Tooltip message for additional information          |
| `maxHeight`        | `number`                                            | Maximum height of dropdown menu (default: 200)      |
| `showClearButton`  | `boolean`                                           | Shows clear button when value exists                |
| `maxChipsToShow`   | `number`                                            | Maximum chips to display before "more" (default: 3) |

---

### Interface Definitions:

#### DropdownOption:
```ts
interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

#### Variant Types:
```ts
type Variant = "error" | "warning" | "info" | "success" | "";
type LabelPosition = "internal" | "external" | "middle";
```

---

### Component Logic:

#### State Management:
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

- `isOpen`: Controls dropdown menu visibility
- `focused`: Tracks focus state for label styling
- `touched`: Tracks user interaction for validation message display
- `searchTerm`: Stores current search query for filtering
- `selectedValues`: Array of selected values for multi-select mode
- `singleValue`: Single selected value for single-select mode
- `customInputValue`: Custom input text when `allowCustomInput` is enabled
- `showAllChips`: Controls chip expansion/collapse in multi-select

#### Key Handlers:

##### Toggle Handler:
```ts
const handleToggle = () => {
  if (disabled) return;
  setIsOpen(!isOpen);
  setFocused(!isOpen);
  if (!isOpen && searchable) {
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }
};
```

##### Option Selection:
```ts
const handleOptionClick = (optionValue: string) => {
  if (multiSelect) {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(val => val !== optionValue)
      : [...selectedValues, optionValue];
    setSelectedValues(newValues);
    onChange?.(newValues);
  } else {
    setSingleValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  }
};
```

##### Clear Functionality:
```ts
const handleClear = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (multiSelect) {
    setSelectedValues([]);
    onChange?.([]);
  } else {
    setSingleValue("");
    onChange?.("");
  }
};
```

---

### Structure Overview:

#### Container:
```tsx
<div className={containerClass} ref={dropdownRef}>
```
- Contains all elements with dynamic classes based on `labelPosition`, `variant`, and state

#### Labels:
```tsx
{label && labelPosition === "external" && <label>...}
{label && labelPosition === "internal" && <label className={...}>...}
{label && labelPosition === "middle" && <label className={...}>...}
```
- External: Above the dropdown
- Internal: Floats inside the dropdown field
- Middle: Centered inside until focused/opened

#### Dropdown Field:
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

#### Dropdown Menu:
```tsx
{isOpen && (
  <div className="dropdown-menu" style={{ maxHeight: `${maxHeight}px` }}>
    {searchable && <div className="dropdown-search">...</div>}
    <div className="dropdown-options">...</div>
  </div>
)}
```
- Conditionally rendered based on `isOpen` state
- Includes search input when `searchable` is true
- Contains filtered options list

#### Multi-Select Chips:
```tsx
const renderChips = () => {
  // Handles chip display with expansion/collapse
  const shouldShowMoreButton = selectedValues.length > maxChipsToShow;
  const chipsToShow = showAllChips ? selectedValues : selectedValues.slice(0, maxChipsToShow);
  // ...
};
```
- Displays selected values as removable chips
- Supports expand/collapse for large selections
- Includes remove functionality per chip

#### Validation Icon:
```tsx
{variant === "error" && (
  <div className="dropdown__error-icon">...</div>
)}
```
- Shows SVG error icon when validation fails

#### Message Display:
```tsx
{showMessage && <div className={`message ${variant}`}>{message}</div>}
```
- Displays contextual messages after user interaction

---

### Key Features:

#### Search Functionality:
- Filters options by both label and value
- Auto-focuses search input when dropdown opens
- Real-time filtering as user types

#### Custom Input Support:
- Allows users to enter custom values
- Supports Enter key to add custom options
- Integrates with existing option selection

#### Multi-Select Capabilities:
- Checkbox-style selection
- Chip-based value display
- Expandable/collapsible chip container
- Individual chip removal

#### Keyboard Navigation:
- Enter/Space to toggle dropdown
- Escape to close dropdown
- Full keyboard accessibility support

---

### Accessibility Notes:
- `htmlFor={name}` binds labels to the dropdown for screen readers
- `role="combobox"` and `aria-expanded` for proper ARIA support
- `role="option"` and `aria-selected` for option accessibility
- Clear button includes `aria-label` for screen reader users
- Keyboard navigation support throughout the component
- Focus management for search input and custom input modes