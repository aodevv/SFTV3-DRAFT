import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import api from '../api';
import { get } from '../../api/helpers';
import { paths } from '../../routers/paths';

const initialState = {
  roles: [],
  error: '',
  fetched: false,
  loading: false,
  posting: false,
  deleting: false,
};

export const fetchRoles = createAsyncThunk(
  'role/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: paths.getAllRoles,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const postRole = createAsyncThunk(
  'role/postRole',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/client/store', data);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  'role/deleteRole',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/client/delete/${id}`);

      return { ...response, id };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    resetRole: () => initialState,
    resetFetch: (state) => {
      state.fetched = false;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = '';
        state.roles = action.payload.roles;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.roles = [];
        state.error = action.payload;
      });
    // builder
    //   .addCase(postFunction.pending, (state) => {
    //     state.posting = true;
    //   })
    //   .addCase(postFunction.fulfilled, (state, action) => {
    //     const {
    //       data: { function },
    //       id,
    //     } = action.payload;
    //     const index = state.functions.findIndex((cl) => cl.id === id);
    //     state.functions[index] = function;
    //     state.posting = false;
    //     state.error = '';
    //   })
    //   .addCase(postFunction.rejected, (state, action) => {
    //     state.posting = false;
    //     state.error = action.payload.message;
    //   });
    builder
      .addCase(postRole.pending, (state) => {
        state.deleting = true;
      })
      .addCase(postRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((cl) => cl.id !== action.payload.id);
        state.deleting = false;
        state.error = '';
      })
      .addCase(postRole.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.message;
      });
  },
});

export const selectRoles = (state) => state.role.roles;

export const selectRoleById = createSelector(
  [selectRoles, (role, id) => id],
  (role, id) => role.find((r) => r.id == id)
);

export const { resetRole, resetFetch, clearError } = roleSlice.actions;
export default roleSlice.reducer;
