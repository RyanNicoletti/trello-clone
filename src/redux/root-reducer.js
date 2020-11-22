import { combineReducers } from "redux";

import boardsReducer from "./boards/boards.reducer";

const rootReducer = combineReducers({
  usersBoards: boardsReducer,
});

export default rootReducer;
