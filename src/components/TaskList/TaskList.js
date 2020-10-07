import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import taskApiService from "../../services/task-api-service";
import "./tasklist.css";

const TaskList = (props) => {
  const [showInput, setInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setErrorMessage] = useState({ errorMessage: null });

  const showListTitleInput = () => setInput(true);

  const hideListTitleInput = () => setInput(false);

  const createTask = (e) => {
    e.preventDefault();
    taskApiService
      .postTask(taskTitle, props.taskList.id)
      .then((newTask) => setTasks((tasks) => [...tasks, newTask]))

      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
  };
  return (
    <div className="task-list">
      {props.taskList.list_title}
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
      {showInput && (
        <div>
          <input
            type="text"
            name="task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            requiredplaceholder="Enter a title for this card..."
          ></input>
          <button onClick={createTask}>Add Card</button>
          <span>
            <ClearIcon
              className="hide-input"
              onClick={hideListTitleInput}
            ></ClearIcon>
          </span>
          <div>{error && <span>{error.errorMessage}</span>}</div>
        </div>
      )}
      {!showInput ? (
        <button onClick={showListTitleInput}>Add Card</button>
      ) : null}
    </div>
  );
};

export default TaskList;
