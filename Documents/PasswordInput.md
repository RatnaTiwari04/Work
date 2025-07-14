Component Overview:

This is a fully customizable and reusable **React + TypeScript** password input component supporting:
- External, internal, or middle-aligned floating labels
- Optional validation states with messages (error, warning, etc.)
- Toggle to show/hide password
- Read-only, disabled, and required states
- Hold-to-show or locked visibility modes
- Password strength indicator (weak, fair, good, strong)

**Component Location:**
```
/components/PasswordInput/PasswordInput.tsx
```

---

### Props Table:

| Prop Name            | Type                                                  | Description                                                    |
|----------------------|-------------------------------------------------------|----------------------------------------------------------------|
| `label`              | `string`                                              | Text label for the input                                       |
| `labelPosition`      | `"internal" \| "external" \| "middle"`               | Position of the label                                          |
| `placeholder`        | `string`                                              | Placeholder text (ignored for internal/middle label)           |
| `required`           | `boolean`                                             | Marks the field as required                                    |
| `disabled`           | `boolean`                                             | Disables the input                                             |
| `readOnly`           | `boolean`                                             | Makes the field read-only                                      |
| `value`              | `string`                                              | Current value of the input                                     |
| `onChange`           | `(value: string) => void`                             | Triggered when input changes                                   |
| `message`            | `string`                                              | Optional helper or error message                               |
| `variant`            | `"error" \| "warning" \| "info" \| "success" \| ""` | Visual validation state                                        |
| `name`               | `string`                                              | Input name/id (used for htmlFor and accessibility)             |
| `className`          | `string`                                              | Custom CSS class                                               |
| `MAX_INPUT_LENGTH`   | `number`                                              | Maximum characters allowed                                     |
| `minLength`          | `number`                                              | Minimum length requirement                                     |
| `showStrengthIndicator` | `boolean`                                          | Shows password strength bar                                    |
| `showToggle`         | `boolean`                                             | Displays visibility toggle button                              |
| `lockVisibility`     | `boolean`                                             | Locks visibility toggle (shows lock icon)                      |
| `holdToShow`         | `boolean`                                             | Only reveals password while button is held                     |

---

### Component Logic:

```tsx
const [focused, setFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [isHolding, setIsHolding] = useState(false);
```
- `focused`: Triggers label animation and styles.
- `touched`: Used to display validation message post-blur.
- `showPassword`: Controls text/password mode.
- `isHolding`: Active only in `holdToShow` mode to reveal password.

---

### Password Visibility:

```tsx
const togglePasswordVisibility = () => { ... }
const handleMouseDown = () => { ... }
```
- Toggle works based on `lockVisibility` and `holdToShow`.
- `holdToShow` requires the button to be pressed/held.

---

### Strength Evaluation:

```tsx
const getPasswordStrength = (password: string): StrengthLevel => {
  // Scoring based on length, character mix
}
```
- Shows strength: Weak, Fair, Good, Strong.
- Only active when `showStrengthIndicator` is true.

---

### Structure Overview:

#### Labels:
```tsx
{label && labelPosition === "external" && <label>...}
{label && labelPosition === "internal" && <label className={...}>...}
{label && labelPosition === "middle" && <label className={...}>...}
```

#### Input:
```tsx
<input
  type={showPassword ? "text" : "password"}
  ...
  readOnly={readOnly}
/>
```

#### Visibility Toggle:
```tsx
<button
  onClick={togglePasswordVisibility}
  onMouseDown={handleMouseDown}
  ...
>
  {getToggleIcon()}
</button>
```
- Icon changes based on mode and state.
- `Lock`, `Eye`, or `EyeOff` from lucide-react.

#### Password Strength:
```tsx
{showStrengthIndicator && value && (
  <div className="password-strength">
    <div className={`strength-fill ${passwordStrength}`}></div>
    <span className={`strength-text ${passwordStrength}`}>{...}</span>
  </div>
)}
```

#### Validation Message:
```tsx
{showMessage && <div className={`message ${variant}`}>{message}</div>}
```

---

### Accessibility Notes:
- `aria-label` updates dynamically for toggles.
- `readOnly` makes password visible but uneditable.
- `htmlFor` connects label with input for screen readers.

---

### Recommended Use:
Use this component when building secure and accessible password forms with visual feedback and optional interaction styles (hold-to-view, locked view).
