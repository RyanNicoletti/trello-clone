import React, { useState, useEffect } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import taskApiService from "../../services/task-api-service";
import "./tasklist.css";
import listApiService from "../../services/list-api-service";

const TaskList = (props) => {
  const [showInput, setInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setErrorMessage] = useState({ errorMessage: null });

  useEffect(() => {
    const fetchTasks = async (listId) => {
      const res = await taskApiService.getAllTasks(listId);
      setTasks(res);
    };

    fetchTasks(props.taskList.id);
  }, [props.taskList.id]);

  const showListTitleInput = () => setInput(true);

  const hideListTitleInput = () => setInput(false);

  const createTask = (e) => {
    e.preventDefault();
    taskApiService
      .postTask(taskTitle, props.taskList.id)
      .then((newTask) => {
        if (newTask && newTask.title) {
          setTasks((tasks) => [...tasks, newTask]);
        }

        setTaskTitle("");
      })

      .catch((res) => setErrorMessage({ errorMessage: res.error }));
  };

  const deleteList = () => {
    const currentLists = props.listArray;
    listApiService.deleteList(props.taskList.id).then((res) => {
      console.log(res);
      const listsAfterDelete = currentLists.filter(
        (list) => list.id !== props.taskList.id
      );
      props.updateLists(listsAfterDelete);
      return res;
    });
  };
  return (
    <div className="task-list">
      {props.taskList.list_title}
      <DeleteIcon
        fontSize="small"
        className="delete-list"
        onClick={deleteList}
      ></DeleteIcon>
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>{" "}
      {showInput && (
        <form onSubmit={createTask}>
          <input
            type="text"
            name="task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            requiredplaceholder="Enter a title for this card..."
          ></input>
          <button type="submit">Add Card</button>
          <span>
            <ClearIcon
              className="hide-input"
              onClick={hideListTitleInput}
            ></ClearIcon>
          </span>
          <div>{error && <span>{error.errorMessage}</span>}</div>
        </form>
      )}
      {!showInput ? (
        <button onClick={showListTitleInput}>Add Card</button>
      ) : null}
    </div>
  );
};

export default TaskList;
