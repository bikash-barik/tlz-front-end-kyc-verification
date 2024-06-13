import axios from "axios";
import React, { useState } from "react";

const PassportOCR = () => {
  const [idPhoto, setIdPhoto] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Remove the data URL prefix if needed by the API
        const base64String = reader.result.split(',')[1];
        setIdPhoto(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const requestBody = {
      task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1",
      group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
      data: {
        document1: idPhoto,
        doc_type: "international_passport"
      }
    };

    try {
      const response = await axios.post('/v3/tasks/sync/extract/id_document', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'account-id': "dd7e2547a6fc/4031eab1-e666-4226-a86b-5b00f5a90a90",
          'api-key': "7564b808-7265-475d-805a-bb5fd3edd78a"
        }
      });

      if (response.status === 200) {
        console.log("Verification successful");
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      setError(error.message);
      console.error('Request failed:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={!idPhoto}>Verify</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default PassportOCR;
