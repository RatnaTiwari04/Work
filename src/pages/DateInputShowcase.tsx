import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import DateInput from "../components/DateInput/DateInput";

const DateInputShowcase = () => {
  const [internal, setInternal] = useState("");
  const [external, setExternal] = useState("");
  const [middle, setMiddle] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [error, setError] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [withQuickDates, setWithQuickDates] = useState("");
  const [readOnly] = useState("01/15/2025");
  const [manualInput, setManualInput] = useState("");
  const [differentFormat, setDifferentFormat] = useState("");
  const [withMinMax, setWithMinMax] = useState("");
  
  const focusedInputRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusedInputRef.current) {
        focusedInputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const quickDateOptions = [
    { label: "Today", value: new Date().toLocaleDateString('en-US') },
    { label: "Tomorrow", value: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US') },
    { label: "Next Week", value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US') },
    { label: "Next Month", value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toLocaleDateString('en-US') }
  ];

  const disabledDates = [
    "01/20/2025",
    "01/21/2025",
    "01/22/2025"
  ];

  return (
    <div className="form-showcase">
      <h2>DateInput Example Form</h2>

      <div className="form-group">
        <h3>Default</h3>
        <DateInput 
          placeholder="Select a date"
          value={defaultValue}
          onChange={setDefaultValue}
          allowManualInput
          dateFormat="MM/DD/YYYY"
        />
      </div>

      <div className="form-group">
        <h3>Disabled</h3>
        <DateInput
          placeholder="Select a date"
          disabled
          value="01/15/2025"
        />
      </div>

      <div className="form-group">
        <h3>Internal Label</h3>
        <DateInput
          label="Date of Birth"
          value={internal}
          onChange={setInternal}
          placeholder="Select your birth date"
          labelPosition="internal"
          infoTip="This is your date of birth for verification"
          required
        />
      </div>

      <div className="form-group">
        <h3>External Label</h3>
        <DateInput
          label="Appointment Date"
          value={external}
          onChange={setExternal}
          placeholder="Select appointment date"
          labelPosition="external"
          infoTip="Choose your preferred appointment date"
          highlightToday
          highlightWeekends
        />
      </div>

      <div className="form-group">
        <h3>Middle Label</h3>
        <DateInput
          label="Event Date"
          value={middle}
          onChange={setMiddle}
          placeholder="Select event date"
          labelPosition="middle"
          infoTip="This is the main event date"
        />
      </div>

      <div className="form-group">
        <h3>Error State</h3>
        <DateInput
          label="Due Date"
          placeholder="Select due date"
          value={error}
          onChange={setError}
          variant="error"
          message="This field is required"
          labelPosition="internal"
          required
        />
      </div>

      <div className="form-group">
        <h3>Different Format (YYYY/MM/DD)</h3>
        <DateInput
          label="European Format"
          value={differentFormat}
          onChange={setDifferentFormat}
          placeholder="YYYY/MM/DD"
          dateFormat="DD/MM/YYYY"
          labelPosition="external"
          infoTip="Date in European format"
        />
      </div>

      <div className="form-group">
        <h3>With Min/Max Dates</h3>
        <DateInput
          label="Valid Date Range"
          value={withMinMax}
          onChange={setWithMinMax}
          placeholder="Select date within range"
          minDate="01/01/2025"
          maxDate="12/31/2025"
          labelPosition="external"
          infoTip="Only dates in 2025 are allowed"
        />
      </div>

      <div className="form-group">
        <h3>With Quick Date Options</h3>
        <DateInput
          label="Quick Select Date"
          value={withQuickDates}
          onChange={setWithQuickDates}
          placeholder="Select or choose quick date"
          quickDateOptions={quickDateOptions}
          labelPosition="external"
          infoTip="Use quick options or calendar"
        />
      </div>

      <div className="form-group">
        <h3>Manual Input Only</h3>
        <DateInput
          label="Manual Date Entry"
          value={manualInput}
          onChange={setManualInput}
          placeholder="Type date (MM/DD/YYYY)"
          showCalendar={false}
          allowManualInput={true}
          labelPosition="external"
          infoTip="Type the date manually"
        />
      </div>

      <div className="form-group">
        <h3>Read Only</h3>
        <DateInput
          label="Fixed Date"
          value={readOnly}
          placeholder="This date cannot be changed"
          readOnly
          labelPosition="external"
          infoTip="This date is read-only"
        />
      </div>

      <div className="form-group">
        <h3>With Disabled Dates</h3>
        <DateInput
          label="Available Dates"
          value=""
          onChange={() => {}}
          placeholder="Some dates are disabled"
          disabledDates={disabledDates}
          labelPosition="external"
          infoTip="Jan 20-22, 2025 are unavailable"
          variant="warning"
          message="Some dates in January are not available"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <h3>Date Range Start</h3>
          <DateInput
            label="Start Date"
            value={rangeStart}
            onChange={setRangeStart}
            placeholder="Select start date"
            labelPosition="external"
            variant="info"
            message="Select the beginning of your date range"
          />
        </div>
        
        <div className="form-group">
          <h3>Date Range End</h3>
          <DateInput
            label="End Date"
            value={rangeEnd}
            onChange={setRangeEnd}
            placeholder="Select end date"
            labelPosition="external"
            minDate={rangeStart}
            variant="info"
            message="Select the end of your date range"
          />
        </div>
      </div>

      <div className="form-group">
        <h3>Success State</h3>
        <DateInput
          label="Confirmed Date"
          value="01/25/2025"
          placeholder="Date confirmed"
          variant="success"
          message="Date has been confirmed successfully"
          labelPosition="external"
          readOnly
        />
      </div>

      {/* <div>
        <button onClick={() => navigate("/Example2")} className="btn">
          Go to Example 2
        </button>
      </div> */}
    </div>
  );
};

export default DateInputShowcase;