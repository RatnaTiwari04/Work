import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput/TextInput";

const ShowcaseForm = () => {
  const [internal, setinternal] = useState("");
  const [external, setExternal] = useState("");
  const [activated, setActivated] = useState("");
  const [middle, setMiddle] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [error, setError] = useState("");
  const focusedInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
        <h3>Default</h3>
        <TextInput placeholder="Place holder" 
        value={defaultValue}
        onChange={setDefaultValue}
        disabled
        />
      </div>

      <div className="form-group">
        <h3>Focused</h3>
        <TextInput 
          placeholder="Place holder" 
          name="focused-input"
        />
      </div>

      <div className="form-group">
        <h3>Activated (Internal)</h3>
        <TextInput
          label="Label"
          value={internal}
          onChange={setinternal}
          placeholder="Place holder"
          labelPosition="internal"
        />
      </div>

       <div className="form-group">
        <h3>Activated (external)</h3>
        <TextInput
          label="Label"
          value={external}
          onChange={setExternal}
          placeholder="hii write here something for placeholder sushant sir"
          labelPosition="external"
        />
      </div>

      <div className="form-group">
        <h3>Activated (Middle)</h3>
        <TextInput
          label="Label"
          value={middle}
          onChange={setMiddle}
          placeholder="Place holder"
          labelPosition="middle"
        />
      </div>

      <div className="form-group">
        <h3>Inactive</h3>
        <TextInput placeholder="Place holder" disabled />
      </div>

      <div className="form-group">
        <h3>Error</h3>
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
        <h3>Comments</h3>
        <TextInput
        label="Comments"
          placeholder="Type your message here"
          multiline
          value={activated}
          rows={4}
          onChange={setActivated}
          MAX_INPUT_LENGTH={200}
        />
      </div>
      <div >
        <button onClick={() => navigate("/Example2")} className="btn">
          Go to Example 2
        </button>
      </div>
    </div>
  );
};

export default ShowcaseForm;