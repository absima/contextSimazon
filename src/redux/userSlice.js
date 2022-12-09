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
    console.log('in', username)
    dispatch(getUserProfileRequest());
    const res = await userApi.getProfile(username);

    // const { data } = await userApi.getProfile(username);
    console.log('data', res);
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



// export const registerUser = createAsyncThunk(
//   'user/register',
//   async ({ name, username, email, password }, thunkAPI) => {
//     try {
//       const response = await userApi.register({ name, email, password });
//       thunkAPI.dispatch(setMessage(response.data.message));
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // export thunk for login user
// export const loginUser = (email, password) => async (dispatch) => {
//   try {
//     dispatch(loginUserRequest());
//     const { data } = await userApi.loginUser(email, password);
//     dispatch(loginUserSuccess(data));
//     return data;
//   } catch (error) {
//     dispatch(loginUserFail(error.message));
//     return error.message
//   }
// };

// // export const loginUser = createAsyncThunk(
// //   'user/login',
// //   async ({ email, password }, thunkAPI) => {
// //     try {
// //       console.log('------------------------')
// //       console.log('loginUser thunk');
// //       console.log('thunkAPI', thunkAPI);
// //       console.log('------------------------')
// //       console.log(email, password);
// //       const response = await userApi.login({ email, password });
// //       thunkAPI.dispatch(setMessage(response.data.message));
// //       return response.data;
// //     } catch (error) {
// //       const message =
// //         (error.response && error.response.data.message) ||
// //         error.message ||
// //         error.toString();
// //       thunkAPI.dispatch(setMessage(message));
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );




// export const logoutUser = createAsyncThunk('user/logout', async (thunkAPI) => {
//   try {
//     const response = await userApi.logoutUser();
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// export const updateUser = createAsyncThunk(
//   'user/update',
//   async ({ name, email, password }, thunkAPI) => {
//     try {
//       const response = await userApi.updateUser({ name, email, password });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteUser = createAsyncThunk('user/delete', async (thunkAPI) => {
//   try {
//     const response = await userApi.deleteUser();
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// // // export thunks
// // // export thunk for register user
// // export const registerUser = (name, email, password) => async (dispatch) => {
// //   try {
// //     dispatch(registerUserRequest());
// //     const { data } = await userApi.registerUser(name, email, password);
// //     dispatch(registerUserSuccess(data));
// //   } catch (error) {
// //     dispatch(registerUserFail(error.message));
// //   }
// // };

// // // export thunk for login user
// // export const loginUser = (email, password) => async (dispatch) => {
// //   try {
// //     dispatch(loginUserRequest());
// //     const { data } = await userApi.loginUser(email, password);
// //     dispatch(loginUserSuccess(data));
// //   } catch (error) {
// //     dispatch(loginUserFail(error.message));
// //   }
// // };

// // // export thunk for logout user
// // export const logoutUser = () => async (dispatch) => {
// //   try {
// //     dispatch(logoutUserRequest());
// //     const { data } = await userApi.logoutUser();
// //     dispatch(logoutUserSuccess(data));
// //   } catch (error) {
// //     dispatch(logoutUserFail(error.message));
// //   }
// // };

// // // export thunk for update user
// // export const updateUser = (name, email, password) => async (dispatch) => {
// //   try {
// //     dispatch(updateUserRequest());
// //     const { data } = await userApi.updateUser(name, email, password);
// //     dispatch(updateUserSuccess(data));
// //   } catch (error) {
// //     dispatch(updateUserFail(error.message));
// //   }
// // };

// // // export thunk for delete user
// // export const deleteUser = () => async (dispatch) => {
// //   try {
// //     dispatch(deleteUserRequest());
// //     const { data } = await userApi.deleteUser();
// //     dispatch(deleteUserSuccess(data));
// //   } catch (error) {
// //     dispatch(deleteUserFail(error.message));
// //   }
// // };

// // // export const registerUser = (name, email, password) => async (dispatch) => {
// // //   try {
// // //     dispatch(registerUserRequest());
// // //     const response = await userApi.register(name, email, password);
// // //     dispatch(registerUserSuccess(response.data));

