import React, { useState} from "react";
import TextInput from "../components/TextInput";

function Example2() {
    const [internal, setinternal] = useState("");
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
        </div>
  )
}

export default Example2
