import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import { paths } from '../../routers/paths';
import { get } from '../../api/helpers';

const initialState = {
  loading: false,
  fetched: false,
  userProfile: null,
  message: '',
  error: '',
};

export const fetchUserById = createAsyncThunk(
  'userProfile/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await get({
        url: `${paths.getUserById}/${id}`,
      });
      return response;
    } catch (error) {
      console.log(error);
      const message = error.message;
      const status = error.response.status;
      return rejectWithValue({ message, status });
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    editUser: (state, action) => {
      const { values, id } = action.payload;
      const index = state.userProfile.findIndex(
        (userProfile) => userProfile.id === id
      );
      state.userProfile[index] = values;
      state.message = `The user has been updated successfully.`;
    },
    updateMessage: (state, payload) => {
      state.message = payload.payload;
    },
    clearUserProfileMessage: (state) => {
      state.message = '';
    },
    clearUserProfileError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.userProfile = action.payload.user;
        state.message = 'All data has been fetched successfully.';
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
        state.fetched = true;
        state.users = null;
        state.error = 'The fetch request failed.';
      });
  },
});

export const selectUserProfile = (state) => state.userProfile;

export const {
  editUser,
  updateMessage,
  clearUserProfileMessage,
  clearUserProfileError,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
