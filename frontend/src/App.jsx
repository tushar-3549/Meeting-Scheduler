import React, { useState } from "react";
import MeetingForm from "./components/MeetingForm";
import ParticipantForm from "./components/ParticipantForm";
import ExportICSButton from "./components/ExportICSButton";

const App = () => {
  const [meetingId, setMeetingId] = useState(null);

  const handleMeetingCreated = (newMeetingId) => {
    setMeetingId(newMeetingId);
  };

  return (
    <div className="app-container">
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
          </>
        )}
      </div>
    </div>
  );
};

export default App;
