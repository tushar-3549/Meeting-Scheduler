import React, { useState } from "react";
import { createMeeting } from "../api";

const MeetingForm = ({ onMeetingCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meetingData = {
      title,
      description,
      start_time: startTime,
      end_time: endTime,
    };
    try {
      const data = await createMeeting(meetingData);
      onMeetingCreated(data.meeting_id); // Pass meeting ID to parent
    } catch (error) {
      alert("Error creating meeting");
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
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Meeting</button>
    </form>
  );
};

export default MeetingForm;
