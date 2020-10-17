import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./TaskCard.css";
import taskApiService from "../../services/task-api-service";

const TaskCard = (props) => {
  const deleteTask = () => {
    const currentTasks = props.tasksArray;
    taskApiService.deleteTask(props.taskCard.id).then((res) => {
      const tasksAfterDelete = currentTasks.filter(
        (task) => task.id !== props.taskCard.id
      );
      props.updateTasks(tasksAfterDelete);
      return res;
    });
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <div>{props.title}</div>
        <DeleteIcon
          className="delete-task-icon"
          fontSize="small"
          onClick={deleteTask}
        />
      </div>
    </div>
  );
};

export default TaskCard;
