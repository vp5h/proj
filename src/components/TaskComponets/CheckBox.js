import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { Form } from "react-bootstrap";
const CheckBox = ({ task }) => {
  const [isDone, SetIsDone] = useState(task.done);

  function HandleDone() {
    firebase.firestore().collection("tasks").doc(task.id).update({
      done: !isDone,
    });
    SetIsDone(!isDone);
  }

  useEffect(() => {
    SetIsDone(task.done);
  }, [task]);

  return (
    <div>
      {isDone ? (
        <Form.Check
          type="checkbox"
          checked
          onChange={() => {
            HandleDone();
          }}
        />
      ) : (
        <Form.Check
          type="checkbox"
          onChange={() => {
            HandleDone();
          }}
        />
      )}
    </div>
  );
};

export default CheckBox;
