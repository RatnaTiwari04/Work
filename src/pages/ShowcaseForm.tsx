import React, { useState, useEffect, useRef } from "react";
import TextInput from "../components/TextInput";

const ShowcaseForm = () => {
  const [internal, setinternal] = useState("");
  const [external, setExternal] = useState("");
  const [activated, setActivated] = useState("");
  const [middle, setMiddle] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [error, setError] = useState("");
  const focusedInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the "focused" input for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusedInputRef.current) {
        focusedInputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="form-showcase">
      <h2>TextInput Example Form</h2>

      <div className="form-group">
        <label>Default</label>
        <TextInput placeholder="Place holder" 
        value={defaultValue}
        onChange={setDefaultValue}
        />
      </div>

      <div className="form-group">
        <label>Focused</label>
        <TextInput 
          placeholder="Place holder" 
          name="focused-input"
        />
      </div>

      <div className="form-group">
        <label>Activated (Internal)</label>
        <TextInput
          label="Label"
          value={internal}
          onChange={setinternal}
          placeholder="Place holder"
          labelPosition="internal"
        />
      </div>

       <div className="form-group">
        <label>Activated (external)</label>
        <TextInput
          label="Label"
          value={external}
          onChange={setExternal}
          placeholder="hii write here something for placeholder sushant sir"
          labelPosition="external"
        />
      </div>

      <div className="form-group">
        <label>Activated (Middle)</label>
        <TextInput
          label="Label"
          value={middle}
          onChange={setMiddle}
          placeholder="Place holder"
          labelPosition="middle"
        />
      </div>

      <div className="form-group">
        <label>Inactive</label>
        <TextInput placeholder="Place holder" disabled />
      </div>

      <div className="form-group">
        <label>Error</label>
        <TextInput
          label="Label"
          placeholder="Place holder 1"
          value={error}
          onChange={setError}
          variant="error"
          message="This field is required"
          labelPosition="internal"
        />
      </div>

      <div className="form-group">
        <label>Comments</label>
        <TextInput
          placeholder="Type your message here"
          multiline
          value={activated}
          rows={4}
          onChange={setActivated}
          MAX_INPUT_LENGTH={200}
        />
      </div>
    </div>
  );
};

export default ShowcaseForm;