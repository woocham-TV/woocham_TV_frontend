import {
  GET_ALL_PERSON,
  GET_ALL_PERSON_SUCCESS,
  GET_ALL_PERSON_ERROR,
} from "../actions/actionTypes";
import { reducerUtils } from "../utils/asyncUtils";
import { handleAsyncActions } from "./../utils/asyncUtils";
import { ApiActionState } from "./../../../typings/api";

type PersonsState = {
  persons: ApiActionState<any>;
};

const initState: PersonsState = {
  persons: reducerUtils.initial(),
};

function person(state: PersonsState = initState, action: any): PersonsState {
  switch (action.type) {
    case GET_ALL_PERSON:
    case GET_ALL_PERSON_SUCCESS:
    case GET_ALL_PERSON_ERROR:
      return handleAsyncActions(GET_ALL_PERSON, "persons")(state, action);
    default:
      return state;
  }
}

export default person;
