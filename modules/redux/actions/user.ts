import { USER_REGIST } from "./actionTypes";
import { createAction } from "redux-actions";
import { UserState } from "../reducers/user";

export const regist = createAction<UserState>(USER_REGIST);

export type UserAction = ReturnType<typeof regist>;
