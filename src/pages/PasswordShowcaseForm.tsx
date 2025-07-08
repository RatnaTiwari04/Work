import { useState, useEffect, useRef } from "react";
import PasswordInput from "../components/PasswordInput/PasswordInput";

const PasswordShowcaseForm = () => {
  const [internalPassword, setInternalPassword] = useState("");
  const [holdPassword, setHoldPassword] = useState("");
  const [lockinternalPassword, setLockInternalPassword] = useState("");
  const [externalPassword, setExternalPassword] = useState("");
  const [middlePassword, setMiddlePassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [strengthPassword, setStrengthPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const focusedInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusedInputRef.current) {
        focusedInputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validatePasswordMatch = () => {
    if (confirmPassword && strengthPassword !== confirmPassword) {
      return {
        variant: "error" as const,
        message: "Passwords do not match"
      };
    }
    return { variant: "" as const, message: "" };
  };

  const validatePasswordStrength = () => {
    if (errorPassword.length > 0 && errorPassword.length < 8) {
      return {
        variant: "error" as const,
        message: "Password must be at least 8 characters long"
      };
    }
    return { variant: "" as const, message: "" };
  };

  const passwordValidation = validatePasswordStrength();
  const confirmValidation = validatePasswordMatch();

  return (
    <form className="form-showcase" autoComplete="on">
      <h2>PasswordInput Example Form</h2>

      <div className="form-group">
        <h3>Focused</h3>
        <PasswordInput 
          placeholder="This input will be focused"
          name="focused-input"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className="form-group">
        <h3>Internal Label</h3>
        <PasswordInput
          label="Password"
          value={internalPassword}
          onChange={setInternalPassword}
          placeholder="Enter password"
          labelPosition="internal"
        />

      </div>
      <div className="form-group">
        <h3>Locked</h3>
        <PasswordInput
          label="Password"
          value={lockinternalPassword}
          onChange={setLockInternalPassword}
          placeholder="Enter password"
          labelPosition="internal"
          lockVisibility={true}
        />
      </div>

      <div className="form-group">
        <h3>External Label</h3>
        <PasswordInput
          label="Password"
          value={externalPassword}
          onChange={setExternalPassword}
          placeholder="Enter your secure password here"
          labelPosition="external"
          required
        />
      </div>

      <div className="form-group">
        <h3>Hold To Show</h3>
        <PasswordInput
          label="Password"
          value={holdPassword}
          onChange={setHoldPassword}
          placeholder="Enter your secure password here"
          labelPosition="external"
          required
          holdToShow
        />
      </div>

      <div className="form-group">
        <h3>Middle Label</h3>
        <PasswordInput
          label="Password"
          value={middlePassword}
          onChange={setMiddlePassword}
          placeholder="Enter password"
          labelPosition="middle"
        />
      </div>

      <div className="form-group">
        <h3>Disabled</h3>
        <PasswordInput 
          placeholder="Disabled password field" 
          disabled 
          value="sample123"
        />
      </div>

      <div className="form-group">
        <h3>Error State</h3>
        <PasswordInput
          label="Password"
          placeholder="Enter password (min 8 chars)"
          value={errorPassword}
          onChange={setErrorPassword}
          variant={passwordValidation.variant}
          message={passwordValidation.message}
          labelPosition="internal"
          minLength={8}
        />
      </div>

      <div className="form-group">
        <h3>Password Strength Indicator</h3>
        <PasswordInput
          label="New Password"
          placeholder="Create a strong password"
          value={strengthPassword}
          onChange={setStrengthPassword}
          labelPosition="external"
          showStrengthIndicator
          required
        />
      </div>

      <div className="form-group">
        <h3>Confirm Password</h3>
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          labelPosition="external"
          variant={confirmValidation.variant}
          message={confirmValidation.message}
          required
        />
      </div>

      <div className="form-group">
        <h3>Without Toggle Button</h3>
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={setCurrentPassword}
          labelPosition="internal"
          showToggle={false}
        />
      </div>

      <div className="form-group">
        <h3>Read Only</h3>
        <PasswordInput
          label="Saved Password"
          value="••••••••••••"
          labelPosition="external"
          readOnly
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <h3>New Password</h3>
          <PasswordInput
            label="New"
            placeholder="New password"
            labelPosition="internal"
            showStrengthIndicator
          />
        </div>
        <div className="form-group">
          <h3>Confirm New</h3>
          <PasswordInput
            label="Confirm"
            placeholder="Confirm password"
            labelPosition="internal"
          />
        </div>
      </div>
    </form>
  );
};

export default PasswordShowcaseForm;
