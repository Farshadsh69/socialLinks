import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface linksType {
  link: string;
  type: string;
}
const initialState: { link?: linksType } = {};

const slice = createSlice({
  name: "links",
  initialState,
  reducers: {
    linkUpdated(state, action: PayloadAction<linksType>) {
      state.link = { ...state.link, ...action.payload };
    },
    emptyLink(state) {
      state.link = undefined;
    },
  },
});
export const linkUpdatedSelector = (state: RootState) => state.links;

// Reducer
export default slice.reducer;

// Actions
export const { linkUpdated, emptyLink } = slice.actions;
