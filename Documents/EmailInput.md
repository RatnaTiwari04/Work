Component Overview:

This is a fully customizable and reusable **React + TypeScript** email input component supporting:
- Single and multi-entry email inputs with chip-based display
- Internal, external, or middle-aligned floating labels
- Real-time email validation with custom validation support
- Fixed domain functionality for organizational emails
- Multiple email formats (comma-separated or individual chips)
- Validation states with contextual messages and icons
- Disabled, read-only, and required states
- Accessibility features and keyboard navigation

**Component Location:**
```
/components/EmailInput.tsx
```

---

### Props Table:

| Prop Name          | Type                                                | Description                                         |
|--------------------|-----------------------------------------------------|-----------------------------------------------------|
| `label`            | `string`                                            | Text label for the input                            |
| `labelPosition`    | `"internal" \| "external" \| "middle"`              | Position of the label                               |
| `placeholder`      | `string`                                            | Placeholder text (default: "Enter email address")   |
| `required`         | `boolean`                                           | Marks the field as required                         |
| `disabled`         | `boolean`                                           | Disables input field                                |
| `readOnly`         | `boolean`                                           | Renders the input as read-only                      |
| `value`            | `string`                                            | Current value of the input (controlled input)       |
| `onChange`         | `(value: string) => void`                           | Callback on value change                            |
| `message`          | `string`                                            | Optional helper or error message                    |
| `variant`          | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state of the field                           |
| `name`             | `string`                                            | HTML name and id for accessibility                  |
| `className`        | `string`                                            | Optional class for styling overrides                |
| `multiEntry`       | `boolean`                                           | Enables chips-based multi-entry mode                |
| `infoTip`          | `string`                                            | Tooltip message displayed with info icon            |
| `showValidation`   | `boolean`                                           | Shows validation icons and messages (default: true) |
| `allowMultiple`    | `boolean`                                           | Allows comma-separated emails in single input       |
| `validateOnBlur`   | `boolean`                                           | Triggers validation on blur event (default: true)   |
| `customValidation` | `(email: string) => boolean`                        | Custom validation function for email format         |
| `fixedDomain`      | `string`                                            | Appends fixed domain to user input (e.g., "@company.com") |

---

### Component Logic:

#### State Management:
```ts
const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [inputValue, setInputValue] = useState("");
const [validationState, setValidationState] = useState<"valid" | "invalid" | "">("");
const [validationMessage, setValidationMessage] = useState("");
const [emailChips, setEmailChips] = useState<string[]>([]);
```
- `focused`: Tracks whether the input is currently focused
- `touched`: Tracks if the user has interacted with the field
- `inputValue`: Current input field value (separate from chips)
- `validationState`: Current validation status
- `validationMessage`: Dynamic validation message
- `emailChips`: Array of validated email addresses (multi-entry mode)

#### Email Validation:
```ts
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): boolean => {
  if (!email.trim()) return !required;
  if (customValidation) return customValidation(email);
  if (allowMultiple) {
    const emails = email.split(',').map(e => e.trim());
    return emails.every(e => emailRegex.test(e));
  }
  return emailRegex.test(email);
};
```
- Supports standard email regex validation
- Handles custom validation functions
- Validates multiple comma-separated emails
- Respects required field validation

#### Fixed Domain Handling:
```ts
const getFullEmail = (input: string) => {
  return fixedDomain ? `${input}${fixedDomain}` : input;
};
```
- Automatically appends organizational domain
- Strips domain from display input
- Maintains full email in component value

#### Multi-Entry Chip Management:
```ts
const addEmailChip = (email: string) => {
  const trimmedEmail = email.trim();
  if (trimmedEmail && !emailChips.includes(trimmedEmail)) {
    const fullEmail = getFullEmail(trimmedEmail);
    if (validateEmail(fullEmail)) {
      const updatedChips = [...emailChips, fullEmail];
      setEmailChips(updatedChips);
      setInputValue("");
      onChange?.(updatedChips.join(", "));
    }
  }
};
```
- Prevents duplicate email entries
- Validates before adding to chips
- Clears input after successful addition
- Updates parent component with comma-separated string

#### Event Handlers:
```ts
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (multiEntry && (e.key === ', ')) {
    e.preventDefault();
    if (inputValue.trim()) {
      addEmailChip(inputValue);
    }
  }
};
```
- Handles comma key for chip creation
- Prevents default comma behavior
- Validates and adds email on comma press

---

### Structure Overview:

