import React from "react";
import { exportICS } from "../api";

const ExportICSButton = ({ meetingId }) => {
  const handleExport = async () => {
    try {
      const icsFile = await exportICS(meetingId);
      const blob = new Blob([icsFile], { type: "text/calendar" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `meeting_${meetingId}.ics`;
      link.click();
    } catch (error) {
      alert("Error exporting ICS file");
    }
  };

  return <button onClick={handleExport}>Export as ICS</button>;
};

export default ExportICSButton;
