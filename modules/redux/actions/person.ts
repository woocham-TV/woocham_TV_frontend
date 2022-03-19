import { createPromiseThunk } from "../utils/asyncUtils";
import { GET_ALL_PERSON } from "./actionTypes";
import * as api from "../../api/api";

export const getAllPerson = createPromiseThunk(
  GET_ALL_PERSON,
  api.getAllPerson
);

export type getAPIAction = ReturnType<typeof getAllPerson>;
