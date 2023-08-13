import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { get, post, dlt } from '../../api/helpers';
import { rolesPaths } from '../../routers/paths';

const initialState = {
  permissions: [],
  roles: [],
  error: '',
  rolesFetched: false,
  rolesLoading: false,
  rolesError: false,
  fetched: false,
  loading: false,
  posting: false,
  deleting: false,
  toggeling: false,
};

export const fetchRoles = createAsyncThunk(
  'client/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: rolesPaths.roles,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const fetchPermissions = createAsyncThunk(
  'client/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: rolesPaths.getPermissions,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const updatePermissionStatus = createAsyncThunk(
  'client/updatePermissionStatus',
  async (data, { rejectWithValue }) => {
    try {
      const { status, roleId, permissionId } = data;
      console.log(data);
      const formData = new FormData();
      formData.append('role_id', roleId);
      formData.append('permission_id', permissionId);
      formData.append('status', status ? '0' : '1');
      const response = await post({
        url: rolesPaths.toggleStatus,
        data: formData,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const deleteRole = createAsyncThunk(
  'client/deleteRole',
  async (ids, { rejectWithValue }) => {
    try {
      const params = ids.map((id, idx) => `ids[${idx}]=${id}`).join('&');
      const response = await dlt({
        url: `${rolesPaths.roles}?${params}`,
      });
      return { ...response, ids };
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

// core-v3.safetytracker.be/api/admin/roles/5?_method=put

export const addRole = createAsyncThunk(
  'client/addRole',
  async (data, { rejectWithValue }) => {
    try {
      const { name, index } = data;
      console.log(data);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('index', index);
      const response = await post({
        url: rolesPaths.roles,
        data: formData,
      });
      console.log(response);
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const editRoleName = createAsyncThunk(
  'client/editRoleName',
  async (data, { rejectWithValue }) => {
    try {
      const { id, name } = data;
      const formData = new FormData();
      formData.append('name', name);
      const response = await post({
        url: `${rolesPaths.roles}/${id}?_method=put`,
        data: formData,
      });
      console.log(response);
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

const rolesSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resetRoles: () => initialState,
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = '';
        state.permissions = action.payload.permissions;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.clients = [];
        state.error = action.payload.message;
      });
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.rolesLoading = true;
        state.rolesFetched = false;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.rolesLoading = false;
        state.rolesFetched = true;
        state.rolesError = '';
        state.roles = action.payload.roles;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.rolesLoading = false;
        state.rolesFetched = true;
        state.clients = [];
        state.rolesError = action.payload.message;
      });
    builder
      .addCase(updatePermissionStatus.pending, (state) => {
        state.toggeling = true;
      })
      .addCase(updatePermissionStatus.fulfilled, (state) => {
        state.toggeling = false;
        state.error = '';
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.toggeling = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(deleteRole.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.deleting = false;
        state.fetched = false;
        state.error = '';
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(addRole.pending, (state) => {
        state.posting = true;
      })
      .addCase(addRole.fulfilled, (state) => {
        state.posting = false;
        state.fetched = false;
        state.error = '';
      })
      .addCase(addRole.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(editRoleName.pending, (state) => {
        state.posting = true;
      })
      .addCase(editRoleName.fulfilled, (state) => {
        state.posting = false;
        state.fetched = false;
        state.error = '';
      })
      .addCase(editRoleName.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetRoles, clearError } = rolesSlice.actions;
export default rolesSlice.reducer;
