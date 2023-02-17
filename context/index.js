import { createContext, useContext, useReducer } from 'react';
import { authConstants } from './constants';

const Store = createContext();

const reducer = (state, action) => {
  //   console.log(action);

  if (action.type === authConstants.LOGIN_REQUEST) {
    return {
      ...state,
      user: {
        ...state.user,
        authenticating: true,
      },
    };
  } else if (action.type === authConstants.LOGIN_SUCCESS) {
    return {
      ...state,
      user: {
        ...action.payload.user,
        authenticating: false,
        authenticated: true,
      },
    };
  } else if (action.type === authConstants.LOGIN_FAILURE) {
    return {
      ...state,
      user: {
        ...state.user,
        error: action.payload,
      },
    };
  } else if (action.type === authConstants.TOGGLE) {
    return {
      ...state,
      mobileMenu: !state.mobileMenu,
    };
  } else if (action.type === authConstants.TOGGLE_HARMBUGGER) {
    return {
      ...state,
      harmburger: !state.harmburger,
    };
  } else if (action.type === authConstants.SET_USER_PROFILE) {
    return {
      ...state,
      userProfile: {
        ...state.userProfile,
        username: action.payload,
      },
    };
  } else {
    return state;
  }
};

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {
      authenticated: false,
      authenticating: false,
      error: null,
    },
    mobileMenu: false,
    harmburger: false,
    userProfile: {
      image: '',
      username: '',
    },
  });

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
