import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./../modules/redux/index";

function MyApp({ Component, pageProps }: AppProps) {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
