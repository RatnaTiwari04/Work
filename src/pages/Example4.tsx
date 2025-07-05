import React, {useState} from "react";
import TextInput from "../components/TextInput";

function Example4()
 {
    const [internal,setinternal]=useState("Welcome to onextel readonly component");
  return (
    <div className="form-showcase">
      <h2>Readonly Example</h2>
      <div className="form-group">
        <TextInput
          label="Label"
          value={internal}
          onChange={setinternal}
          labelPosition="external"
          MAX_INPUT_LENGTH={50}
          readOnly
        />
      </div>
    </div>
  )
}

export default Example4

