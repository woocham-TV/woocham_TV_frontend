import type { AppProps } from "next/app";
import { reduxWrapper } from "../modules/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default reduxWrapper.withRedux(MyApp);
