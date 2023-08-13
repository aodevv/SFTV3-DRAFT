import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../api';

import axios from 'axios';
import { post, put } from '../../api/helpers';
import { paths } from '../../routers/paths';

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: '',
};

export const loginJwt = createAsyncThunk(
  'auth/loginJwt',
  async (data, { rejectWithValue }) => {
    try {
      const res = await post({
        url: paths.login,
        data: data,
      });
      console.log(res);
      localStorage.setItem('token', res.data.token);
      return res;
    } catch (error) {
      console.log('🚀 ~ file: authSlice.js:29 ~ error:', error);
      rejectWithValue(error.response.data);
    }
  }
);

// TODO: VERIFY FORGO PASSWORD AND NEW PASSWORD
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const res = await put({
        url: paths.forgetPassword,
        options: {
          params: {
            email: data.email,
          },
        },
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ file: authSlice.js:51 ~ error:', error);
      rejectWithValue(error.response.data);
    }
  }
);

export const newPassword = createAsyncThunk(
  'auth/newPassword',
  async (data, { rejectWithValue }) => {
    try {
      const { password, passwordConfirmation, token } = data;
      const res = put({
        url: paths.resetPassword,
        options: {
          params: {
            password: password,
            password_confirmation: passwordConfirmation,
          },
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ file: authSlice.js:63 ~ error:', error);
      rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.user = 'user';
    },
    logout: () => {
      return initialState;
    },
    clearError: (state) => {
      state.error = '';
      state.resetError = '';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginJwt.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginJwt.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.token = action.payload.data.token;
      state.user = action.payload.data.user;
      state.error = '';
    });
    builder.addCase(loginJwt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(newPassword.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(newPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
