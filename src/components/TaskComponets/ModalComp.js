import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  ListGroup,
  Image,
} from "react-bootstrap";
import EachTask from "./EachTask";
import { firebase } from "../../firebase";
import UploadComponent from './UploadComponent'
import "./Modal.css";

const ModalComp = ({ showModal, setShowModal, task }) => {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState(
    !task.comments ? [] : task.comments
  );
  const [allfiles, setAllfiles] = useState(!task.files ? [] : task.files);


  useEffect(() => {
    setAllComments(task.comments);
    setAllfiles(task.files)
  }, [task]);

  function AddComment() {
    firebase
      .firestore()
      .collection("tasks")
      .doc(task.id)
      .update({
        comments: [comment, ...allComments],
      });
  }

  function HandleKeyUp(e) {
    if (e.key === "Enter") {
    //   console.log(comment);
      AddComment();
      setComment("");
    } else if (e.key === "Escape") {
      //   setIsEditing(false);
    }
  }

  return (
    <div>
      {showModal ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EachTask task={task} inmodal={true} />

          
            <UploadComponent task={task} allfiles={allfiles}/>

            <div className="w-100">
              {allfiles?allfiles.map((file) => (
                  file.url?
                      
                <a href={file.url} rel="noreferrer" target="_blank">
                  <Image className="rounded-top image border border-dark p-1" src={file.url} />
                </a>:null
                  
              )):null}
            </div>

            <ListGroup className="mt-2">
              {allComments?.map((comm) => {
                return (
                  <>{comm ? <ListGroup.Item>{comm}</ListGroup.Item> : null}</>
                );
              })}
            </ListGroup>

            <InputGroup className="mt-3">
              <FormControl
                placeholder="Add comment and press Enter"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                onKeyUp={(e) => {
                  HandleKeyUp(e);
                }}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
};

export default ModalComp;
