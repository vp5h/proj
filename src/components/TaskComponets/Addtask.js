import React, { useState, useRef, useEffect } from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { firebase } from "../../firebase";
import { useAuth } from "../../components/authcomponents/contexts/AuthContext";
import { FaCheck, FaTimes, FaAngleDown } from "react-icons/fa";
import "./EachTask.css";

export const AddTask = ({ setRefresh, refresh }) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const { currentUser } = useAuth();
  const inputref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [checkState, setCheckState] = useState(false);

  const addTask = () => {
    return (
      task &&
      task.trim().length !== 0 &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          done: false,
          task,
          userId: currentUser.uid,
          Date: taskDate,
          comments: [],
          files:[]
        })
        .then((res) => {
          setTask("");
          setTaskDate("");
          setIsEditing(false);
          console.log(res);
          refresh ?? setRefresh(!refresh);
        })
    );
  };

  function HandleKeyUp(e) {
    if (e.key === "Enter") {
      addTask();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (isEditing === true) {
      inputref.current.focus();
    }
  }, [isEditing]);

  function doneAll() {
    
    const taskref = firebase.firestore().collection("tasks");

    taskref
      .where("userId", "==", currentUser.uid)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((task) => {
            taskref.doc(task.id).update({ done: !checkState });
          });
        }
      })
      .then((res) => {
        setRefresh(!refresh);
      });

    setCheckState(!checkState);
  }

  return (
    <div>
      {!isEditing ? (
        <ListGroup>
          <ListGroup.Item className="d-flex algin-center">
            <InputGroup>
              {/* {!checkState ? (
                <Form.Check
                  type="checkbox"
                  style={{ marginTop: "0.5rem" }}
                  onChange={() => {
                    doneAll();
                    // setCheckState(true)
                  }}
                />
              ) : (
                <Form.Check
                  type="checkbox"
                  checked
                  style={{ marginTop: "0.5rem" }}
                />
              )} */}

           
                <FaAngleDown className="allTask" onClick={()=>{   doneAll()}}/>
          

              <FormControl
                placeholder="Add todo and Press Enter"
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            </InputGroup>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div
          className="Tasks_Edit"
          // onMouseLeave={() => setIsEditing(false)}
        >
          <InputGroup key={task.id} className="Tasks_Edit-input">
            <FormControl
              className="w-100 Tasks_Edit-input"
              as="textarea"
              ref={inputref}
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
              onKeyUp={(e) => {
                HandleKeyUp(e);
              }}
            />
            <div className="d-flex w-100 mt-2 justify-content-between flex-wrap">
              <Form.Control
                style={{ maxWidth: "11rem" }}
                className="flex-shrink-1"
                value={task.Date}
                onChange={(e) => {
                  setTaskDate(e.target.value);
                }}
                type="date"
                name="date_of_birth"
              />
              <div>
                <Button
                  variant="danger m-1"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  <FaTimes />
                </Button>
                <Button
                  variant="success m-1"
                  onClick={() => {
                    addTask();
                  }}
                >
                  <FaCheck />
                </Button>
              </div>
            </div>
          </InputGroup>
        </div>
      )}
    </div>
  );
};
