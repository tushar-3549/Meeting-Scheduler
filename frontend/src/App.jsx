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
    <div>
      <h1>Meeting Scheduler</h1>
      {!meetingId ? (
        <MeetingForm onMeetingCreated={handleMeetingCreated} />
      ) : (
        <>
          <ParticipantForm meetingId={meetingId} />
          <ExportICSButton meetingId={meetingId} />
        </>
      )}
    </div>
  );
};

export default App;
