import { UserState } from "../reducers/user";
import { REGIST } from "./actionTypes";

export function regist({ name, icon }: UserState) {
  return {
    type: REGIST,
    payload: {
      name: name,
      icon: icon,
    },
  };
}

export type UserAction = ReturnType<typeof regist>;
