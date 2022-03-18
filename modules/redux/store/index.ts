import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import user from "../reducers/user";

const rootReducer = combineReducers({
  user,
});

// hydrate 리듀서 추가
// hydrate는 서버에서 생성된 리덕스 스토어를
// 클라이언트에서 사용하게 해줌
// Next JS 가 SSR이라 필요한듯
const reducer = (state: RootState | undefined, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

// 여기는 미들웨어 초기화 부분
// 일단 리덕스 데브툴 넣어놓음
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

export const reduxWrapper = createWrapper(initStore);
