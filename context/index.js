'use client';

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
        authenticating: false,
        authenticated: false,
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
  } else if (action.type === authConstants.FETCH_DATA_REQUEST) {
    return {
      ...state,
      forumData: {
        ...state.forumData,
        loading: true,
      },
    };
  } else if (action.type === authConstants.FETCH_DATA_SUCCESS) {
    return {
      ...state,
      forumData: {
        ...action.payload,
        loading: false,
      },
    };
  } else if (action.type === authConstants.FETCH_DATA_FALURE) {
    return {
      ...state,
      forumData: {
        ...state.forumData,
        error: action.payload,
        loading: false,
      },
    };
  }
  if (action.type === authConstants.FETCH_SINGLE_COMMUNITY_REQUEST) {
    return {
      ...state,
      communityData: {
        ...state.communityData,
        loading: true,
      },
    };
  } else if (action.type === authConstants.FETCH_SINGLE_COMMUNITY_SUCCESS) {
    return {
      ...state,
      communityData: {
        ...state.communityData,
        ...action.payload,
        users: action.payload.subscribedUsers,
        loading: false,
      },
    };
  } else if (action.type === authConstants.FETCH_SINGLE_COMMUNITY_FALURE) {
    return {
      ...state,
      communityData: {
        ...state.communityData,
        error: action.payload,
      },
    };
  } else if (action.type === authConstants.JOIN_COMMUNITY) {
    let newArray = [];

    if (state?.communityData.users?.includes(action.payload)) {
      newArray = state?.communityData.users?.filter((value) => {
        return value !== action.payload;
      });

      return {
        ...state,
        communityData: {
          ...state.communityData,
          data: action?.payload,
          users: newArray,
        },
      };
    } else if (!state?.communityData.users?.includes(action.payload)) {
      return {
        ...state,
        communityData: {
          ...state.communityData,
          users: [...state?.communityData?.subscribedUsers, action?.payload],
        },
      };
    }
  } else if (action.type === authConstants.FETCH_COMMENT_REQUEST) {
    return {
      ...state,
      commentData: {
        ...state.commentData,
        loading: true,
      },
    };
  } else if (action.type === authConstants.FETCH_COMMENT_SUCCESS) {
    return {
      ...state,
      commentData: {
        comments: action?.payload,
        loading: false,
      },
    };
  } else if (action.type === authConstants.FETCH_COMMENT_FALURE) {
    return {
      ...state,
      commentData: {
        ...state.commentData,
        error: action?.payload,
        loading: false,
      },
    };
  } else if (action.type === authConstants.CREATE_COMMENT) {
    return {
      ...state,
      commentData: {
        comments: [...state?.commentData?.comments, action?.payload],
        loading: false,
      },
    };
  } else if (action.type === authConstants.LIKE_COMMENT) {
    // if (state?.commentData?.comment) {

    return {
      ...state,
      commentData: {
        comments: [...state?.commentData?.comments, action?.payload],
        loading: false,
      },
    };
    // }
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

    forumData: {
      loading: false,
      error: null,
    },

    communityData: {
      users: [],
      loading: false,
      data: '',
    },

    commentData: {
      comments: [],
      loading: false,
      error: null,
    },
  });

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
