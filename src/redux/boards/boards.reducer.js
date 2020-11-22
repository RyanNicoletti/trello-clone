import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
} from "./boards.types";

const initialState = {
  loading: false,
  boards: [],
  error: "",
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: action.payload,
      };
    case FETCH_BOARDS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default boardsReducer;
