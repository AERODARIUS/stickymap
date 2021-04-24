import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const initialState = {
  permissions: {
    location: false,
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GRANT_LOCATION':
      return {
        ...state,
        permissions: {
          ...state.permissions,
          location: true,
        },
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
