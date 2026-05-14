import React, { useState, useRef } from "react";
import { addParticipant, bulkAddParticipants } from "../api";

const ParticipantForm = ({ meetingId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    if (!email) return;

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
      setMessage(error.response?.data?.error || "Error adding participant");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setMessage("Uploading and processing CSV...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("meeting_id", meetingId);

    try {
      const data = await bulkAddParticipants(formData);
      setMessage(data.message);
      
      // Update UI with successfully added count (for now just showing a message)
      // In a real app, you might want to fetch the updated participant list
      if (data.added_count > 0) {
        // Just as a placeholder, we could fetch or assume they are added
        // For simplicity, let's just keep the list as is or show a bulk entry
        setParticipants([...participants, { email: `Bulk Upload (${data.added_count} users)`, status: "Added" }]);
      }
    } catch (error) {
      console.error("Error uploading CSV", error);
      setMessage("Error uploading CSV file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="participant-container">
      <h2>Manage Participants</h2>
      
      <div className="participant-entry-grid">
        <form onSubmit={handleAddParticipant} className="email-entry-form">
          <div className="form-group">
            <label>Individual Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. colleague@example.com"
              required={!isUploading}
            />
            <button type="submit" className="btn-primary add-btn-individual">Add</button>
          </div>

        </form>

        <div className="divider-or">
          <span>OR</span>
        </div>

        <div className="csv-upload-section">
          <div className="form-group">
            <label>Bulk Upload (CSV)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="btn-secondary csv-label">
                {isUploading ? "Processing..." : "📁 Choose CSV"}
              </label>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <p className={`status-msg ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </p>
      )}

      <div className="participant-list">
        {participants.length > 0 && <h3>Current Participants</h3>}
        {participants.map((p, index) => (
          <div key={index} className="participant-item">
            <span className="participant-email">{p.email}</span>
            <span className={`status-badge ${p.status === "Added" ? "status-success" : "status-pending"}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantForm;
