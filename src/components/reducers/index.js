import { combineReducers } from "redux";
import data from "./data";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({
  data,
  visibilityFilter
});
