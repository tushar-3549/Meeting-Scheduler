import React, { useState, useEffect } from "react";
import MeetingForm from "./components/MeetingForm";
import ParticipantForm from "./components/ParticipantForm";
import ExportICSButton from "./components/ExportICSButton";
import AuthForm from "./components/AuthForm";

const App = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("adminUser"));

  const handleAuthSuccess = (username) => {
    setUser(username);
    localStorage.setItem("adminUser", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
    setMeetingId(null);
  };

  const handleMeetingCreated = (newMeetingId) => {
    setMeetingId(newMeetingId);
  };

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app-container">
      <div className="header-actions">
        <span className="user-badge">Admin: {user}</span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
      <h1>Meeting Scheduler</h1>
      <div className="glass-card">
        {!meetingId ? (
          <MeetingForm onMeetingCreated={handleMeetingCreated} />
        ) : (
          <>
            <ParticipantForm meetingId={meetingId} />
            <div className="export-section">
              <ExportICSButton meetingId={meetingId} />
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => setMeetingId(null)}
              style={{ marginTop: '1rem' }}
            >
              Create Another Meeting
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

