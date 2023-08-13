import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../api';

// import activeWorkerSlice from '../activeWorkerSlice/activeWorkerSlice';
// import { setActiveWorker } from '../activeWorkerSlice/activeWorkerSlice';

import dayjs from 'dayjs';

// import { tempData } from './workerData';
import { paths } from '../../routers/paths';
import { get, post, put } from '../../api/helpers';

const initialState = {
  loading: false,
  posting: false,
  deleting: false,
  toggeling: false,
  fetched: false,
  users: [],
  sites: [],
  departments: [],
  functions: [],
  languages: [],
  userProfile: null,
  error: '',
  message: '',
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: paths.getAllUsers,
        data: new FormData(),
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

export const fetchUserById = createAsyncThunk(
  'userProfile/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await get({
        url: `${paths.getUserById}/${id}`,
      });
      return response;
    } catch (error) {
      const message = error.message;
      const status = error.response.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const postUser = createAsyncThunk(
  'user/postUsers',
  async (data, { rejectWithValue }) => {
    try {
      const response = await post({
        url: paths.postUser,
        data,
        options: {
          headers: {
            'Content-Type': 'application/form-data',
          },
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    console.log(id);
    try {
      const response = await post({
        url: `${paths.editUser}/${id}`,
        data,
        options: {
          headers: {
            'Content-Type': 'application/form-data',
          },
          params: {
            _method: 'put',
          },
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      const status = error.response.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await post({
        url: `${paths.deleteUser}`,
        data,
        options: {
          headers: {
            'Content-Type': 'application/form-data',
          },
          params: {
            _method: 'delete',
          },
        },
      });
      return response;
    } catch (error) {
      const message = error.message;
      const status = error.response.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'user/toggleUserStatus',
  async (data, { rejectWithValue }) => {
    const { id, status } = data;
    try {
      const response = await put({
        url: paths.updateUserStatus,
        options: {
          params: {
            status: status,
            id: id,
          },
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const filterUsers = createAsyncThunk(
//   'user/filterUsers',
//   async (data, { rejectWithValue }) => {
//     const { name, date, role } = data;
//     let params = [];
//     if (name) params.push(`name=${name}`);
//     if (date) params.push(`date=${date}`);
//     if (role) params.push(`role=${role}`);
//     params = params.join('&');
//     console.log(params);
//     try {
//       // const response = await get({
//       //   url: `${paths.updateUserStatus}/${params}`,
//       // });
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    resetUserFetch: (state) => {
      state.fetched = false;
    },
    editProfile: (state, action) => {
      console.log(action.payload);
    },
    clearUserMessage: (state) => {
      state.message = '';
    },
    clearUser: (state) => {
      state.userProfile = null;
    },
    clearUserError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = '';
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.users = [];
        state.error = action.payload.message;
      });
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.user;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.userProfile = null;
        state.error = action.payload.message;
      });
    builder
      .addCase(postUser.pending, (state) => {
        state.posting = true;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        state.fetched = false;
        const { user } = action.payload.data;
        state.users.unshift({ ...user });
      })
      .addCase(postUser.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleting = false;
        state.fetched = false;
        state.error = '';
        // const id = action.payload.data.ids[0];
        // state.users = state.users.filter((cn) => {
        //   return cn.id !== id * 1;
        // });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(toggleUserStatus.pending, (state) => {
        state.toggeling = true;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.toggeling = false;
        const { user } = action.payload;

        const index = state.users.findIndex((_user) => _user.id === user.id);
        state.users[index].status = user.status;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.toggeling = false;
        state.error = 'This email does not exist.';
      });
    builder
      .addCase(editUser.pending, (state) => {
        state.posting = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.posting = false;
        state.fetched = false;
        const { user } = action.payload.data;
        state.users = state.users.map((_user) => {
          if (_user.id === user.id) {
            return user;
          } else return _user;
        });
      })
      .addCase(editUser.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
    // builder
    //   .addCase(filterUsers.pending, (state) => {
    //     state.fetched = true;
    //   })
    //   .addCase(filterUsers.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.fetched = true;
    //     state.error = '';
    //     state.users = action.payload.users;
    //   })
    //   .addCase(filterUsers.rejected, (state, action) => {
    //     state.fetched = false;
    //     state.error = action.error.message;
    //   });
  },
});

export const selectUsers = (state) => state.user.users;

export const selectUserById = createSelector(
  [selectUsers, (users, id) => id],
  (users, id) => users.filter((user) => user.id === id)
);

export const {
  resetUser,
  resetUserFetch,
  clearUserMessage,
  clearUserError,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
