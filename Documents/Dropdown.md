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
- **Icons and side content support for enhanced option display**
- **Radio buttons and checkboxes for visual selection indicators**
- **Automatic placeholder fallback to first option when none provided**

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
| `placeholder`      | `string`                                               | Placeholder text (if not provided, uses first option's label) | Auto-generated from first option |
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
| `showRadioButtons` | `boolean`                                              | Shows radio buttons for single select options       | `true` |
| `showIcons`        | `boolean`                                              | Shows icons in options when available               | `true` |
| `showSideContent`  | `boolean`                                              | Enables side content display in options             | `false` |
| `sideContentPosition` | `"left" \| "right" \| "both"`                       | Position of side content in options                 | `"right"` |

---

## Interface Definitions

### DropdownOption
```ts
interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;           // New: Icon support
  leftSideContent?: string;         // New: Left side content
  rightSideContent?: string;        // New: Right side content
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

### Placeholder Logic (New Feature)
```ts
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
```

**Automatic Placeholder Behavior:**
- If `placeholder` prop is provided (including empty string), uses that value
- If `placeholder` is undefined and options exist, uses first option's label
- Falls back to "Select an option" if no options are available

### Enhanced Search Functionality
The search now filters across multiple fields:
```ts
const filteredOptions = options.filter(option =>
  option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
  option.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (option.leftSideContent && option.leftSideContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (option.rightSideContent && option.rightSideContent.toLowerCase().includes(searchTerm.toLowerCase()))
);
```

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
Contains all elements with dynamic classes based on `labelPosition`, `variant`, `readOnly`, `showSideContent`, and state

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
- Displays current value(s) or automatic placeholder
- Includes clear button and chevron icons
- Supports custom input mode
- Respects `readOnly` state
- Shows side content when enabled

### Enhanced Option Display (New Feature)
```tsx
<div className="dropdown-option">
  {/* Radio button or checkbox */}
  {multiSelect ? (
    <div className="checkbox">
      <input type="checkbox" checked={isSelected} />
    </div>
  ) : (
    showRadioButtons && (
      <div className="radio">
        <input type="radio" checked={isSelected} />
      </div>
    )
  )}
  
  {/* Option icon */}
  {showIcons && option.icon && (
    <div className="option-icon">
      {option.icon}
    </div>
  )}
  
  {/* Side content or label */}
  {showSideContent ? (
    <div className="option-content-wrapper">
      {sideContentPosition === "left" && option.leftSideContent && (
        <span className="option-left-content">{option.leftSideContent}</span>
      )}
      <span className="option-label">{option.label}</span>
      {sideContentPosition === "right" && option.rightSideContent && (
        <span className="option-right-content">{option.rightSideContent}</span>
      )}
    </div>
  ) : (
    <span className="option-label">{option.label}</span>
  )}
</div>
```

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
- Contains filtered options list with enhanced display options

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

### Automatic Placeholder (New Feature)
- **Smart Fallback**: When no placeholder is provided, automatically uses the first option's label
- **Explicit Control**: Pass `placeholder=""` for empty placeholder or any string for custom placeholder
- **Consistent Behavior**: Works across all label positions and input modes

### Enhanced Option Display (New Features)

#### Icons Support
- Display custom React icons alongside option labels
- Controlled via `showIcons` prop (default: true)
- Icons integrate seamlessly with all other features

#### Side Content Support
- **Left Side Content**: Additional content on the left side of options
- **Right Side Content**: Additional context on the right side of options
- **Both Sides**: Support for content on both left and right
- **Searchable**: Side content is included in search filtering
- **Position Control**: `sideContentPosition` prop controls layout

#### Visual Selection Indicators
- **Radio Buttons**: For single-select options (controlled via `showRadioButtons`)
- **Checkboxes**: Automatically shown for multi-select options
- **Clean Integration**: Works with icons and side content

### Search Functionality
- Filters options by label, value, and both left and right side content
- Auto-focuses search input when dropdown opens
- Real-time filtering as user types
- Case-insensitive matching across all searchable fields

### Custom Input Support
- Allows users to enter custom values
- Supports Enter key to add custom options
- Integrates with existing option selection
- Works with left-inline labels and automatic placeholder

### Multi-Select Capabilities
- Checkbox-style selection with visual indicators
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
- Radio buttons and checkboxes include proper titles and labels

---

## Usage Examples

### Basic Single Select with Auto Placeholder
```tsx
// Will automatically use "United States" as placeholder (first option)
<Dropdown
  label="Country"
  name="country"
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" }
  ]}
  value={selectedCountry}
  onChange={setSelectedCountry}
/>
```

### Multi-Select with Icons
```tsx
<Dropdown
  label="File Type"
  name="fileType"
  options={[
    { value: "text", label: "Text", icon: <FileText size={16} /> },
    { value: "image", label: "Image", icon: <Image size={16} /> },
    { value: "video", label: "Video", icon: <Video size={16} /> }
  ]}
  multiSelect
  showIcons={true}
  showRadioButtons={true}
  value={selectedTypes}
  onChange={setSelectedTypes}
/>
```

### Side Content Support
```tsx
<Dropdown
  label="User Selection"
  name="users"
  options={[
    {
      value: "john_doe",
      label: "John Doe",
      rightSideContent: "Admin"
    },
    {
      value: "jane_smith", 
      label: "Jane Smith",
      rightSideContent: "Manager"
    }
  ]}
  showSideContent={true}
  sideContentPosition="right"
  searchable
  value={selectedUser}
  onChange={setSelectedUser}
/>
```

### Both Side Content
```tsx
<Dropdown
  label="Transaction IDs"
  name="transactions"
  options={[
    {
      value: "911110002",
      label: "911110002",
      leftSideContent: "911110002",
      rightSideContent: "Operator X | Circle North | shared"
    }
  ]}
  showSideContent={true}
  sideContentPosition="both"
  multiSelect
  searchable
  value={selectedTransactions}
  onChange={setSelectedTransactions}
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
  // No placeholder provided - will use first option's label
/>
```

### Explicit Empty Placeholder
```tsx
<Dropdown
  label="Country"
  name="country"
  placeholder=""  // Explicitly empty placeholder
  options={countryOptions}
  value={selectedCountry}
  onChange={setSelectedCountry}
/>
```

### Read-Only State with Side Content
```tsx
<Dropdown
  label="Status"
  name="status"
  options={[
    {
      value: "active",
      label: "Active",
      icon: <CheckCircle size={16} />,
      rightSideContent: "Online"
    }
  ]}
  value={currentStatus}
  showSideContent={true}
  showIcons={true}
  readOnly
/>
```

### With Validation and Enhanced Features
```tsx
<Dropdown
  label="Required Field"
  name="required"
  options={optionsWithIcons}
  required
  variant="error"
  message="This field is required"
  showIcons={true}
  showRadioButtons={true}
  searchable
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
- `.option-icon` - Icon styling in options (new)
- `.option-left-content` - Left side content styling (new)
- `.option-right-content` - Right side content styling (new)
- `.side-content-display` - Main field side content display (new)
- `.with-side-content` - Container modifier for side content (new)

State-specific classes are automatically applied based on component state and props.

### New CSS Classes for Enhanced Features
- `.option-content-wrapper` - Wrapper for options with side content
- `.radio` - Radio button container styling
- `.checkbox` - Checkbox container styling
- `.option-icon` - Icon display in options
- `.side-content-display` - Side content in main field display

The component maintains full backward compatibility while adding these enhanced display options.