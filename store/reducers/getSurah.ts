// store / session / reducers.ts;
import { combineReducers } from "redux";
import { getSurahMethods, Action } from "../actions/getSurahAction";
import { chapter, chapters } from "@/ts/interfaces";

// States' definition
export interface AccessToken {
  chapters: chapter[];
}

export interface State {
  getSurah_reducer: chapters;
}

const getSurah_reducer = (
  state: chapters = { chapters: [] },
  action: Action
): chapters => {
  switch (action.type) {
    case getSurahMethods.GET_CHAPTERS:
      return { ...state, chapters: [...state.chapters] };
    // case getSurahMethods.INSERT_CHAPTER:
    //   return { ...state, isFetching: true };
  }
  return state;
};
const getSurah_reducers = combineReducers<State>({
  getSurah_reducer
});

export default getSurah_reducers;

// store/session/reducers.ts
// import { combineReducers } from "redux";
// import { Action } from "../actions/getSurahAction";

// // States' definition
// export interface AccessToken {
//   isFetching: boolean;
//   accessToken?: string;
// }

// export interface State {
//   accessToken: AccessToken;
// }

// const accessToken = (
//   state: AccessToken = { isFetching: false },
//   action: Action
// ): AccessToken => {
//   switch (action.type) {
//     case "SET":
//       return { ...state, accessToken: action.accessToken };
//     case "SET_FETCHING":
//       return { ...state, isFetching: action.isFetching };
//   }
//   return state;
// };
// export default combineReducers<State>({
//   accessToken
// });
