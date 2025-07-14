Component Overview:

This is a fully customizable and reusable **React + TypeScript** checkbox component supporting:
- Single and multiple checkbox options
- Required, disabled, and read-only states
- Optional validation states with messages (error, warning, info, success)
- Inline and vertical layout options with auto-wrap functionality
- Info tooltips for additional context
- Accessibility features with proper labeling

**Component Location:**
```
/components/Checkbox.tsx
```

---

### Props Table:

| Prop Name    | Type                                                | Description                                         |
|--------------|-----------------------------------------------------|-----------------------------------------------------|
| `label`      | `string`                                            | Text label for the checkbox group                   |
| `required`   | `boolean`                                           | Marks the field as required                         |
| `disabled`   | `boolean`                                           | Disables entire checkbox group                      |
| `readOnly`   | `boolean`                                           | Renders the checkbox group as read-only             |
| `value`      | `string[]`                                          | Array of currently selected values (controlled)     |
| `onChange`   | `(value: string[]) => void`                         | Callback on value change                            |
| `options`    | `CheckboxOption[]`                                  | Array of checkbox options to display                |
| `message`    | `string`                                            | Optional helper or error message                    |
| `variant`    | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state of the field                           |
| `name`       | `string`                                            | HTML name for the checkbox group (required)         |
| `className`  | `string`                                            | Optional class for styling overrides                |
| `infoTip`    | `string`                                            | Tooltip text displayed next to the label            |
| `inline`     | `boolean`                                           | Renders options horizontally instead of vertically  |

---

### CheckboxOption Interface:

```ts
interface CheckboxOption {
  value: string;      // The value returned when selected
  label: string;      // Display text for the option
  disabled?: boolean; // Individual option can be disabled
}
```

---

### Component Logic:

```ts
const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [selectedValues, setSelectedValues] = useState<string[]>(value);
```
- `focused`: Tracks whether any checkbox option is currently focused.
- `touched`: Tracks if the user has interacted with the field (used to trigger validation messages).
- `selectedValues`: Internal state synchronized with the `value` prop.

#### Focus and Blur Handlers:
```ts
const handleFocus = () => setFocused(true);
const handleBlur = () => {
  setFocused(false);
  setTouched(true);
};
```
- Activates focused styling and triggers validation message rendering on blur.

#### Selection Handler:
```ts
const handleChange = (optionValue: string) => {
  if (disabled || readOnly) return;
  
  let newValues: string[];
  if (selectedValues.includes(optionValue)) {
    newValues = selectedValues.filter(val => val !== optionValue);
  } else {
    newValues = [...selectedValues, optionValue];
  }
  
  setSelectedValues(newValues);
  setTouched(true);
  onChange?.(newValues);
};
```
- Prevents changes when disabled or read-only, toggles selection state, and triggers parent `onChange`.

#### State Management:
```ts
const getCheckboxState = () => {
  if (disabled) return "disabled";
  if (variant === "error") return "error";
  if (focused) return "focused";
  if (selectedValues.length > 0) return "activated";
  return "default";
};
```
- Determines the visual state for styling purposes based on selection count.

#### Auto-wrap Logic:
```ts
const shouldAutoWrap = !inline && options.length > 3;
```
- Automatically wraps checkbox options when there are more than 3 options in vertical layout.

---

### Structure Overview:

#### Container:
```tsx
<div className={containerClass}>
```
- Contains all elements. Dynamic class names depend on `variant`, `inline`, and custom `className`.

#### Label:
```tsx
{label && (
  <label className="checkbox-label">
    {label}
    {required && <span className="required">*</span>}
    {renderInfoTip()}
  </label>
)}
```
- Optional group label with required indicator and info tooltip.

