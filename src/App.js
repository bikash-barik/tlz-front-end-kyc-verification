import { useEffect, useState } from "react";
import axios from 'axios';
import WebcamCapture from "./WebcamCapture";
import FileUpload from "./FileUpload";
import Passportocr from "./Passportocr";
//import {secretkid, secretkey} from './envConfig'

function App() {
  const secretkid = "9fbaf3ee-39bd-43e4-b464-7b710ecdf303"
  const secretkey = "k9Aac5Nk23whIZEfb1330+nZ"
  const [liveImage1, setLiveImage1] = useState(null);
    const [liveImage2, setLiveImage2] = useState(null);
    const [idPhoto, setIdPhoto] = useState(null);
    const [result, setResult] = useState('');

    const handleFileChange = (event, setImage) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };        reader.readAsDataURL(file);
        console.log(secretkey, "getting")
    };
   
    
    const handleSubmit = async () => {
        const requestBody = {
            liveimage1: liveImage1,
            liveimage2: liveImage2,
            idphoto: idPhoto
        };
        try {
            const response = await axios.post('/extension/photoverify', requestBody, {
                headers: {
                    'Authorization': `Basic ${btoa(`${secretkid}:${secretkey}`)}`,
                    'Content-Type': 'application/json',}});
            if (response.status === 200) {
              console.log(response);
                if (response.data === true) {
                    setResult('Live images do match the ID photo');
                    console.log("------------------")
                } else {
                    setResult('Live images do not match the ID photo');
                    console.log("------------------==fgfmngbjfhgj")
                }
            } else {
                setResult(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Request failed:', error);
            setResult('Request failed');
            console.log(secretkey, "getting")
        }
    };
  return (
            <div><h1>Photo Verification</h1>
            {/* <Passportocr/> */}
           
            <input type="file" accept="image/png" onChange={(e) => handleFileChange(e, setLiveImage1)} />
            <input type="file" accept="image/png" onChange={(e) => handleFileChange(e, setLiveImage2)} />
            <input type="file" accept="image/png" onChange={(e) => handleFileChange(e, setIdPhoto)} />
            <button onClick={handleSubmit}>Verify</button><p>{result}</p>
            </div>  );
}
export default App;
