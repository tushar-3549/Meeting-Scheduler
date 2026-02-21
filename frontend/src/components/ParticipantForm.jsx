// import React, { useState } from "react";
// import { addParticipant } from "../api";

// const ParticipantForm = ({ meetingId }) => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const participantData = { meeting_id: meetingId, email };

//       try {
//         const data = await addParticipant(participantData);
//         setMessage("Participant added successfully");
//         setEmail("");
//       } catch (error) {
//         setMessage("Error adding participant or conflict detected");
//       }
//     };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add Participant</h3>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Add Participant</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default ParticipantForm;

import React, { useState } from "react";
import { addParticipant } from "../api";

const ParticipantForm = ({ meetingId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAddParticipant = async (e) => {
    e.preventDefault();

    const participantData = {
      meeting_id: meetingId,
      email: email,
    };

    try {
      const data = await addParticipant(participantData);
      if (data) {
        setMessage("Participant added successfully and email sent!");
        setEmail("");
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
    <form onSubmit={handleAddParticipant}>
      <h3>Add Participant</h3>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Participant</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ParticipantForm;
