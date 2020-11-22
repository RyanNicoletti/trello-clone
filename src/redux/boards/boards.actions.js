import {
  FETCH_BOARDS_FAILURE,
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
} from "./boards.types";
import boardApiService from "../../services/board-api-service";

export const fetchBoardsRequest = () => {
  return {
    type: FETCH_BOARDS_REQUEST,
  };
};

export const fetchBoardsSuccess = (boards) => {
  return {
    type: FETCH_BOARDS_SUCCESS,
    payload: boards,
  };
};

export const fetchBoardsFailure = (error) => {
  return {
    type: FETCH_BOARDS_FAILURE,
    payload: error,
  };
};

const fetchBoards = () => {
  return async (dispatch) => {
    dispatch(fetchBoardsRequest());
    try {
      const boards = await boardApiService.getAllBoards();
      dispatch(fetchBoardsSuccess(boards));
    } catch (err) {
      dispatch(fetchBoardsFailure(err.message));
    }
  };
};

export default fetchBoards;
