import { USER_REGIST } from "./actionTypes";
import { createAction } from "redux-actions";
import { UserState } from "../reducers/user";
import { Dispatch } from "redux";

export const regist = createAction<UserState>(USER_REGIST);

export const registAsync = () => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(regist({ name: "sdf", icon: "👨‍🍳" }));
  }, 1000);
};

export type UserAction = ReturnType<typeof regist>;
