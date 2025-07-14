Component Overview:

This is a fully customizable and reusable **React + TypeScript** radio button component supporting:
- Single and multiple radio options
- Required, disabled, and read-only states
- Optional validation states with messages (error, warning, info, success)
- Inline and vertical layout options
- Info tooltips for additional context
- Accessibility features with proper labeling

**Component Location:**
```
/components/Radiobutton/RadioButton.tsx
```

---

### Props Table:

| Prop Name    | Type                                                | Description                                         |
|--------------|-----------------------------------------------------|-----------------------------------------------------|
| `label`      | `string`                                            | Text label for the radio button group               |
| `required`   | `boolean`                                           | Marks the field as required                         |
| `disabled`   | `boolean`                                           | Disables entire radio button group                  |
| `readOnly`   | `boolean`                                           | Renders the radio group as read-only                |
| `value`      | `string`                                            | Current selected value (controlled input)           |
| `onChange`   | `(value: string) => void`                           | Callback on value change                            |
| `options`    | `RadioOption[]`                                     | Array of radio options to display                   |
| `message`    | `string`                                            | Optional helper or error message                    |
| `variant`    | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state of the field                           |
| `name`       | `string`                                            | HTML name for the radio group (required)            |
| `className`  | `string`                                            | Optional class for styling overrides                |
| `infoTip`    | `string`                                            | Tooltip text displayed next to the label            |
| `inline`     | `boolean`                                           | Renders options horizontally instead of vertically  |

---

### RadioOption Interface:

```ts
interface RadioOption {
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
const [selectedValue, setSelectedValue] = useState(value);
```
- `focused`: Tracks whether any radio option is currently focused.
- `touched`: Tracks if the user has interacted with the field (used to trigger validation messages).
- `selectedValue`: Internal state synchronized with the `value` prop.

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
  setSelectedValue(optionValue);
  setTouched(true);
  onChange?.(optionValue);
};
```
- Prevents changes when disabled or read-only, updates selection, and triggers parent `onChange`.

#### State Management:
```ts
const getRadioState = () => {
  if (disabled) return "disabled";
  if (variant === "error") return "error";
  if (focused) return "focused";
  if (selectedValue) return "activated";
  return "default";
};
```
- Determines the visual state for styling purposes.

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
  <label className="radio-button-label">
    {label}
    {required && <span className="required">*</span>}
    {renderInfoTip()}
  </label>
)}
```
- Optional group label with required indicator and info tooltip.

#### Radio Group:
```tsx
<div className={`radio-group ${radioState} ${inline ? "inline" : ""}`}>
  {options.map((option, index) => (
    <div key={option.value} className={optionClass}>
      <input type="radio" ... />
      <label htmlFor={`${name}-${index}`} className="radio-button-field">
        <div className="radio-circle">
          <div className="radio-dot" />
        </div>
        <span className="radio-option-label">{option.label}</span>
      </label>
    </div>
  ))}
</div>
```
- Renders each radio option with proper input-label association.
- Custom styled radio circles with inner dots for selection indication.

#### Validation Icon:
```tsx
{variant === 'error' && (
  <div className="radio-button__error-icon">...</div>
)}
```
- Shows an SVG error icon when validation fails.

#### Message:
```tsx
{showMessage && (
  <div className={`message ${variant}`}>{message}</div>
)}
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
<RadioButton
  name="gender"
  label="Gender"
  options={[
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ]}
  value={selectedGender}
  onChange={setSelectedGender}
/>
```

#### With Validation:
```tsx
<RadioButton
  name="agreement"
  label="Terms & Conditions"
  required
  options={[
    { value: "agree", label: "I agree to the terms" },
    { value: "disagree", label: "I disagree" }
  ]}
  value={agreement}
  onChange={setAgreement}
  variant="error"
  message="You must agree to continue"
/>
```

#### Inline Layout:
```tsx
<RadioButton
  name="size"
  label="Size"
  inline
  options={[
    { value: "small", label: "S" },
    { value: "medium", label: "M" },
    { value: "large", label: "L" }
  ]}
  value={size}
  onChange={setSize}
/>
```

#### With Info Tooltip:
```tsx
<RadioButton
  name="notification"
  label="Notification Preference"
  infoTip="Choose how you'd like to receive notifications"
  options={[
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "none", label: "None" }
  ]}
  value={notification}
  onChange={setNotification}
/>
```

---

### Accessibility Notes:
- Each radio input has a unique `id` and corresponding `htmlFor` attribute for proper screen reader support.
- The group label is semantically associated with the radio group.
- `aria-label` is provided for the info tooltip icon.
- `readOnly` prevents selection changes but maintains keyboard navigation.
- Individual options can be disabled while keeping others interactive.
- Proper focus management with visual focus indicators.
