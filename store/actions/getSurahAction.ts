import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";
import { chapter, chapters } from "@/ts/interfaces";

export enum getSurahMethods {
  GET_CHAPTERS,
  INSERT_CHAPTER
}

// Action Definition
export interface get_chapter {
  type: getSurahMethods.GET_CHAPTERS;
}

// Union Action Types
export type Action = get_chapter;

// Action Creators
export const get_chapter_func = (): get_chapter => {
  return { type: getSurahMethods.GET_CHAPTERS };
};

// thunk action
export const getSurah = (
  username: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>(async (resolve) => {
      try {
        const chapters = await axios.get<chapters>(
          "https://api.quran.com/api/v4/chapters?language=en"
        );
      } catch (err) {}
    });
  };
};

// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { AnyAction } from "redux";

// // Action Definition
// export interface SetAction {
//   type: "SET";
//   accessToken: string;
// }
// export interface SetFetcing {
//   type: "SET_FETCHING";
//   isFetching: boolean;
// }

// // Union Action Types
// export type Action = SetAction | SetFetcing;

// // Action Creators
// export const set = (accessToken: string): SetAction => {
//   return { type: "SET", accessToken };
// };
// export const isFetching = (isFetching: boolean): SetFetcing => {
//   return { type: "SET_FETCHING", isFetching };
// };

// // thunk action
// export const login = (
//   username: string,
//   password: string
// ): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//   // Invoke API
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     return new Promise<void>((resolve) => {
//       dispatch(isFetching(true));
//       console.log("Login in progress");
//       // Fake async process
//       setTimeout(() => {
//         // set
//         dispatch(set("this_is_access_token"));
//         setTimeout(() => {
//           dispatch(isFetching(false));
//           console.log("Login done");
//           resolve();
//         }, 1000);
//       }, 3000);
//     });
//   };
// };
