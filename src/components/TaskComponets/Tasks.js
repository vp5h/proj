import React, { useState } from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { AddTask } from "./Addtask";
import { Link } from "react-router-dom";
import { useTasks } from "../hooks/index";
import EachTask from "./EachTask";
import "./task.css";

const Tasks = () => {
  const [refresh, setRefresh] = useState(false);
  const { alltasks, completedTasks, activeTasks } = useTasks(refresh);
  const [currentList, setCurrentList] = useState("All");

  return (
    <Container
      className="d-flex  justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div>
        <p
          className="text-center mb-4"
          style={{ color: "#EDDFDF", fontSize: "7rem", fontWeight: "100" }}
        >
          todos
        </p>
        <Card className="cardlist">
          <Card.Body>
            <AddTask setRefresh={setRefresh} refresh={refresh} />

            <ListGroup>
              <ListGroup.Item>
                <div className="d-flex w-100 p-1 justify-content-between">
                  <div className="d-flex w-50 justify-content-around p-3">
                    {activeTasks.length > 1
                      ? activeTasks.length + " Items left"
                      : activeTasks.length + " Item left"}
                  </div>
                  <div className="d-flex w-100 justify-content-center">
                    {currentList === "All" ? (
                      <Button
                        className="m-2"
                        variant="success"
                        onClick={() => setCurrentList("All")}
                      >
                        All
                      </Button>
                    ) : (
                      <Button
                        className="m-2"
                        onClick={() => setCurrentList("All")}
                      >
                        All
                      </Button>
                    )}

                    {currentList === "Active" ? (
                      <Button
                        className="m-2"
                        variant="success"
                        onClick={() => setCurrentList("Active")}
                      >
                        Active
                      </Button>
                    ) : (
                      <Button
                        className="m-2"
                       
                        onClick={() => setCurrentList("Active")}
                      >
                        Active
                      </Button>
                    )}

                    {currentList === "Completed" ? (
                      <Button
                        className="m-2"
                        variant="success"
                        onClick={() => setCurrentList("Completed")}
                      >
                        Completed
                      </Button>
                    ) : (
                      <Button
                        className="m-2"
                        onClick={() => setCurrentList("Completed")}
                      >
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              </ListGroup.Item>

              {currentList === "All"
                ? alltasks.map((task) => {
                    return (
                      <EachTask
                        key={task.id}
                        task={task}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                    );
                  })
                : currentList === "Active"
                ? activeTasks.map((task) => {
                    return (
                      <EachTask
                        key={task.id}
                        task={task}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                    );
                  })
                : currentList === "Completed"
                ? completedTasks.map((task) => {
                    return (
                      <EachTask
                        inmodal={false}
                        key={task.id}
                        task={task}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                    );
                  })
                : null}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Tasks;
