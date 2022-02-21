import { useState, useEffect, useRef } from "react";

import * as mobilenet from "@tensorflow-models/mobilenet";

export default function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const imageRef = useRef();

  async function loadModel() {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  }
  function uploadImage(input) {
    const { files } = input.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  }

  useEffect(() => {
    loadModel();
  }, []);

  if (isModelLoading) {
    return <h2> Model is loading</h2>;
  }

  return (
    <div className="App">
      <h1>Image Identification</h1>
      <div className="inputholder">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
        />
      </div>
      <div className="mainWrapper">
        <div className="mainContente">
          <div className="imageHolder">
            {imageURL && (
              <img
                src={imageURL}
                alt="Upload Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>
        </div>
        {imageURL && <button className="button">Identify Image</button>}
      </div>
    </div>
  );
}
