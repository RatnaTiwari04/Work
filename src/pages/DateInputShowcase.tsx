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
  
  // New time-related state variables
  const [dateTime12, setDateTime12] = useState("");
  const [dateTime24, setDateTime24] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [meetingDateTime, setMeetingDateTime] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  
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

  // Quick datetime options for time-enabled inputs
  const quickDateTimeOptions = [
    { label: "Now", value: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` },
    { label: "Tomorrow 9 AM", value: `${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US')} 09:00 AM` },
    { label: "Next Week 2 PM", value: `${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US')} 02:00 PM` }
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

      {/* NEW TIME PICKER EXAMPLES */}
      <div className="form-group">
        <h3>DateTime Picker (12-hour format)</h3>
        <DateInput
          label="Meeting Date & Time"
          value={dateTime12}
          onChange={setDateTime12}
          placeholder="Select date and time"
          labelPosition="external"
          showTime={true}
          timeFormat="12"
          defaultTime="09:00 AM"
          infoTip="Choose meeting date and time (12-hour format)"
          highlightToday
        />
      </div>

      <div className="form-group">
        <h3>DateTime Picker (24-hour format)</h3>
        <DateInput
          label="Event Schedule"
          value={dateTime24}
          onChange={setDateTime24}
          placeholder="Select date and time"
          labelPosition="external"
          showTime={true}
          timeFormat="24"
          defaultTime="14:00"
          dateFormat="DD/MM/YYYY"
          infoTip="Choose event date and time (24-hour format)"
          variant="info"
          message="Using European date format with 24-hour time"
        />
      </div>

      <div className="form-group">
        <h3>Appointment Booking with Time</h3>
        <DateInput
          label="Appointment Date & Time"
          value={appointmentDateTime}
          onChange={setAppointmentDateTime}
          placeholder="Book your appointment"
          labelPosition="internal"
          showTime={true}
          timeFormat="12"
          minuteStep={15}
          quickDateOptions={quickDateTimeOptions}
          infoTip="Book appointment with 15-minute intervals"
          highlightToday
          highlightWeekends
          required
        />
      </div>

      <div className="form-group">
        <h3>Meeting Scheduler</h3>
        <DateInput
          label="Meeting Time"
          value={meetingDateTime}
          onChange={setMeetingDateTime}
          placeholder="Schedule meeting"
          labelPosition="middle"
          showTime={true}
          timeFormat="12"
          minDate={new Date().toLocaleDateString('en-US')}
          infoTip="Schedule meeting for future dates only"
          variant="success"
          message="Available for booking"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <h3>Event Start Time</h3>
          <DateInput
            label="Start Date & Time"
            value={eventStartTime}
            onChange={setEventStartTime}
            placeholder="Event start"
            labelPosition="external"
            showTime={true}
            timeFormat="12"
            variant="info"
            message="Select the event start time"
          />
        </div>
        
        <div className="form-group">
          <h3>Event End Time</h3>
          <DateInput
            label="End Date & Time"
            value={eventEndTime}
            onChange={setEventEndTime}
            placeholder="Event end"
            labelPosition="external"
            showTime={true}
            timeFormat="12"
            minDate={eventStartTime ? eventStartTime.split(' ')[0] : undefined}
            variant="info"
            message="Select the event end time"
          />
        </div>
      </div>

      {/* EXISTING EXAMPLES CONTINUE */}
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