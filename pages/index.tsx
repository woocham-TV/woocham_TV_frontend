import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/redux/store";
import { getAllPerson } from "./../modules/redux/actions/person";
import { ApiActionState } from "./../typings/api";

export default function Home() {
  const { loading, error, data }: ApiActionState<any[]> = useSelector(
    (state: RootState) => state.person.persons
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPerson());
  }, []);

  console.log(loading, error, data);

  if (loading) return <>로딩중</>;
  if (error) return <>에러가 발생하였습니다.</>;
  if (!data) return <></>;
  return <>{data && data.map((res) => res.name)}</>;
}
