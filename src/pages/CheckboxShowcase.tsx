import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox/Checkbox";

const CheckboxShowcase = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [errorOptions, setErrorOptions] = useState<string[]>([]);
  const [warningOptions, setWarningOptions] = useState<string[]>([]);
  const [successOptions, setSuccessOptions] = useState<string[]>([]);
  const [infoOptions, setInfoOptions] = useState<string[]>([]);
  const [accountPrivileges, setAccountPrivileges] = useState<string[]>([]);
  const [channelSettings, setChannelSettings] = useState<string[]>([]);
  const [smsSettings, setSmsSettings] = useState<string[]>([]);
  // const navigate = useNavigate();

  const interestOptions = [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "movies", label: "Movies" },
    { value: "technology", label: "Technology" }
  ];

  const permissionOptions = [
    { value: "read", label: "Read Access" },
    { value: "write", label: "Write Access" },
    { value: "admin", label: "Admin Access", disabled: true }
  ];

  const notificationOptions = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "Push Notification" },
    { value: "desktop", label: "Desktop Notification" }
  ];

  const featureOptions = [
    { value: "analytics", label: "Analytics Dashboard" },
    { value: "reporting", label: "Advanced Reporting" },
    { value: "api", label: "API Access" }
  ];

  const basicOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];

  // Auto-wrap demo options (more than 3)
  const accountPrivilegeOptions = [
    { value: "audit", label: "Audit Trail" },
    { value: "2fa", label: "2FA" },
    { value: "credit", label: "Daily Credit Limit" },
    { value: "mask", label: "Mask Data" }
  ];

  const channelOptions = [
    { value: "sms", label: "SMS" },
    { value: "voice", label: "Voice" },
    { value: "pull", label: "Pull" }
  ];

  const smsSettingsOptions = [
    { value: "latency", label: "Latency Report" },
    { value: "update", label: "Update Manual Delivery" },
    { value: "config", label: "Configuration" },
    { value: "maker", label: "Maker Checker" },
    { value: "callback", label: "Callback Configuration" },
    { value: "gateway", label: "Gateway Retry Limit" },
    { value: "petm", label: "PE-TM" },
    { value: "shorturl", label: "Short Url" }
  ];

  return (
    <div className="form-showcase">
      <h2>Checkbox Example Form</h2>

      <div className="form-group">
        <h3>Default</h3>
        <Checkbox
          name="interests"
          options={interestOptions}
          value={interests}
          onChange={setInterests}
          label="Select Your Interests"
          required
        />
      </div>

      <div className="form-group">
        <h3>Focused</h3>
        <Checkbox
          name="permissions"
          options={permissionOptions}
          value={permissions}
          onChange={setPermissions}
          label="User Permissions"
          infoTip="Admin access is coming soon"
        />
      </div>

      <div className="form-group">
        <h3>Activated (Inline)</h3>
        <Checkbox
          name="notifications"
          options={notificationOptions}
          value={notifications}
          onChange={setNotifications}
          label="Notification Preferences"
          inline
        />
      </div>

      <div className="form-group">
        <h3>Activated (Vertical)</h3>
        <Checkbox
          name="features"
          options={featureOptions}
          value={features}
          onChange={setFeatures}
          label="Enable Features"
        />
      </div>

      <div className="form-group">
        <h3>Inactive</h3>
        <Checkbox
          name="disabled"
          options={basicOptions}
          value={[]}
          onChange={() => {}}
          label="Disabled Options"
          disabled
        />
      </div>

      <div className="form-group">
        <h3>Error</h3>
        <Checkbox
          name="error"
          options={basicOptions}
          value={errorOptions}
          onChange={setErrorOptions}
          label="Select Required Options"
          variant="error"
          message="Please select at least one option"
          required
        />
      </div>

      <div className="form-group">
        <h3>Warning</h3>
        <Checkbox
          name="warning"
          options={basicOptions}
          value={warningOptions}
          onChange={setWarningOptions}
          label="Select Options"
          variant="warning"
          message="These selections may affect your settings"
        />
      </div>

      <div className="form-group">
        <h3>Success</h3>
        <Checkbox
          name="success"
          options={basicOptions}
          value={successOptions}
          onChange={setSuccessOptions}
          label="Select Options"
          variant="success"
          message="Great choices!"
        />
      </div>

      <div className="form-group">
        <h3>Info</h3>
        <Checkbox
          name="info"
          options={basicOptions}
          value={infoOptions}
          onChange={setInfoOptions}
          label="Select Options"
          variant="info"
          message="Additional information about these selections"
          infoTip="This tooltip provides more context"
        />
      </div>

      <div className="form-group">
        <h3>Auto-Wrap Demo (4 options)</h3>
        <Checkbox
          name="account-privileges"
          options={accountPrivilegeOptions}
          value={accountPrivileges}
          onChange={setAccountPrivileges}
          label="Account Privileges"
        />
      </div>

      <div className="form-group">
        <h3>Channel (3 options - no wrap)</h3>
        <Checkbox
          name="channel"
          options={channelOptions}
          value={channelSettings}
          onChange={setChannelSettings}
          label="Channel"
        />
      </div>

      <div className="form-group">
        <h3>SMS Settings (8 options - auto-wrap)</h3>
        <Checkbox
          name="sms-settings"
          options={smsSettingsOptions}
          value={smsSettings}
          onChange={setSmsSettings}
          label="SMS Settings"
        />
      </div>

      {/* <div>
        <button onClick={() => navigate("/Example3")} className="btn">
          Go to Example 3
        </button>
      </div> */}
    </div>
  );
};

export default CheckboxShowcase;