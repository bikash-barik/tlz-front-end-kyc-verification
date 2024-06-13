import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef1 = useRef(null);
  const webcamRef2 = useRef(null);
  const [isCameraOpen1, setIsCameraOpen1] = useState(false);
  const [isCameraOpen2, setIsCameraOpen2] = useState(false);
  const [capturedImage1, setCapturedImage1] = useState(null);
  const [capturedImage2, setCapturedImage2] = useState(null);
  const [fileName1, setFileName1] = useState(null);
  const [fileName2, setFileName2] = useState(null);

  const openCamera1 = () => {
    setIsCameraOpen1(true);
  };

  const openCamera2 = () => {
    setIsCameraOpen2(true);
  };

  const capturePhoto1 = () => {
    const imageSrc = webcamRef1.current.getScreenshot();
    setCapturedImage1(imageSrc);
    setIsCameraOpen1(false); // Close the camera after capturing
  };

  const capturePhoto2 = () => {
    const imageSrc = webcamRef2.current.getScreenshot();
    setCapturedImage2(imageSrc);
    setIsCameraOpen2(false); // Close the camera after capturing
  };

  const retakePhoto1 = () => {
    setCapturedImage1(null);
    setFileName1(null);
    setIsCameraOpen1(true); // Reopen the camera to retake
  };

  const retakePhoto2 = () => {
    setCapturedImage2(null);
    setFileName2(null);
    setIsCameraOpen2(true); // Reopen the camera to retake
  };

  const uploadPhoto1 = () => {
    if (!capturedImage1) return;

    // Convert base64 to Blob
    fetch(capturedImage1)
      .then(res => res.blob())
      .then(blob => {
        const timestamp = new Date().getTime();
        const newFileName = `photo1_${timestamp}.jpeg`;
        const file = new File([blob], newFileName, { type: "image/jpeg" });

        console.log(file);
        setFileName1(newFileName);
        setIsCameraOpen1(false);
        setCapturedImage1(null);
      });
  };

  const uploadPhoto2 = () => {
    if (!capturedImage2) return;

    fetch(capturedImage2)
      .then(res => res.blob())
      .then(blob => {
        const timestamp = new Date().getTime();
        const newFileName = `photo2_${timestamp}.jpeg`;
        const file = new File([blob], newFileName, { type: "image/jpeg" });

        console.log(file);
        setFileName2(newFileName);
        setIsCameraOpen2(false);
        setCapturedImage2(null);
      });
  };

  return (
    <div>
      <button onClick={openCamera1}>Open Camera 1</button>
      <button onClick={openCamera2}>Open Camera 2</button>

      {isCameraOpen1 && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef1}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button onClick={capturePhoto1}>Capture Photo</button>
        </div>
      )}

      {isCameraOpen2 && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef2}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button onClick={capturePhoto2}>Capture Photo</button>
        </div>
      )}

      {capturedImage1 && (
        <div>
          <img src={capturedImage1} alt="Captured 1" width={320} height={240} />
          <button onClick={retakePhoto1}>Retake Photo</button>
          <button onClick={uploadPhoto1}>Upload Photo 1</button>
        </div>
      )}

      {capturedImage2 && (
        <div>
          <img src={capturedImage2} alt="Captured 2" width={320} height={240} />
          <button onClick={retakePhoto2}>Retake Photo</button>
          <button onClick={uploadPhoto2}>Upload Photo 2</button>
        </div>
      )}

      {fileName1 && (
        <div>
          <p>Uploaded as: {fileName1}</p>
        </div>
      )}

      {fileName2 && (
        <div>
          <p>Uploaded as: {fileName2}</p>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
