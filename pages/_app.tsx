import type { AppProps } from "next/app";
import { reduxWrapper } from "../modules/redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default reduxWrapper.withRedux(MyApp);
