import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paths } from '../../routers/paths';
import { get, post } from '../../api/helpers';

const initialState = {
  infos: null,
  loading: false,
  error: '',
  editing: false,
  languages: [],
  fetched: false,
  updatingPass: false,
  passError: '',
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: paths.getProfile,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await post({
        url: paths.updateProfile,
        data: data,
        options: {
          params: {
            _method: 'put',
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });
      dispatch(resetFetch());
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async (data, { rejectWithValue }) => {
    try {
      const { oldPass, newPass, confirmPass } = data;
      const response = await api.put(
        `/admin/profile/password/update?current_password=${oldPass}&password=${newPass}&password_confirmation=${confirmPass}`
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetFetch: (state) => {
      state.fetched = false;
    },
    clearProfileError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.infos = action.payload.auth;
        state.languages = action.payload.languages;
        state.fetched = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.infos = [];
        state.error = action.error;
        state.fetched = true;
      });
    builder
      .addCase(updateProfile.pending, (state) => {
        state.editing = true;
        state.error = '';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.error = '';
        state.editing = false;
        state.infos = action.payload.data.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload.message;
        state.editing = false;
      });
    builder
      .addCase(updatePassword.pending, (state) => {
        state.updatingPass = true;
        state.passError = '';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.passError = '';
        state.updatingPass = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passError = action.payload.message;
        state.updatingPass = false;
      });
  },
});

export const { resetFetch, clearProfileError } = profileSlice.actions;

export default profileSlice.reducer;
