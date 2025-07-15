import { useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";

const DropdownShowcase = () => {
  const [singleValue, setSingleValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchableSingle, setSearchableSingle] = useState("");
  const [searchableMulti, setSearchableMulti] = useState<string[]>([]);
//   const [internalSingle, setInternalSingle] = useState("");
  const [middleSingle, setMiddleSingle] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "br", label: "Brazil" },
    { value: "mx", label: "Mexico" },
  ];

  const skillOptions = [
    { value: "js", label: "JavaScript" },
    { value: "ts", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent", disabled: true },
  ];

  return (
    <div className="form-showcase">
      <h2>Dropdown Component</h2>

      <div className="form-group">
        <h3>Single Select - External Label</h3>
        <Dropdown
          label="Country"
          labelPosition="external"
          placeholder="Select a country"
          options={countryOptions}
          value={singleValue}
          onChange={(value) => setSingleValue(value as string)}
          infoTip="Select your country of residence"
        />
      </div>

      <div className="form-group">
        <h3>Multi Select - External Label</h3>
        <Dropdown
          label="Skills"
          labelPosition="external"
          placeholder="Select your skills"
          options={skillOptions}
          value={multiValue}
          onChange={(value) => setMultiValue(value as string[])}
          multiSelect
          infoTip="Select all skills that apply to you"
        />
      </div>

      <div className="form-group">
        <h3>Searchable Single Select - Internal Label</h3>
        <Dropdown
          label="Country"
          labelPosition="internal"
          placeholder="Search for a country"
          options={countryOptions}
          value={searchableSingle}
          onChange={(value) => setSearchableSingle(value as string)}
          searchable
          infoTip="Type to search for countries"
        />
      </div>

      <div className="form-group">
        <h3>Searchable Multi Select - Internal Label</h3>
        <Dropdown
          label="Skills"
          labelPosition="internal"
          placeholder="Search and select skills"
          options={skillOptions}
          value={searchableMulti}
          onChange={(value) => setSearchableMulti(value as string[])}
          multiSelect
          searchable
          infoTip="Type to search and select multiple skills"
        />
      </div>

      <div className="form-group">
        <h3>Middle Label Position</h3>
        <Dropdown
          label="Priority"
          labelPosition="middle"
          placeholder="Select priority"
          options={priorityOptions}
          value={middleSingle}
          onChange={(value) => setMiddleSingle(value as string)}
          infoTip="Choose task priority level"
        />
      </div>

      <div className="form-group">
        <h3>Disabled State</h3>
        <Dropdown
          label="Disabled Dropdown"
          labelPosition="external"
          placeholder="This is disabled"
          options={countryOptions}
          disabled
        />
      </div>

      <div className="form-group">
        <h3>Error State</h3>
        <Dropdown
          label="Required Field"
          labelPosition="internal"
          placeholder="Select an option"
          options={priorityOptions}
          value={errorValue}
          onChange={(value) => setErrorValue(value as string)}
          variant="error"
          message="This field is required"
          required
        />
      </div>

      <div className="form-group">
        <h3>Warning State</h3>
        <Dropdown
          label="Warning Example"
          labelPosition="external"
          placeholder="Select with warning"
          options={priorityOptions}
          variant="warning"
          message="Please double-check your selection"
        />
      </div>

      <div className="form-group">
        <h3>Success State</h3>
        <Dropdown
          label="Success Example"
          labelPosition="external"
          placeholder="Select with success"
          options={priorityOptions}
          variant="success"
          message="Selection saved successfully"
        />
      </div>

      <div className="form-group">
        <h3>Info State</h3>
        <Dropdown
          label="Info Example"
          labelPosition="external"
          placeholder="Select with info"
          options={priorityOptions}
          variant="info"
          message="Additional information about this field"
        />
      </div>

      <div className="form-group">
        <h3>Custom Max Height</h3>
        <Dropdown
          label="Limited Height"
          labelPosition="external"
          placeholder="Select with custom height"
          options={[
            ...countryOptions,
            ...skillOptions.map(skill => ({ value: skill.value + "_skill", label: skill.label + " (Skill)" }))
          ]}
          maxHeight={150}
          searchable
          infoTip="This dropdown has a custom max height of 150px"
        />
      </div>

      <div className="form-group">
        <h3>No Clear Button</h3>
        <Dropdown
          label="No Clear Button"
          labelPosition="external"
          placeholder="Select without clear button"
          options={countryOptions}
          showClearButton={false}
        />
      </div>

      <div className="form-group">
        <h3>Required Field</h3>
        <Dropdown
          label="Required Selection"
          labelPosition="external"
          placeholder="This field is required"
          options={priorityOptions}
          required
          infoTip="This field must be filled"
        />
      </div>
    </div>
  );
};

export default DropdownShowcase;