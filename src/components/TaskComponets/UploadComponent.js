import React, { useState } from "react";
import { storage, firebase } from "../../firebase";
import { Button } from "react-bootstrap";
const UploadComponent = ({ task, allfiles }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              firebase
                .firestore()
                .collection("tasks")
                .doc(task.id)
                .update({
                  files: [...allfiles, { type: "image", url: url }],
                });
              setProgress(0);
            });
        }
      );
    }
  };

  return (
    <div className="border mt-1">
      <div className="d-flex w-100 m-2 justify-content-center">
        {" "}
        <progress className="m-2" value={progress} max="100" />
      </div>
      <div className="d-flex w-100 m-2 justify-content-around">
        {" "}
        <input className="w-50" type="file" accept="image/png, image/gif, image/jpeg"  onChange={handleChange} />
        <Button className="" onClick={handleUpload}>Upload</Button>
      </div>
    </div>
  );
};

export default UploadComponent;
