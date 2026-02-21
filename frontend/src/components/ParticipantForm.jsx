import React, { useState } from "react";
import { addParticipant } from "../api";

const ParticipantForm = ({ meetingId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState([]); // In-memory list for demo purposes

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    const participantData = { meeting_id: meetingId, email };

    try {
      const data = await addParticipant(participantData);
      if (data) {
        setMessage("Participant added successfully!");
        setParticipants([...participants, { email, status: "Pending" }]);
        setEmail("");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding participant", error);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Error adding participant or conflict detected");
      }
    }
  };

  return (
    <div>
      <h2>Manage Participants</h2>
      <form onSubmit={handleAddParticipant}>
        <div className="form-group">
          <label>Participant Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. colleague@example.com"
            required
          />
        </div>
        <button type="submit" className="btn-primary">Add Participant</button>
      </form>

      {message && (
        <p style={{ 
          marginTop: "1rem", 
          fontSize: "0.875rem", 
          color: message.includes("Error") ? "var(--error)" : "var(--success)",
          textAlign: "center"
        }}>
          {message}
        </p>
      )}

      <div className="participant-list">
        {participants.length > 0 && <h3>Current Participants</h3>}
        {participants.map((p, index) => (
          <div key={index} className="participant-item">
            <span className="participant-email">{p.email}</span>
            <span className="status-badge status-pending">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantForm;
