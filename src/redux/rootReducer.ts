import { combineReducers } from "redux";
import linksReducer from "./slices/link-slice";
export default combineReducers({
  links: linksReducer,
});
