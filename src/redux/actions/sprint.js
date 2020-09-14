export const types = {
  SPRINT_START: "SPRINT/FETCH_SPRINT_START",
  SPRINT_SUCCESS: "SPRINT/FETCH_SPRINT_SUCCESS",
  SPRINT_ERROR: "SPRINT/FETCH_SPRINT_ERROR",
};

export const fetchSprints = () => (dispatch) => {
  dispatch({
    type: types.SPRINT_START,
  });

  return dispatch({
    type: types.SPRINT_SUCCESS,
    sprint: JSON.parse(window.localStorage.getItem("SprintDetail")),
  });
};
