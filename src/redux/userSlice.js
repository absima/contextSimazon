import { createSlice } from '@reduxjs/toolkit';
// import { setMessage } from './messageSlice';
import * as userApi from '../api/userApi';

// const user = JSON.parse(localStorage.getItem('user'));

// create slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    // user
    user: {},
    // is logged in
    isLoggedIn: false,
    // loading
    loading: true,
    //
    error: '',
    // // message
    // message: '',
  },
  reducers: {
    // create reducers
    // register user
    registerUserRequest: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // login user
    loginUserRequest: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginUserFail: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    // logout user
    logoutUserRequest: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = '';
    },
    logoutUserFail: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.error = action.payload;
    },
    // get user profile
    getUserProfileRequest: (state) => {
      state.loading = true;
    },
    getUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

// export thunks
export const registerUser = (name, username, email, password) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());
    const { data } = await userApi.register(name, username, email
      , password
    );
    dispatch(registerUserSuccess(data));
    // dispatch(setMessage(data.message));
  } catch (error) {
    dispatch(registerUserFail(error.message));
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(loginUserRequest());
    const { data } = await userApi.login(username, password);
    dispatch(loginUserSuccess(data));
    // dispatch(setMessage(data.message));
  } catch (error) {
    dispatch(loginUserFail(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutUserRequest());
    const { data } = await userApi.logout();
    dispatch(logoutUserSuccess(data));
    // dispatch(setMessage(data.message));
  } catch (error) {
    dispatch(logoutUserFail(error.message));
  }
};

export const getUserProfile = (username) => async (dispatch) => {
  try {
    dispatch(getUserProfileRequest());
    const res = await userApi.getProfile(username);

    // const { data } = await userApi.getProfile(username);
    dispatch(getUserProfileSuccess(data));
  } catch (error) {
    dispatch(getUserProfileFail(error.message));
  }
};


// export const getUserProfile = () => async (dispatch) => {
//   try {
//     dispatch(getUserProfileRequest());
//     const { data } = await userApi.getProfile();
//     dispatch(getUserProfileSuccess(data));
//   } catch (error) {
//     dispatch(getUserProfileFail(error.response.data.message));
//   }
// };


// export actions
export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFail,
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFail,
} = userSlice.actions;

// export reducer
export default userSlice.reducer;

// export selectors
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

