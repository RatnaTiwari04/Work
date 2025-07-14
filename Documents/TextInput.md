Component Overview:

This is a fully customizable and reusable **React + TypeScript** input component supporting:
- Single-line and multi-line inputs
- Internal, external, or middle-aligned floating labels
- Optional validation states with messages (error, warning, etc.)
- Max character length enforcement
- Disabled, read-only, and required states

**Component Location:**
```
/components/TextInput/TextInput.tsx
```

---

### Props Table:

| Prop Name          | Type                                                | Description                                         |
|--------------------|-----------------------------------------------------|-----------------------------------------------------|
| `label`            | `string`                                            | Text label for the input                            |
| `labelPosition`    | `"internal" \| "external" \| "middle"`              | Position of the label                               |
| `placeholder`      | `string`                                            | Placeholder text (ignored if internal/middle label) |
| `required`         | `boolean`                                           | Marks the field as required                         |
| `disabled`         | `boolean`                                           | Disables input field                                |
| `readOnly`         | `boolean`                                           | Renders the input as read-only                      |
| `value`            | `string`                                            | Current value of the input (controlled input)       |
| `onChange`         | `(value: string) => void`                           | Callback on value change                            |
| `message`          | `string`                                            | Optional helper or error message                    |
| `variant`          | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual state of the field                           |
| `name`             | `string`                                            | HTML name and id for accessibility                  |
| `className`        | `string`                                            | Optional class for styling overrides                |
| `MAX_INPUT_LENGTH` | `number`                                            | Limits character input                              |
| `multiline`        | `boolean`                                           | Renders `<textarea>` instead of `<input>`           |
| `rows`             | `number`                                            | Number of rows for multiline textareas              |
| `multientry`       | `boolean`                                           | Enables chips-based multi-entry mode                |
|`showCharacterCount`| `boolean`                                           | Checks For no of Characters used                    |
| `infotip`          | `string`                                            | To display the message as info                      | 
---

### Component Logic:

```ts
const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
```
- `focused`: Tracks whether the input is currently focused.
- `touched`: Tracks if the user has interacted with the field (used to trigger validation messages).

#### Focus and Blur Handlers:
```ts
const handleFocus = () => setFocused(true);
const handleBlur = (e) => {
  setFocused(false);
  setTouched(true);
};
```
- Activates label styling and triggers validation message rendering on blur.

#### Input Change Handler:
```ts
const handleChange = (e) => {
  const newValue = e.target.value;
  if (newValue.length > MAX_INPUT_LENGTH) {
    console.warn(`TextInput: Max length of ${MAX_INPUT_LENGTH} exceeded.`);
    return;
  }
  onChange?.(newValue);
};
```
- Limits input length and triggers the parent `onChange`.

---

### Structure Overview:

#### Container:
```tsx
<div className={containerClass}>
```
- Contains all elements. Dynamic class names depend on `labelPosition` and `variant`.

#### Labels:
```tsx
{label && labelPosition === "external" && <label>...}
{label && labelPosition === "internal" && <label className={...}>...}
{label && labelPosition === "middle" && <label className={...}>...}
```
- External: Above the input.
- Internal: Floats inside the input.
- Middle: Centered inside until focused.

#### Input Field:
```tsx
{multiline ? (
  <textarea ... />
) : (
  <input type="text" ... />
)}
```
- Supports `input` or `textarea` based on `multiline` prop.
- Adds props like `required`, `disabled`, `readOnly`, `rows`, etc.

#### Validation Icon:
```tsx
{variant === 'error' && (
  <div className="text-input__error-icon">...</div>
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

---

### Accessibility Notes:
- `htmlFor={name}` binds the label to the input/textarea for better screen reader support.
- `readOnly` does not allow editing but still lets users select/copy the content.
