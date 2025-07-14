import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import RadioButton from "../components/Radiobutton/Radiobutton";

const RadioButtonShowcase = () => {
  const [gender, setGender] = useState("");
  const [subscription, setSubscription] = useState("");
  const [priority, setPriority] = useState("");
  const [notification, setNotification] = useState("");
  const [errorOption, setErrorOption] = useState("");
  const [warningOption, setWarningOption] = useState("");
  const [successOption, setSuccessOption] = useState("");
  const [infoOption, setInfoOption] = useState("");
  // const navigate = useNavigate();

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ];

  const subscriptionOptions = [
    { value: "basic", label: "Basic Plan" },
    { value: "premium", label: "Premium Plan" },
    { value: "enterprise", label: "Enterprise Plan", disabled: true }
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" }
  ];

  const notificationOptions = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "Push Notification" },
    { value: "none", label: "No Notifications" }
  ];

  const errorOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];

  return (
    <div className="form-showcase">
      <h2>RadioButton Example Form</h2>

      <div className="form-group">
        <h3>Default</h3>
        <RadioButton
          name="gender"
          options={genderOptions}
          value={gender}
          onChange={setGender}
          label="Select Gender"
          required
        />
      </div>

      <div className="form-group">
        <h3>Focused</h3>
        <RadioButton
          name="subscription"
          options={subscriptionOptions}
          value={subscription}
          onChange={setSubscription}
          label="Choose Subscription"
          infoTip="Enterprise plan is coming soon"
        />
      </div>

      <div className="form-group">
        <h3>Activated (Inline)</h3>
        <RadioButton
          name="priority"
          options={priorityOptions}
          value={priority}
          onChange={setPriority}
          label="Set Priority"
          inline
        />
      </div>

      <div className="form-group">
        <h3>Activated (Vertical)</h3>
        <RadioButton
          name="notification"
          options={notificationOptions}
          value={notification}
          onChange={setNotification}
          label="Notification Preferences"
        />
      </div>

      <div className="form-group">
        <h3>Inactive</h3>
        <RadioButton
          name="disabled"
          options={errorOptions}
          value=""
          onChange={() => {}}
          label="Disabled Options"
          disabled
        />
      </div>

      <div className="form-group">
        <h3>Error</h3>
        <RadioButton
          name="error"
          options={errorOptions}
          value={errorOption}
          onChange={setErrorOption}
          label="Select an Option"
          variant="error"
          message="Please select a valid option"
          required
        />
      </div>

      <div className="form-group">
        <h3>Warning</h3>
        <RadioButton
          name="warning"
          options={errorOptions}
          value={warningOption}
          onChange={setWarningOption}
          label="Select an Option"
          variant="warning"
          message="This selection may affect your settings"
        />
      </div>

      <div className="form-group">
        <h3>Success</h3>
        <RadioButton
          name="success"
          options={errorOptions}
          value={successOption}
          onChange={setSuccessOption}
          label="Select an Option"
          variant="success"
          message="Great choice!"
        />
      </div>

      <div className="form-group">
        <h3>Info</h3>
        <RadioButton
          name="info"
          options={errorOptions}
          value={infoOption}
          onChange={setInfoOption}
          label="Select an Option"
          variant="info"
          message="Additional information about this selection"
          infoTip="This tooltip provides more context"
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

export default RadioButtonShowcase;