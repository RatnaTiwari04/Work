import { useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import { FileText, Image, Video, FileDown, MapPin } from 'lucide-react';

const DropdownShowcase = () => {
  const [singleValue, setSingleValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchableSingle, setSearchableSingle] = useState("");
  const [searchableSingleinline, setSearchableSingleInline] = useState("");
  const [searchableMulti, setSearchableMulti] = useState<string[]>([]);
  const [searchableBoth, setSearchableBoth] = useState<string[]>([]);
  const [searchableLeft, setSearchableLeft] = useState<string[]>([]);
  const [searchableRight, setSearchableRight] = useState<string[]>([]);
  const [middleSingle, setMiddleSingle] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [selectedHeader, setSelectedHeader] = useState("");
  
  // New states for primary selection examples
  const [multiWithPrimary, setMultiWithPrimary] = useState<string[]>(["js", "react", "ts"]);
  const [primarySkill, setPrimarySkill] = useState<string>("react");
  const [teamMembers, setTeamMembers] = useState<string[]>(["john_doe", "jane_smith"]);
  const [primaryMember, setPrimaryMember] = useState<string>("john_doe");

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

  const headerOptions = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'text',
      label: 'Text',
      icon: <FileText size={16} />
    },
    {
      value: 'image',
      label: 'Image',
      icon: <Image size={16} />
    },
    {
      value: 'video',
      label: 'Video',
      icon: <Video size={16} />
    },
    {
      value: 'document',
      label: 'Document',
      icon: <FileDown size={16} />
    },
    {
      value: 'location',
      label: 'Location',
      icon: <MapPin size={16} />
    }
  ];

  const transactionalOptions = [
    {
      value: '911110002',
      label: '911110002',
      leftSideContent: '911110002',
      rightSideContent: 'Operator X | Circle North | shared'
    },
    {
      value: '911110008', 
      label: '911110008',
      leftSideContent: '911110008',
      rightSideContent: 'Operator Y | Circle South | private'
    },
    {
      value: '911110015',
      label: '911110015', 
      leftSideContent: '911110015',
      rightSideContent: 'Operator Z | Circle East | shared'
    }
  ];

  const userOptions = [
    {
      value: 'john_doe',
      label: 'John Doe',
      rightSideContent: 'Admin'
    },
    {
      value: 'jane_smith',
      label: 'Jane Smith', 
      rightSideContent: 'Manager'
    },
    {
      value: 'bob_wilson',
      label: 'Bob Wilson',
      rightSideContent: 'Developer'
    },
    {
      value: 'alice_brown',
      label: 'Alice Brown',
      rightSideContent: 'Designer'
    }
  ];

  const productOptions = [
    {
      value: 'prod1',
      label: 'Product 1',
      leftSideContent: 'SKU-001 | Product 1'
    },
    {
      value: 'prod2', 
      label: 'Product 2',
      leftSideContent: 'SKU-002 | Product 2'
    }
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
      <h2>Dropdown Component with Primary Selection</h2>

      {/* New Primary Selection Examples */}
      <div className="form-group">
        <h3>Multi Select with Primary Selection - Skills</h3>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Select multiple skills and mark one as primary using the radio button on the right
        </p>
        <Dropdown
          label="Skills"
          labelPosition="external"
          placeholder="Select your skills"
          options={skillOptions}
          value={multiWithPrimary}
          onChange={(value) => setMultiWithPrimary(value as string[])}
          multiSelect
          allowPrimarySelection
          primaryValue={primarySkill}
          onPrimaryChange={setPrimarySkill}
          searchable
          infoTip="Select multiple skills and choose one as primary"
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Primary skill: {primarySkill ? skillOptions.find(s => s.value === primarySkill)?.label || primarySkill : 'None'}
        </div>
      </div>

      <div className="form-group">
        <h3>Multi Select with Primary - Team Members</h3>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Select team members and designate a team lead (primary)
        </p>
        <Dropdown
          label="Team Members"
          labelPosition="internal"
          placeholder="Select team members"
          options={userOptions}
          value={teamMembers}
          onChange={(value) => setTeamMembers(value as string[])}
          multiSelect
          allowPrimarySelection
          primaryValue={primaryMember}
          onPrimaryChange={setPrimaryMember}
          showSideContent
          sideContentPosition="right"
          searchable
          infoTip="Select team members and choose a team lead"
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Team Lead: {primaryMember ? userOptions.find(u => u.value === primaryMember)?.label || primaryMember : 'None'}
        </div>
      </div>

      {/* Original Examples */}
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
        <h3>Searchable Single Select - left inline label</h3>
        <Dropdown
          label="Country "
          labelPosition="left-inline"
          placeholder="Search for a country"
          options={countryOptions}
          value={searchableSingleinline}
          onChange={(value) => setSearchableSingleInline(value as string)}
          searchable
          infoTip="Type to search for countries"
          showClearButton={false}
        />
      </div>

      <div className="form-group">
        <h3>Icons</h3>
        <Dropdown
          label="Header (Optional)"
          placeholder="Select header type"
          value={selectedHeader}
          onChange={(value) => setSelectedHeader(value as string)}
          options={headerOptions}
          showRadioButtons={true}
          showIcons={true}
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
        <h3>Searchable both side content</h3>
        <Dropdown
          label="Skills"
          labelPosition="internal"
          placeholder="Search and select skills"
          options={transactionalOptions}
          value={searchableBoth}
          onChange={(value) => setSearchableBoth(value as string[])}
          multiSelect
          searchable
          infoTip="Type to search and select multiple skills"
          showSideContent
          sideContentPosition="both"
        />
      </div>

      <div className="form-group">
        <h3>Searchable right side content</h3>
        <Dropdown
          label="Skills"
          labelPosition="internal"
          placeholder="Search and select skills"
          options={userOptions}
          value={searchableRight}
          onChange={(value) => setSearchableRight(value as string[])}
          multiSelect
          searchable
          infoTip="Type to search and select multiple skills"
          showSideContent
          sideContentPosition="right"
        />
      </div>

      <div className="form-group">
        <h3>Searchable left side content</h3>
        <Dropdown
          label="Skills"
          labelPosition="internal"
          placeholder="Search and select skills"
          options={productOptions}
          value={searchableLeft}
          onChange={(value) => setSearchableLeft(value as string[])}
          multiSelect
          searchable
          infoTip="Type to search and select multiple skills"
          showSideContent
          sideContentPosition="left"
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
          label="Limited Height "
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