#### Container:
```tsx
<div className={containerClass}>
```
- Contains all elements with dynamic classes based on `labelPosition` and `variant`
- Applies appropriate styling for different states

#### Labels:
```tsx
{label && labelPosition === "external" && <label>...}
{label && labelPosition === "internal" && <label className={...}>...}
{label && labelPosition === "middle" && <label className={...}>...}
```
- **External**: Positioned above the input field
- **Internal**: Floats inside the input with animation
- **Middle**: Centered inside until focused, then animates

#### Input Field Wrapper:
```tsx
<div className="input-field-wrapper">
  <input type="text" ... />
  {fixedDomain && !multiEntry && <span className="email-input__fixed-domain-addon">{fixedDomain}</span>}
  {renderValidationIcon()}
  {renderEmailIcon()}
</div>
```
- Wraps input with validation and domain display
- Shows fixed domain as visual addon
- Displays appropriate icons based on validation state

#### Validation Icons:
```tsx
const renderValidationIcon = () => {
  if (validationState === "valid") return <CheckCircle size={16} />;
  if (validationState === "invalid") return <AlertCircle size={16} />;
  return null;
};
```
- **Success**: Green checkmark for valid emails
- **Error**: Red alert circle for invalid emails
- **Default**: Mail icon when no validation state

#### Email Chips (Multi-Entry Mode):
```tsx
{multiEntry && emailChips.length > 0 && (
  <div className="chip-container">
    {emailChips.map((email, index) => (
      <div className="chip" key={index}>
        {email}
        <button type="button" onClick={() => handleChipRemove(index)}>
          &times;
        </button>
      </div>
    ))}
  </div>
)}
```
- Displays validated emails as removable chips
- Each chip has a remove button
- Prevents removal when disabled or read-only

#### Validation Messages:
```tsx
{showMessage && <div className={`message ${currentVariant}`}>{displayMessage}</div>}
```
- Shows contextual validation messages
- Supports error, warning, info, and success states
- Displays only after user interaction (`touched` state)

---

### Validation Features:

#### Built-in Validation:
- **Email Format**: Uses regex pattern for standard email validation
- **Required Field**: Validates presence when required prop is true
- **Multiple Emails**: Validates comma-separated email lists
- **Domain Validation**: Ensures proper domain format in fixed domain mode

#### Custom Validation:
```tsx
<EmailInput
  customValidation={(email) => email.endsWith('@company.com')}
  message="Only company emails are allowed"
/>
```

#### Validation States:
- **Valid**: Shows green checkmark icon
- **Invalid**: Shows red alert icon with error message
- **Empty**: Shows default mail icon (no validation)

---

### Usage Examples:

#### Basic Email Input:
```tsx
<EmailInput
  label="Email Address"
  name="email"
  required
  onChange={(value) => setEmail(value)}
/>
```

#### Multi-Entry Mode:
```tsx
<EmailInput
  label="Recipients"
  multiEntry
  placeholder="Enter email addresses"
  onChange={(value) => setRecipients(value)}
/>
```

#### Fixed Domain:
```tsx
<EmailInput
  label="Employee Email"
  fixedDomain="@company.com"
  placeholder="Enter username"
  onChange={(value) => setEmployeeEmail(value)}
/>
```

#### Custom Validation:
```tsx
<EmailInput
  label="Admin Email"
  customValidation={(email) => email.includes('admin')}
  message="Must be an admin email address"
  onChange={(value) => setAdminEmail(value)}
/>
```

---

### Accessibility Notes:
- `htmlFor={name}` binds labels to input for screen reader support
- `autoComplete="email"` provides browser autocomplete functionality
- `aria-label` attributes on info icons for screen readers
- Keyboard navigation support for chip removal
- `readOnly` preserves content selection and copying
- Required state properly communicated to assistive technologies

---

### Styling Classes:

#### Container Classes:
- `email-input-container`: Base container class
- `label-external`, `label-internal`, `label-middle`: Label positioning
- `error`, `warning`, `info`, `success`: Validation state styling

#### Input Classes:
- `email-input`: Base input class
- `disabled`, `error`, `success`, `focused`, `activated`: Input states
- `input-field-wrapper`: Wrapper for input and icons

#### Component Classes:
- `chip-container`: Container for email chips
- `chip`: Individual email chip styling
- `email-input__validation-icon`: Validation icon container
- `email-input__email-icon`: Default email icon
- `email-input__fixed-domain-addon`: Fixed domain display
- `message`: Validation message styling