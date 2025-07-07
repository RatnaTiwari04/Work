import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextInput from "../components/TextInput";

function Example2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate=useNavigate();

  return (
    <div className="form-showcase">
      <h2>Two Column internal Label Form</h2>
      <div className="form-row">
        <TextInput
          label="First name"
          value={firstName}
          onChange={setFirstName}
          placeholder="First name"
          labelPosition="internal"
        />
        <TextInput
          label="Last name"
          value={lastName}
          onChange={setLastName}
          placeholder="Last name"
          labelPosition="internal"
        />
      </div>
      <div >
        <button onClick={() => navigate("/Example3")} className="btn">
          Go to Example 3
        </button>
      </div>
    </div>
  );
}

export default Example2

