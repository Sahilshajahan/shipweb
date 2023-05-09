import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="date-selector">
      <label htmlFor="from-date">From:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        id="from-date"
        className="date-picker"
      />
      <label htmlFor="to-date">To:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
        id="to-date"
        className="date-picker"
      />
    </div>
  );
}

export default DateSelector;
