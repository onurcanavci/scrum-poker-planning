import reducer from "./sprint";
import { types } from "../actions/sprint";

describe("reducers/sprint tests", () => {
  test("should return loading state when sprint fetching", () => {
    const expectedResult = {
      isLoading: true,
    };
    expect(reducer([], { type: types.SPRINT_START })).toEqual(expectedResult);
  });
});
