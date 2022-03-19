import { UserAction } from "../actions/user";
import { USER_REGIST } from "./../actions/actionTypes";

export type UserState = {
  name: string | null;
  icon:
    | "👩"
    | "👲"
    | "👮‍♀️"
    | "👨‍🍳"
    | "🤶"
    | "👩‍🔬"
    | "👩‍⚖️"
    | "🕵️‍♀️"
    | "👨‍🚒"
    | "🧛‍♀️"
    | null;
};

const initState: UserState = {
  name: null,
  icon: null,
};

const user = (state: UserState = initState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_REGIST:
      return {
        ...state,
        name: action.payload.name,
        icon: action.payload.icon,
      };
    default:
      return state;
  }
};

export default user;
