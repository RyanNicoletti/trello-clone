import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import "./tasklist.css";

const TaskList = (props) => {
  const [showInput, setInput] = useState(false);
  const [task, setTaskName] = useState("");
  // const [error, setErrorMessage] = useState({ errorMessage: null });

  const showListTitleInput = () => setInput(true);

  const hideListTitleInput = () => setInput(false);

  const createTask = (e) => {
    e.preventDefauilt();
    // taskApiService
    //   .postTask(task, listId)
    //   .then((list) => {
    //     setLists((lists) => [...lists, list]);
    //   })
    //   .catch((res) => {
    //     return setErrorMessage({ errorMessage: res.error });
    //   });
  };
  return (
    <div>
      <div className="list-container">
        {props.taskLists.map((list) => (
          <div className="task-list" key={list.id}>
            {list.list_title}
            {showInput && (
              <div>
                <input
                  type="text"
                  name="task"
                  value={task}
                  onChange={(e) => setTaskName(e.target.value)}
                  requiredplaceholder="Enter a title for this card..."
                ></input>
                <button onSubmit={createTask}>Add Card</button>
                <span>
                  <ClearIcon
                    className="hide-input"
                    onClick={hideListTitleInput}
                  ></ClearIcon>
                </span>
                {/* <div>{error && <span>{error.errorMessage}</span>}</div> */}
              </div>
            )}
            {!showInput ? (
              <button onClick={showListTitleInput}>Add Card</button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
