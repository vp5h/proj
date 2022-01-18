import React, { useState, useRef, useEffect } from "react";
import {
  InputGroup,
  ListGroup,
  FormControl,
  Form,
  Dropdown,
  Button,
} from "react-bootstrap";
import { FaRegTrashAlt, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { firebase } from "../../firebase";
import { AuthProvider } from "../authcomponents/contexts/AuthContext";
import CheckBox from "./CheckBox";
import ModalComp from "./ModalComp";
import "./EachTask.css";

const EachTask = ({ task, inmodal }) => {
  const [editView, setEditView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedvalue] = useState(task.task);
  const [taskdate, setTaskDate] = useState(task.Date);
  const [showModal, setShowModal] = useState(false);
  const inputref = useRef(null);

  const deleteTask = () => {
    try {
      firebase.firestore().collection("tasks").doc(task.id).delete();
    } catch (err) {
      console.log(err);
    }
  };

  const EditTask = () => {
    try {
      firebase
        .firestore()
        .collection("tasks")
        .doc(task.id)
        .update({ task: editedValue })
        .then(() => {
          setIsEditing(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  function HandleKeyUp(e) {
    if (e.key === "Enter") {
      EditTask();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  }

  function onEditConfirm() {
    try {
      firebase
        .firestore()
        .collection("tasks")
        .doc(task.id)
        .update({ Date: taskdate, task: editedValue })
        .then(() => {
          setIsEditing(false);
          setEditView(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isEditing === true) {
      inputref.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      onMouseEnter={() => setEditView(true)}
      onMouseLeave={() => setEditView(false)}
      key={task.id}
    >
      {editView && !isEditing ? (
        <ListGroup.Item className="d-flex" key={task.id}>
          <CheckBox task={task} />
          <div className="Task">
            <div
              onClick={(e) => {
                if (inmodal === true) {
                  setIsEditing(true);
                } else {
                  setShowModal(true);
                }
              }}
            >
              {task.done?<strike>{task.task}</strike>:<>{task.task}</>}
            </div>
          </div>
          <div className="Task_icons">
            <FaPencilAlt
              className="icons"
              style={{ marginRight: "0.8rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            />
            <FaRegTrashAlt
              className="icons"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask();
              }}
            />
          </div>
        </ListGroup.Item>
      ) : isEditing ? (
        <div
          className="Tasks_Edit"
          // onMouseLeave={() => setIsEditing(false)}
        >
          <InputGroup key={task.id} className="Tasks_Edit-input">
            <FormControl
              className="w-100 Tasks_Edit-input"
              as="textarea"
              ref={inputref}
              row={10}
              value={editedValue}
              onChange={(e) => {
                setEditedvalue(e.target.value);
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
                name="TaskDueDate"
              />
              <div>
                <Button
                  variant="danger m-1"
                  onClick={() => {
                    setIsEditing(false);
                    setEditView(false);
                  }}
                >
                  <FaTimes />
                </Button>
                <Button
                  variant="success m-1"
                  onClick={() => {
                    onEditConfirm();
                  }}
                >
                  <FaCheck />
                </Button>
              </div>
            </div>
          </InputGroup>
        </div>
      ) : (
        <ListGroup.Item key={task.id} className="d-flex">
          <CheckBox task={task} />

          <div className="Task">  {task.done?<strike>{task.task}</strike>:<>{task.task}</>}</div>
          <div className="Task_date">{task.Date}</div>
        </ListGroup.Item>
      )}

      <ModalComp
        task={task}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default EachTask;
