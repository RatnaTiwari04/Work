<<<<<<< HEAD
Component Overview :

This is a fully customizable and reusable React + TypeScript component used for input fields across a UI, supporting:
Single-line and multi-line inputs
Internal, external, or middle-aligned floating labels
Optional validation states with messages (error, warning, etc.)
Max character length enforcement
Disabled and required states

Components location :
/components/TextInput.tsx


| Prop Name          | Type                                                | Description                                         |
| ------------------ | --------------------------------------------------- | --------------------------------------------------- |
| `label`            | `string`                                            | Text label for the input                            |
| `labelPosition`    | `"internal" \| "external" \| "middle"`              | Position of the label                               |
| `placeholder`      | `string`                                            | Placeholder text (ignored if internal/middle label) |
| `required`         | `boolean`                                           | Marks the field as required                         |
| `disabled`         | `boolean`                                           | Disables input field                                |
| `value`            | `string`                                            | Current value of the input (controlled input)       |
| `onChange`         | `(value: string) => void`                           | Callback on value change                            |
| `message`          | `string`                                            | Optional helper or error message                    |
| `variant`          | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state                                        |
| `name`             | `string`                                            | HTML name and id for accessibility                  |
| `className`        | `string`                                            | Optional class for styling overrides                |
| `MAX_INPUT_LENGTH` | `number`                                            | Limits character input                              |
| `multiline`        | `boolean`                                           | Renders `<textarea>` instead of `<input>`           |
| `rows`             | `number`                                            | Number of rows for multiline textareas              |


Component Logic Explained :

const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
focused: Tracks whether the input is currently focused.
touched: Tracks whether the input has been interacted with, to conditionally show validation messages.

Focus and Blur Handlers :
const handleFocus = () => setFocused(true);
const handleBlur = (e) => { setFocused(false); setTouched(true); }
Sets focus and marks the field as touched when it loses focus.

Change Handler with Max Length Check:

const handleChange = (e) => {
  const newValue = e.target.value;
  if (newValue.length > MAX_INPUT_LENGTH) {
    console.warn(`TextInput: Max length of ${MAX_INPUT_LENGTH} exceeded.`);
    return;
  }
  onChange?.(newValue);
}

Enforces character limit and calls parent onChange only if within bounds.

Structure Breakdown :

<div className={containerClass}>
Outer container class varies based on labelPosition and variant.

Label (External) :
{label && labelPosition === "external" && (
  <h3>{label}</label>
)}
Shown above the input box.

Floating Label (Internal or Middle) :
{label && labelPosition === "internal" && (
  <label className={focused || value ? "float" : ""}>{label}</label>
)}
Appears inside the input and floats on focus or when there's content.

{label && labelPosition === "middle" && (
  <label className={focused ? "focused" : ""}>{label}</label>
)}
Appears halfway inside the input, good for aesthetic purposes.

Input or Textarea Field
{multiline ? (
  <textarea ... />
) : (
  <input type="text" ... />
)}
Supports both types using the multiline prop.

Placeholder is conditionally shown based on label position.

Validation Message and Icon
{variant === 'error' && (
  <div className="text-input__error-icon">
    <!-- SVG Icon -->
  </div>
)}
Displays error icon next to the input when variant === "error".

{showMessage && (
  <div className={`message ${variant}`}>
    {message}
  </div>
)}