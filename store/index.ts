import {
  createStore,
  combineReducers,
  applyMiddleware,
  DeepPartial
} from "redux";
import getSurah_reducers, { State as GetSurahState } from "./reducers/getSurah";
import thunk from "redux-thunk";

export interface RootState {
  getSurah_reducers: GetSurahState;
}

export default createStore(
  combineReducers<RootState>({
    getSurah_reducers
  }),
  applyMiddleware(thunk)
);
