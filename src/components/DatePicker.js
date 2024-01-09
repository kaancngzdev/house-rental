import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ onDateChange }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    onDateChange([date, selectedEndDate]);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    onDateChange([selectedStartDate, date]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Start Date"
          value={selectedStartDate}
          onChange={(date) => handleStartDateChange(date)}
        />
        <DatePicker
          label="End Date"
          value={selectedEndDate}
          onChange={(date) => handleEndDateChange(date)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}