// // //   } catch (error) {
// // //     const message =
// // //       (error.response && error.response.data && error.response.data.message) ||
// // //       error.message ||
// // //       error.toString();
// // //     dispatch(registerUserFail(message));
// // //     dispatch(setMessage(message));
// // //     // return Promise.reject(message);
// // //   }
// // // };

// // // // // export thunk for login using email and password
// // // // export const loginUser = (email, password) => async (dispatch) => {
// // // //   try {
// // // //     dispatch(getUserRequest());
// // // //     const { data } = await userApi.login(email, password);
// // // //     console.log('login successful');
// // // //     return dispatch(getUserSuccess(data));
// // // //   } catch (error) {
// // // //     return dispatch(getUserFail(error.message));
// // // //   }
// // // // };

// // // export const loginUser = (email, password) => async (dispatch) => {
// // //   console.log('userrrrrrrrrrrrrrrrrr', email, 'and', password);
// // //   try {
// // //     dispatch(loginUserRequest());
// // //     const response = await userApi.login(email, password);
// // //     console.log('response.data ------', response.data)
// // //     dispatch(loginUserSuccess(response.data));
// // //     dispatch(setMessage(response.data.message));
// // //     return Promise.resolve(response.data);
// // //   } catch (error) {
// // //     const message =
// // //       (error.response && error.response.data && error.response.data.message) ||
// // //       error.message ||
// // //       error.toString();
// // //     dispatch(loginUserFail(message));
// // //     return Promise.reject(message);
// // //   }
// // // };

// // // export const logoutUser = () => async (dispatch) => {
// // //   try {
// // //     dispatch(logoutUserRequest());
// // //     const response = await userApi.logoutUser();
// // //     dispatch(logoutUserSuccess(response.data));
// // //     dispatch(setMessage(response.data.message));
// // //     // return Promise.resolve(response.data);
// // //   } catch (error) {
// // //     const message =
// // //       (error.response && error.response.data && error.response.data.message) ||
// // //       error.message ||
// // //       error.toString();
// // //     dispatch(logoutUserFail(message));
// // //     // return Promise.reject(message);
// // //   }
// // // };

// // // // export const registerUser = createAsyncThunk(
// // // //   'user/register',
// // // //   async ({ username, email, password }, thunkAPI) => {
// // // //     try {
// // // //       const response = await userApi.register(username, email, password);
// // // //       thunkAPI.dispatch(setMessage(response.data.message));
// // // //       return response.data;
// // // //     } catch (error) {
// // // //       const message =
// // // //         (error.response &&
// // // //           error.response.data &&
// // // //           error.response.data.message) ||
// // // //         error.message ||
// // // //         error.toString();
// // // //       thunkAPI.dispatch(setMessage(message));
// // // //       return thunkAPI.rejectWithValue(message);
// // // //     }
// // // //   }
// // // // );

// // // // // login User thunk

// // // // // export thunk for login using email and password
// // // // export const loginUser = (empass) => async (dispatch) => {
// // // //   const email = empass.emailInput;
// // // //   const password = empass.passwordInput;
// // // //   console.log('email and password');
// // // //   console.log(email, password);
// // // //   try {
// // // //     dispatch(loginUserRequest());
// // // //     const { data } = await userApi.login(email, password);
// // // //     console.log('login successful');
// // // //     return dispatch(loginUserSuccess(data));
// // // //   } catch (error) {
// // // //     const message =
// // // //       (error.response && error.response.data && error.response.data.message) ||
// // // //       error.message ||
// // // //       error.toString();
// // // //     dispatch(setMessage(message));
// // // //     return dispatch(loginUserFail(error.message));
// // // //   }
// // // // };

// // // // // export const loginUser = createAsyncThunk(
// // // // //   'user/login',
// // // // //   async ({ email, password }, thunkAPI) => {
// // // // //     try {
// // // // //       console.log('email and password')
// // // // //       console.log(email, password)
// // // // //       const response = await userApi.login(email, password);
// // // // //       return { user: response }; //{ user: response.data.user, token: response.data.token };
// // // // //     } catch (error) {
// // // // //       const message =
// // // // //         (error.response &&
// // // // //           error.response.data &&
// // // // //           error.response.data.message) ||
// // // // //         error.message ||
// // // // //         error.toString();
// // // // //       thunkAPI.dispatch(setMessage(message));
// // // // //       return thunkAPI.rejectWithValue(); //(message);
// // // // //     }
// // // // //   }
// // // // // );

