import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import api from '../api';

import {
  editClientContactsInSite,
  editClientStatus,
  resetSiteFetch,
} from '../siteSlice/siteSlice';
import { dlt, get, post } from '../../api/helpers';
import { paths } from '../../routers/paths';

const initialState = {
  clients: [],
  error: '',
  fetched: false,
  loading: false,
  posting: false,
  deleting: false,
};

export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: paths.getAllClients,
      });
      return response;
    } catch (error) {
      console.log('🚀 ~ file: clientSlice.js:33 ~ error:', error);
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const postClient = createAsyncThunk(
  'client/postClient',
  async (data, { rejectWithValue }) => {
    try {
      for (var pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      const response = await api.post('/admin/clients', data);
      return response;
    } catch (error) {
      console.log('🚀 ~ file: clientSlice.js:49 ~ error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editClient = createAsyncThunk(
  'client/editClient',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { formdata, id } = data;
      const options = {
        params: {
          _method: 'put',
        },
        headers: {
          'Content-Type': 'application/form-data',
        },
      };
      const response = await post({
        url: paths.updateClient + `/${id}`,
        data: formdata,
        options: { ...options },
      });
      dispatch(resetSiteFetch());
      return { ...response, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clientEditStatus = createAsyncThunk(
  'client/clientEditStatus',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { id, clientId, fromSite } = data;
      const response = await api.post(
        `/admin/clients/status/${clientId}?_method=put`
      );

      if (fromSite) {
        dispatch(editClientStatus(id));
      }

      return { ...response, id, clientId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// core.ppe-monitoring.com/api/admin/client/update/status/2?status_id=1

export const editClientContacts = createAsyncThunk(
  'client/editClientContacts',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { formdata, id } = data;
      const options = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const response = await post({
        url: `${paths.updateClientContact}/${id}`,
        data: formdata,
        options,
      });

      dispatch(editClientContactsInSite(response.data.client.person_clients));

      return { ...response, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClient = createAsyncThunk(
  'client/deleteClient',
  async (id, { rejectWithValue }) => {
    try {
      const response = await dlt({
        url: `${paths.deleteClient}/${id}`,
      });
      return { ...response, id };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resetClient: () => initialState,
    resetFetch: (state) => {
      state.fetched = false;
    },
    clearError: (state) => {
      state.error = '';
    },
    addClient: (state) => {
      state.fullScreen = !state.fullScreen;
    },
    incrementClientSites: (state, action) => {
      if (state.clients.length > 0) {
        const index = state.clients.findIndex((cl) => cl.id === action.payload);
        state.clients[index].sites_count += 1;
      }
    },
    decrementClientSites: (state, action) => {
      if (state.clients.length > 0) {
        const index = state.clients.findIndex((cl) => cl.id === action.payload);
        state.clients[index].sites_count -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = '';
        state.clients = action.payload.clients;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.clients = [];
        state.error = action.payload;
      });

    builder
      .addCase(postClient.pending, (state) => {
        state.posting = true;
      })
      .addCase(postClient.fulfilled, (state, action) => {
        state.clients.unshift({ ...action.payload.data.client });
        state.posting = false;
        state.error = '';
      })
      .addCase(postClient.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(editClient.pending, (state) => {
        state.posting = true;
      })
      .addCase(editClient.fulfilled, (state, action) => {
        const {
          data: { client },
          id,
        } = action.payload;
        console.log(
          '🚀 ~ file: clientSlice.js:200 ~ .addCase ~ client:',
          client
        );
        const index = state.clients.findIndex((cl) => cl.id === id);
        state.clients[index] = client;
        state.posting = false;
        state.error = '';
      })
      .addCase(editClient.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(clientEditStatus.pending, (state) => {
        state.posting = true;
      })
      .addCase(clientEditStatus.fulfilled, (state, action) => {
        const { clientId } = action.payload;
        const index = state.clients.findIndex((cl) => cl.id === clientId);
        state.clients[index].status = !state.clients[index].status;
        state.posting = false;
        state.error = '';
      })
      .addCase(clientEditStatus.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(editClientContacts.pending, (state) => {
        state.posting = true;
      })
      .addCase(editClientContacts.fulfilled, (state, action) => {
        const {
          data: { client },
          id,
        } = action.payload;
        const index = state.clients.findIndex((cl) => cl.id === id);
        state.clients[index] = client;
        state.posting = false;
        state.error = '';
      })
      .addCase(editClientContacts.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(deleteClient.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (cl) => cl.id !== action.payload.id
        );
        state.deleting = false;
        state.error = '';
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.message;
      });
  },
});

export const selectClients = (state) => state.client.clients;

export const selectClientById = createSelector(
  [selectClients, (clients, id) => id],
  (clients, id) => clients.find((client) => client.id == id)
);

export const {
  addClient,
  incrementClientSites,
  decrementClientSites,
  resetClient,
  resetFetch,
  clearError,
} = clientSlice.actions;
export default clientSlice.reducer;
