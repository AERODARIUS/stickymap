import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { GRANT_LOCATION, SET_AUTH } from './actions';

const initialState = {
  permissions: {
    location: false,
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case GRANT_LOCATION:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          location: true,
        },
      };
    case SET_AUTH:
      return {
        auth: action.auth,
      };
    default:
      return state;
  }
};

export default createStore(
  combineReducers({
    app: AppReducer,
  }),
  applyMiddleware(
    ReduxThunk,
  ),
);
