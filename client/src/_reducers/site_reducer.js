import { GET_SITES } from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_SITES:
      return { ...state, sitesEngine: action.payload };
    default:
      return state;
  }
}
