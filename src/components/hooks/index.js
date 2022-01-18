import { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { useAuth } from "../authcomponents/contexts/AuthContext";

export const useTasks = (refresh) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [alltasks, setAlltasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", currentUser.uid);

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      setAlltasks(newTasks);
      setCompletedTasks(newTasks.filter((task) => task.done === true));
      setActiveTasks(newTasks.filter((task) => task.done === false));
    });

    return () => unsubscribe();
  }, [refresh]);

  return { alltasks,  completedTasks, activeTasks };
};
