const REGIST = "user/REGIST" as const;

export const regist = () => ({
  type: REGIST,
  payload: {
    name: null,
    icon: null,
  },
});

type UserAction = ReturnType<typeof regist>;

type UserState = {
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

const initState = {
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
