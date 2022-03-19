import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/redux/store";
import { regist, registAsync } from "./../modules/redux/actions/user";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return <></>;
}
