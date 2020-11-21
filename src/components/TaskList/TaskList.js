import React, { useState, useEffect } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import taskApiService from "../../services/task-api-service";
import "./tasklist.css";
import listApiService from "../../services/list-api-service";
import TaskCard from "../TaskCard/TaskCard";

const TaskList = (props) => {
  const [showInput, setInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setErrorMessage] = useState({ errorMessage: null });

  // fetch all tasks based on the list id
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

  const renderTasks = () => {
    return tasks.map((task) => (
      <TaskCard
        className="card"
        key={task.id}
        title={task.title}
        updateTasks={setTasks}
        tasksArray={tasks}
        taskCard={task}
      />
    ));
  };

  return (
    <div className="task-list">
      <div className="flex-delete">
        {props.taskList.list_title}
        <DeleteIcon
          fontSize="small"
          className="delete-list"
          onClick={deleteList}
        ></DeleteIcon>
      </div>
      {renderTasks()}
      {showInput && (
        <form onSubmit={createTask}>
          <input
            type="text"
            name="task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            requiredplaceholder="Enter a title for this card..."
          ></input>
          <button className="add-card-button" type="submit">
            Add Card
          </button>
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
        <div className="add-card" onClick={showListTitleInput}>
          + Add another card
        </div>
      ) : null}
    </div>
  );
};

export default TaskList;
