import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import EmailInput from "../components/Email/EmailInput";

const EmailInputShowcase = () => {
  const [internal, setInternal] = useState("");
  const [external, setExternal] = useState("");
  const [chipInternal, setChipInternal] = useState("");
  const [middle, setMiddle] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [error, setError] = useState("");
  const [multipleEmails, setMultipleEmails] = useState("");
  const [validationEmail, setValidationEmail] = useState("");
  const [customValidationEmail, setCustomValidationEmail] = useState("");
  const focusedInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusedInputRef.current) {
        focusedInputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Custom validation function example
  const customEmailValidation = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);
    const hasValidDomain = email.includes('@gmail.com') || email.includes('@company.com');
    return isValidFormat && hasValidDomain;
  };

  return (
    <div className="email-form-showcase">
      <h2>EmailInput Component Showcase</h2>

      <div className="form-group">
        <h3>Default State</h3>
        <EmailInput 
          placeholder="Enter your email address"
          value={defaultValue}
          onChange={setDefaultValue}
          disabled
        />
      </div>

      <div className="form-group">
        <h3>Focused State</h3>
        <EmailInput
          placeholder="Click to focus"
          name="focused-input"
        />
      </div>

      <div className="form-group">
        <h3>Internal Label with Validation</h3>
        <EmailInput
          label="Email Address"
          value={internal}
          onChange={setInternal}
          placeholder="Enter your email"
          labelPosition="internal"
          infoTip="We'll use this email to send you notifications"
          showValidation={true}
          required
        />
      </div>

      <div className="form-group">
        <h3>External Label with Real-time Validation</h3>
        <EmailInput
          label="Work Email"
          value={external}
          onChange={setExternal}
          placeholder="your.name@company.com"
          labelPosition="external"
          infoTip="Please use your work email address"
          showValidation={true}
          validateOnBlur={false}
          required
        />
      </div>

      <div className="form-group">
        <h3>Multiple Email Addresses</h3>
        <EmailInput
          label="Email Recipients"
          value={multipleEmails}
          onChange={setMultipleEmails}
          placeholder="Enter multiple emails separated by commas"
          labelPosition="external"
          allowMultiple={true}
          infoTip="You can enter multiple emails separated by commas"
        />
      </div>

      <div className="form-group">
        <h3>Multi-Entry Email Chips</h3>
        <EmailInput
          label="Email List"
          value={chipInternal}
          onChange={setChipInternal}
          placeholder="Type email and press space or comma to add"
          labelPosition="internal"
          multiEntry={true}
          infoTip="Press space, comma, or enter to add each email as a chip"
        />
      </div>

      <div className="form-group">
        <h3>Middle Label Position</h3>
        <EmailInput
          label="Contact Email"
          value={middle}
          onChange={setMiddle}
          placeholder="Enter contact email"
          labelPosition="middle"
          fixedDomain="@gmail.com"
          infoTip="This email will be used for contact purposes"
        />
      </div>

      <div className="form-group">
        <h3>Disabled State</h3>
        <EmailInput 
          placeholder="admin@company.com" 
          value="admin@company.com"
          disabled 
        />
      </div>

      <div className="form-group">
        <h3>Error State</h3>
        <EmailInput
          label="Email Address"
          placeholder="Enter a valid email"
          value={error}
          onChange={setError}
          variant="error"
          message="Please enter a valid email address"
          labelPosition="internal"
          required
        />
      </div>

      <div className="form-group">
        <h3>Success State with Validation</h3>
        <EmailInput
          label="Verified Email"
          placeholder="Enter email address"
          value={validationEmail}
          onChange={setValidationEmail}
          variant="success"
          message="Email address is valid"
          labelPosition="external"
          showValidation={true}
        />
      </div>

      <div className="form-group">
        <h3>Custom Validation (Only Gmail & Company emails)</h3>
        <EmailInput
          label="Corporate Email"
          placeholder="Use @gmail.com or @company.com"
          value={customValidationEmail}
          onChange={setCustomValidationEmail}
          labelPosition="external"
          customValidation={customEmailValidation}
          infoTip="Only Gmail and company emails are accepted"
          showValidation={true}
        />
      </div>

      <div className="form-group">
        <h3>Read-only State</h3>
        <EmailInput
          label="System Email"
          value="system@company.com"
          readOnly={true}
          labelPosition="external"
        />
      </div>

      <div className="form-row">
        <EmailInput
          label="From"
          placeholder="sender@example.com"
          labelPosition="external"
          required
        />
        <EmailInput
          label="To"
          placeholder="recipient@example.com"
          labelPosition="external"
          required
        />
      </div>

      <div className="form-group">
        <h3>Warning State</h3>
        <EmailInput
          label="Secondary Email"
          placeholder="optional@example.com"
          value="test@tempmail.com"
          variant="warning"
          message="Temporary email domains may not receive all notifications"
          labelPosition="external"
        />
      </div>

      <div className="form-group">
        <h3>Info State</h3>
        <EmailInput
          label="Newsletter Email"
          placeholder="newsletter@example.com"
          variant="info"
          message="This email will be used for newsletter subscriptions"
          labelPosition="external"
          infoTip="You can unsubscribe at any time"
        />
      </div>

      {/* <div>
        <button 
          onClick={() => navigate("/text-input-showcase")} 
          className="btn"
        >
          Go to TextInput Showcase
        </button>
        <button 
          onClick={() => navigate("/")} 
          className="btn"
          style={{ marginLeft: '1rem' }}
        >
          Home
        </button>
      </div> */}
    </div>
  );
};

export default EmailInputShowcase;