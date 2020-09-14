import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";

import { types, fetchSprints } from "./sprint";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions/sprint tests", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test.only("fetchSprints should get sprint detail when SPRINT/FETCH_SUCCESS", () => {
    const sampleSprintData = {
      name: "test1",
      data: [
        {
          name: "story1",
          status: "Active",
          storyPoint: "",
          votes: [
            {
              id: 1,
              name: "Voter 1",
              vote: "",
            },
            { id: 0, name: "Scrum Master", vote: "" },
          ],
        },
      ],
    };
    fetchMock.getOnce("/", {
      sprintData: sampleSprintData,
    });

    const expectedActions = [
      { type: types.SPRINT_START },
      { type: types.SPRINT_SUCCESS, sprint: null },
    ];

    const store = mockStore({ sprintData: {} });
    store.dispatch(fetchSprints());
    return expect(store.getActions()).toEqual(expectedActions);
  });
});