#### Checkbox Group:
```tsx
<div className={groupClass}>
  {options.map((option, index) => {
    const isChecked = selectedValues.includes(option.value);
    const isDisabled = disabled || option.disabled;
    
    return (
      <div key={option.value} className={optionClass}>
        <input
          type="checkbox"
          id={`${name}-${index}`}
          name={name}
          value={option.value}
          checked={isChecked}
          onChange={() => handleChange(option.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
          readOnly={readOnly}
          className="checkbox-input-hidden"
        />
        <label htmlFor={`${name}-${index}`} className="checkbox-field">
          <div className="checkbox-box">
            <div className="checkbox-checkmark">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <span className="checkbox-option-label">
            {option.label}
          </span>
        </label>
      </div>
    );
  })}
</div>
```
- Renders each checkbox option with proper input-label association.
- Custom styled checkbox boxes with SVG checkmarks for selection indication.
- Hidden native checkbox inputs for accessibility.

#### Validation Icon:
```tsx
{variant === "error" && (
  <div className="checkbox__error-icon">
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
```
- Shows an SVG error icon when validation fails.

#### Message:
```tsx
{showMessage && <div className={`message ${variant}`}>{message}</div>}
```
- Displays contextual error/info/success/warning messages after interaction.

#### Info Tooltip:
```tsx
const renderInfoTip = () =>
  infoTip && (
    <span className="info-icon" aria-label="Info">
      <Info size={16} strokeWidth={1.5} />
      <div className="tooltip">{infoTip}</div>
    </span>
  );
```
- Uses Lucide React's Info icon with hover tooltip functionality.

---

### Usage Examples:

#### Basic Usage:
```tsx
<Checkbox
  name="interests"
  label="Interests"
  options={[
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "reading", label: "Reading" }
  ]}
  value={selectedInterests}
  onChange={setSelectedInterests}
/>
```

#### With Validation:
```tsx
<Checkbox
  name="terms"
  label="Agreement"
  required
  options={[
    { value: "terms", label: "I agree to the terms and conditions" },
    { value: "privacy", label: "I agree to the privacy policy" }
  ]}
  value={agreements}
  onChange={setAgreements}
  variant="error"
  message="You must agree to both terms to continue"
/>
```

#### Inline Layout:
```tsx
<Checkbox
  name="features"
  label="Features"
  inline
  options={[
    { value: "feature1", label: "Feature 1" },
    { value: "feature2", label: "Feature 2" },
    { value: "feature3", label: "Feature 3" }
  ]}
  value={selectedFeatures}
  onChange={setSelectedFeatures}
/>
```

#### With Info Tooltip:
```tsx
<Checkbox
  name="notifications"
  label="Notification Preferences"
  infoTip="Select all types of notifications you'd like to receive"
  options={[
    { value: "email", label: "Email notifications" },
    { value: "sms", label: "SMS notifications" },
    { value: "push", label: "Push notifications" }
  ]}
  value={notifications}
  onChange={setNotifications}
/>
```

#### With Individual Disabled Options:
```tsx
<Checkbox
  name="permissions"
  label="Permissions"
  options={[
    { value: "read", label: "Read access" },
    { value: "write", label: "Write access", disabled: true },
    { value: "admin", label: "Admin access", disabled: true }
  ]}
  value={permissions}
  onChange={setPermissions}
/>
```

#### Auto-wrap Example (More than 3 options):
```tsx
<Checkbox
  name="skills"
  label="Skills"
  options={[
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" }
  ]}
  value={skills}
  onChange={setSkills}
  // Auto-wrap will be applied since options.length > 3
/>
```

---

### Accessibility Notes:
- Each checkbox input has a unique `id` and corresponding `htmlFor` attribute for proper screen reader support.
- The group label is semantically associated with the checkbox group.
- `aria-label` is provided for the info tooltip icon.
- `readOnly` prevents selection changes but maintains keyboard navigation.
- Individual options can be disabled while keeping others interactive.
- Proper focus management with visual focus indicators.
- Native checkbox inputs are hidden but remain functional for screen readers.

---

### Key Differences from Radio Button:
- **Multiple Selection**: Returns an array of selected values instead of a single value.
- **Toggle Behavior**: Items can be checked/unchecked independently.
- **Auto-wrap**: Automatically wraps options when there are more than 3 items in vertical layout.
- **Activated State**: Triggered when any items are selected (`selectedValues.length > 0`).
- **Selection Logic**: Uses array manipulation to add/remove values from selection.