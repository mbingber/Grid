import { ANONYMOUS, LOGIN, LOGOUT } from '../constants';

const INITIAL_STATE = {
  uid: ANONYMOUS,
  username: null,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}