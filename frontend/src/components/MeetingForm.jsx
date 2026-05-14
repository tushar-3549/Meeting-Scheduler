import React, { useState } from "react";
import { createMeeting } from "../api";

const MeetingForm = ({ onMeetingCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date + time into ISO datetime-local format (YYYY-MM-DDTHH:MM)
    const combinedStart = `${startDate}T${startTime}`;
    const combinedEnd = `${endDate}T${endTime}`;

    // Validate end is after start
    if (new Date(combinedEnd) <= new Date(combinedStart)) {
      alert("End time must be after start time");
      return;
    }

    const meetingData = {
      title,
      description,
      start_time: combinedStart,
      end_time: combinedEnd,
    };
    try {
      const data = await createMeeting(meetingData);
      onMeetingCreated(data.meeting_id); // Pass meeting ID to parent
    } catch (error) {
      alert("Error creating meeting");
    }
  };

  // Auto-fill end date when start date is picked
  const handleStartDateChange = (value) => {
    setStartDate(value);
    if (!endDate) {
      setEndDate(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Meeting</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Weekly Sync"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this meeting about?"
          required
        />
      </div>

      {/* Start Date & Time */}
      <div className="form-group">
        <label>Start Date & Time</label>
        <div className="datetime-row">
          <div className="datetime-field">
            <span className="datetime-icon">📅</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              required
            />
          </div>
          <div className="datetime-field">
            <span className="datetime-icon">🕐</span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* End Date & Time */}
      <div className="form-group">
        <label>End Date & Time</label>
        <div className="datetime-row">
          <div className="datetime-field">
            <span className="datetime-icon">📅</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              required
            />
          </div>
          <div className="datetime-field">
            <span className="datetime-icon">🕐</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <button type="submit">Create Meeting</button>
    </form>
  );
};

export default MeetingForm;

