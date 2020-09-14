import { types } from "../actions/sprint";

const initialState = {
  sprintData: "",
  isLoading: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SPRINT_START:
      return {
        ...state,
        isLoading: true,
      };

    case types.SPRINT_SUCCESS:
      return {
        ...state,
        sprintData: action.sprint,
        isLoading: false,
        error: false,
      };

    case types.SPRINT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
