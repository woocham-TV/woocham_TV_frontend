import { UserAction } from "../actions/user";

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

function user(state: UserState = initState, action: UserAction): UserState {
  switch (action.type) {
    case "user/REGIST":
      return {
        name: action.payload.name,
        icon: action.payload.icon,
      };
    default:
      return state;
  }
}

export default user;
