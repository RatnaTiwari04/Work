import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import RadioButton from "../components/RadioButton/RadioButton";

const RadioButtonShowcase = () => {
  const [defaultValue, setDefaultValue] = useState("");
  const [topLabel, setTopLabel] = useState("option1");
  const [leftLabel, setLeftLabel] = useState("option2");
  const [rightLabel, setRightLabel] = useState("");
  const [bottomLabel, setBottomLabel] = useState("option1");
  const [inlineValue, setInlineValue] = useState("inline2");
  const [errorValue, setErrorValue] = useState("");
  const [warningValue, setWarningValue] = useState("warning1");
  const [infoValue, setInfoValue] = useState("");
  const [successValue, setSuccessValue] = useState("success2");
  const [disabledValue, setDisabledValue] = useState("disabled1");
  const [requiredValue, setRequiredValue] = useState("");
  
//   const navigate = useNavigate();

  // Sample options for different scenarios
  const basicOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const longLabelOptions = [
    { value: "option1", label: "This is a very long option label that demonstrates text wrapping" },
    { value: "option2", label: "Another lengthy option to show how the component handles longer text content" },
    { value: "option3", label: "Short option" },
  ];

  const inlineOptions = [
    { value: "inline1", label: "Yes" },
    { value: "inline2", label: "No" },
    { value: "inline3", label: "Maybe" },
  ];

  const disabledOptions = [
    { value: "disabled1", label: "Available option" },
    { value: "disabled2", label: "Disabled option", disabled: true },
    { value: "disabled3", label: "Another available option" },
  ];

  const manyOptions = [
    { value: "size1", label: "Small" },
    { value: "size2", label: "Medium" },
    { value: "size3", label: "Large" },
    { value: "size4", label: "Extra Large" },
    { value: "size5", label: "XXL" },
  ];

  return (
    <div className="radio-showcase">
      <h2>RadioButton Component Showcase</h2>

      <div className="form-group">
        <h3>Default (Top Label)</h3>
        <RadioButton
          label="Choose an option"
          name="default-radio"
          options={basicOptions}
          value={defaultValue}
          onChange={setDefaultValue}
          labelPosition="top"
        />
      </div>

      <div className="form-group">
        <h3>Top Label with Info Tip</h3>
        <RadioButton
          label="Select your preference"
          name="top-label-radio"
          options={basicOptions}
          value={topLabel}
          onChange={setTopLabel}
          labelPosition="top"
          infoTip="This is helpful information about the radio group"
        />
      </div>

      <div className="form-group">
        <h3>Left Label Position</h3>
        <RadioButton
          label="Category"
          name="left-label-radio"
          options={basicOptions}
          value={leftLabel}
          onChange={setLeftLabel}
          labelPosition="left"
          infoTip="Label positioned on the left side"
        />
      </div>

      <div className="form-group">
        <h3>Right Label Position</h3>
        <RadioButton
          label="Priority"
          name="right-label-radio"
          options={basicOptions}
          value={rightLabel}
          onChange={setRightLabel}
          labelPosition="right"
          infoTip="Label positioned on the right side"
        />
      </div>

      <div className="form-group">
        <h3>Bottom Label Position</h3>
        <RadioButton
          label="Selection made above"
          name="bottom-label-radio"
          options={basicOptions}
          value={bottomLabel}
          onChange={setBottomLabel}
          labelPosition="bottom"
          infoTip="Label positioned at the bottom"
        />
      </div>

      <div className="form-group">
        <h3>Inline Layout</h3>
        <RadioButton
          label="Quick choice"
          name="inline-radio"
          options={inlineOptions}
          value={inlineValue}
          onChange={setInlineValue}
          labelPosition="top"
          inline={true}
          infoTip="Options displayed horizontally"
        />
      </div>

      <div className="form-group">
        <h3>Required Field</h3>
        <RadioButton
          label="Required selection"
          name="required-radio"
          options={basicOptions}
          value={requiredValue}
          onChange={setRequiredValue}
          labelPosition="top"
          required={true}
          infoTip="This field is mandatory"
        />
      </div>

      <div className="form-group">
        <h3>Error State</h3>
        <RadioButton
          label="Error example"
          name="error-radio"
          options={basicOptions}
          value={errorValue}
          onChange={setErrorValue}
          labelPosition="top"
          variant="error"
          message="Please select a valid option"
          infoTip="This field has an error"
        />
      </div>

      <div className="form-group">
        <h3>Warning State</h3>
        <RadioButton
          label="Warning example"
          name="warning-radio"
          options={basicOptions}
          value={warningValue}
          onChange={setWarningValue}
          labelPosition="top"
          variant="warning"
          message="Please review your selection"
          infoTip="This field has a warning"
        />
      </div>

      <div className="form-group">
        <h3>Info State</h3>
        <RadioButton
          label="Info example"
          name="info-radio"
          options={basicOptions}
          value={infoValue}
          onChange={setInfoValue}
          labelPosition="top"
          variant="info"
          message="Additional information about this field"
          infoTip="This field provides helpful information"
        />
      </div>

      <div className="form-group">
        <h3>Success State</h3>
        <RadioButton
          label="Success example"
          name="success-radio"
          options={basicOptions}
          value={successValue}
          onChange={setSuccessValue}
          labelPosition="top"
          variant="success"
          message="Great choice! Selection confirmed"
          infoTip="This field shows success state"
        />
      </div>

      <div className="form-group">
        <h3>Disabled Group</h3>
        <RadioButton
          label="Disabled radio group"
          name="disabled-group-radio"
          options={basicOptions}
          value={disabledValue}
          onChange={setDisabledValue}
          labelPosition="top"
          disabled={true}
          infoTip="This entire group is disabled"
        />
      </div>

      <div className="form-group">
        <h3>Mixed Disabled Options</h3>
        <RadioButton
          label="Some options disabled"
          name="mixed-disabled-radio"
          options={disabledOptions}
          value={disabledValue}
          onChange={setDisabledValue}
          labelPosition="top"
          infoTip="Some individual options are disabled"
        />
      </div>

      <div className="form-group">
        <h3>Long Labels</h3>
        <RadioButton
          label="Options with long text"
          name="long-labels-radio"
          options={longLabelOptions}
          value={defaultValue}
          onChange={setDefaultValue}
          labelPosition="top"
          infoTip="Demonstrates text wrapping for long labels"
        />
      </div>

      <div className="form-group">
        <h3>Many Options</h3>
        <RadioButton
          label="Size selection"
          name="many-options-radio"
          options={manyOptions}
          value={defaultValue}
          onChange={setDefaultValue}
          labelPosition="top"
          infoTip="Example with multiple options"
        />
      </div>

      <div className="form-group">
        <h3>Inline with Many Options</h3>
        <RadioButton
          label="Inline size selection"
          name="inline-many-radio"
          options={manyOptions}
          value={defaultValue}
          onChange={setDefaultValue}
          labelPosition="top"
          inline={true}
          infoTip="Multiple options displayed inline with wrapping"
        />
      </div>

      <div className="form-group">
        <h3>No Label</h3>
        <RadioButton
          name="no-label-radio"
          options={basicOptions}
          value={defaultValue}
          onChange={setDefaultValue}
        />
      </div>

      <div className="form-group">
        <h3>Custom Class Name</h3>
        <RadioButton
          label="Custom styled"
          name="custom-radio"
          options={basicOptions}
          value={defaultValue}
          onChange={setDefaultValue}
          labelPosition="top"
          className="custom-radio-style"
          infoTip="This has custom CSS classes applied"
        />
      </div>

      {/* <div className="navigation-buttons">
        <button onClick={() => navigate("/text-input-showcase")} className="btn">
          Go to TextInput Showcase
        </button>
        <button onClick={() => navigate("/")} className="btn">
          Back to Home
        </button>
      </div> */}
    </div>
  );
};

export default RadioButtonShowcase;