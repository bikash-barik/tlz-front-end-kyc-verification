import React, { useState, useRef, useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import './App.css'; // Import the CSS file

const UploadPhoto = () => {
  const [activeCapture1, setActiveCapture1] = useState(false);
  const [activeCapture2, setActiveCapture2] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [fileName1, setFileName1] = useState('');
  const [fileName2, setFileName2] = useState('');
  const [uploadSuccess1, setUploadSuccess1] = useState(null);
  const [uploadSuccess2, setUploadSuccess2] = useState(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  useEffect(() => {
    if (fileName1) {
      handleUpload1();
    }
  }, [fileName1]);

  useEffect(() => {
    if (fileName2) {
      handleUpload2();
    }
  }, [fileName2]);

  const handleCapture = async (imageSrc) => {
    try {
      const file = await createFileFromImage(imageSrc);
      if (activeCapture1) {
        simulateFileUpload(file, fileInputRef1);
        setFileName1(file.name);
        setActiveCapture1(false);
      } else if (activeCapture2) {
        simulateFileUpload(file, fileInputRef2);
        setFileName2(file.name);
        setActiveCapture2(false);
      }
    } catch (error) {
      console.error('Capture error:', error);
    }
  };

  const createFileFromImage = async (imageSrc) => {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    return new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
  };

  const simulateFileUpload = (file, fileInputRef) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInputRef.current.files = dataTransfer.files;
    console.log('Simulated file upload:', fileInputRef.current.files);
  };

  const handleUpload1 = async () => {
    if (!fileInputRef1.current.files.length) return;

    setUploading1(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading1(false);
      setUploadSuccess1(true);
      console.log('Upload 1 success');
    }, 2000);
  };

  const handleUpload2 = async () => {
    if (!fileInputRef2.current.files.length) return;

    setUploading2(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading2(false);
      setUploadSuccess2(true);
      console.log('Upload 2 success');
    }, 2000);
  };

  return (
    <div className="upload-photo">
      <div className="photo-section">
        <div className="button-wrapper">
          <button
            onClick={() => setActiveCapture1(true)}
            disabled={activeCapture2}
          >
            Capture Photo 1
          </button>
          {uploading1 && <p>Uploading Photo 1...</p>}
          {uploadSuccess1 && <p>Upload 1 Successful!</p>}
          {uploadSuccess1 === false && <p>Upload 1 Failed. Try Again.</p>}
        </div>
        <div className="button-wrapper">
          <button
            onClick={() => setActiveCapture2(true)}
            disabled={activeCapture1}
          >
            Capture Photo 2
          </button>
          {uploading2 && <p>Uploading Photo 2...</p>}
          {uploadSuccess2 && <p>Upload 2 Successful!</p>}
          {uploadSuccess2 === false && <p>Upload 2 Failed. Try Again.</p>}
        </div>
      </div>
      {(activeCapture1 || activeCapture2) && (
        <WebcamCapture onCapture={handleCapture} />
      )}
      <input
        type="file"
        ref={fileInputRef1}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={fileInputRef2}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadPhoto;