// // // // export const logoutUser = createAsyncThunk('user/logout', async () => {
// // // //   try {
// // // //     const response = await userApi.logout();
// // // //     return response.data;
// // // //   } catch (error) {
// // // //     return error.message;
// // // //   }
// // // // });

// // // // export const updateUser = createAsyncThunk(
// // // //   'user/update',
// // // //   async ({ id, user }, thunkAPI) => {
// // // //     try {
// // // //       const response = await userApi.updateUser(id, user);
// // // //       thunkAPI.dispatch(setMessage(response.data.message));
// // // //       return response.data;
// // // //     } catch (error) {
// // // //       const message =
// // // //         (error.response &&
// // // //           error.response.data &&
// // // //           error.response.data.message) ||
// // // //         error.message ||
// // // //         error.toString();
// // // //       thunkAPI.dispatch(setMessage(message));
// // // //       return thunkAPI.rejectWithValue(message);
// // // //     }
// // // //   }
// // // // );

// // // // export const deleteUser = createAsyncThunk(
// // // //   'user/delete',
// // // //   async (id, thunkAPI) => {
// // // //     try {
// // // //       const response = await userApi.deleteUser(id);
// // // //       thunkAPI.dispatch(setMessage(response.data.message));
// // // //       return response.data;
// // // //     } catch (error) {
// // // //       const message =
// // // //         (error.response &&
// // // //           error.response.data &&
// // // //           error.response.data.message) ||
// // // //         error.message ||
// // // //         error.toString();
// // // //       thunkAPI.dispatch(setMessage(message));
// // // //       return thunkAPI.rejectWithValue(message);
// // // //     }
// // // //   }
// // // // );

// // // // // // export thunks
// // // // // export const {
// // // // //   registerUser,
// // // // //   loginUser,
// // // // //   logoutUser,
// // // // //   updateUser,
// // // // //   deleteUser,
// // // // // } = userSlice.actions;

// // // // // extraReducers: {
// // // // //   // register
// // // // //   [registerUser.pending]: (state) => {
// // // // //     state.loading = true;
// // // // //   },
// // // // //   [registerUser.fulfilled]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = false;
// // // // //   },
// // // // //   [registerUser.rejected]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = false;
// // // // //     state.message = action.payload;
// // // // //   },

// // // // //   // login
// // // // //   [loginUser.pending]: (state) => {
// // // // //     state.loading = true;
// // // // //   },
// // // // //   [loginUser.fulfilled]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = true;
// // // // //     state.user = action.payload.user;
// // // // //   },
// // // // //   [loginUser.rejected]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = false;
// // // // //     state.message = action.payload;
// // // // //   },

// // // // //   // logout
// // // // //   [logoutUser.pending]: (state) => {
// // // // //     state.loading = true;
// // // // //   },
// // // // //   [logoutUser.fulfilled]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = false;
// // // // //     state.user = "";
// // // // //   },
// // // // //   [logoutUser.rejected]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = true;
// // // // //     state.message = action.payload;
// // // // //   },

// // // // //   // update
// // // // //   [updateUser.pending]: (state) => {
// // // // //     state.loading = true;
// // // // //   },
// // // // //   [updateUser.fulfilled]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = true;
// // // // //     state.user = action.payload.user;
// // // // //   },
// // // // //   [updateUser.rejected]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = true;
// // // // //     state.message = action.payload;
// // // // //   },

// // // // //   // delete
// // // // //   [deleteUser.pending]: (state) => {
// // // // //     state.loading = true;
// // // // //   },
// // // // //   [deleteUser.fulfilled]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = false;
// // // // //     state.user = "";
// // // // //   },
// // // // //   [deleteUser.rejected]: (state, action) => {
// // // // //     state.loading = false;
// // // // //     state.isLoggedIn = true;
// // // // //     state.message = action.payload;
// // // // //   },
// // // // // },
