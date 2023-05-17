import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector(props) {
  var message="Hello";
  // const handleStartDate=(date)=>
  // {
  //   props.handleCallBackStart(date);
  //   setStartDate(date);
  // }

  // const handleEndDate=(date)=>{
  //   props.handlCallBackEnd(date);
  //   setEndDate(date);
  // }
 
  return (
    <div className="date-selector">
      <label htmlFor="from-date">From:</label>
      <DatePicker
        selected={props.startDate}
        onChange={(date)=>props.handleCallBackStart(date)}
        selectsStart
        startDate={props.startDate}
        endDate={props.endDate}
        dateFormat="dd/MM/yyyy"
        id="from-date"
        className="date-picker"
      />
      <label htmlFor="to-date">To:</label>
      <DatePicker
        selected={props.endDate}
        onChange={(date)=>props.handlCallBackEnd(date)}
        selectsEnd
        startDate={props.startDate}
        endDate={props.endDate}
        minDate={props.startDate}
        dateFormat="dd/MM/yyyy"
        id="to-date"
        className="date-picker"
      />
    </div>
  );
}

export default DateSelector;
