import React, { useState} from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

function Example2() {
    const [internal, setinternal] = useState("");
    const navigate = useNavigate();
  return (
    <div className="form-showcase">
      <h2>TextInput Internal label Form</h2>
      <div className="form-group">
        <h3>Internal</h3>
        <TextInput
        label="Label"
          value={internal}
          onChange={setinternal}
          placeholder="Place holder"
          labelPosition="internal"/>
        </div>
        <div >
        <button onClick={() => navigate("/Example3")} className="btn">
          Go to Example 3
        </button>
      </div>
        </div>
  )
}

export default Example2
