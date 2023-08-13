import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';
import {
  incrementClientSites,
  decrementClientSites,
} from '../clientSlice/clientSlice';

const initialState = {
  sites: [],
  client: null,
  error: '',
  fetched: false,
  loading: false,
  posting: false,
  deleting: false,
};

export const fetchSites = createAsyncThunk(
  'site/fetchSites',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/sites?client_id=${id}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const postSite = createAsyncThunk(
  'site/postSite',
  async (data, { rejectWithValue, dispatch }) => {
    const { formdata, clientId } = data;
    try {
      const response = await api.post('/admin/sites', formdata);

      dispatch(incrementClientSites(clientId));

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editSite = createAsyncThunk(
  'site/editSite',
  async (data, { rejectWithValue }) => {
    try {
      const { formdata, id } = data;
      const response = await api.post(
        `/admin/sites/${id}?_method=put`,
        formdata
      );

      return { ...response, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editSiteContacts = createAsyncThunk(
  'site/editSiteContacts',
  async (data, { rejectWithValue }) => {
    try {
      const { formdata, id } = data;
      const response = await api.post(
        `/admin/site/update/person/${id}`,
        formdata
      );

      return { ...response, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSite = createAsyncThunk(
  'site/deleteSite',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const { id, clientId } = ids;
      const response = await api.delete(`/admin/sites/${id}`);

      dispatch(decrementClientSites(clientId));

      return { ...response, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const siteEditStatus = createAsyncThunk(
  'site/siteEditStatus',
  async (data, { rejectWithValue }) => {
    try {
      const { id, siteId } = data;
      const response = await api.post(
        `/admin/sites/status/${siteId}?_method=put`
      );

      return { ...response, id, siteId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    resetSite: () => initialState,
    clearSites: (state) => {
      state.sites = [];
    },
    resetSiteFetch: (state) => {
      state.fetched = false;
    },
    editClientContactsInSite: (state, action) => {
      state.client.person_clients = action.payload;
    },
    editClientStatus: (state) => {
      state.client.status = !state.client.status;
    },
    editClientSubscription: (state, action) => {
      state.client.preference.subscription = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = '';
        state.sites = action.payload.data.sites;
        state.client = action.payload.data.client;
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.sites = [];
        state.client = null;
        state.error = action.payload;
      });
    builder
      .addCase(postSite.pending, (state) => {
        state.posting = true;
      })
      .addCase(postSite.fulfilled, (state, action) => {
        state.sites.unshift({ ...action.payload.data.site });
        state.client.sites_count += 1;
        state.posting = false;
        state.error = '';
      })
      .addCase(postSite.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(editSite.pending, (state) => {
        state.posting = true;
      })
      .addCase(editSite.fulfilled, (state, action) => {
        const {
          data: { site },
          id,
        } = action.payload;
        const index = state.sites.findIndex((st) => st.id === id);
        state.sites[index] = site;
        state.posting = false;
        state.error = '';
      })
      .addCase(editSite.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(deleteSite.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteSite.fulfilled, (state, action) => {
        state.sites = state.sites.filter((st) => st.id !== action.payload.id);
        state.client.sites_count -= 1;
        state.deleting = false;
        state.error = '';
      })
      .addCase(deleteSite.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(siteEditStatus.pending, (state) => {
        state.posting = true;
      })
      .addCase(siteEditStatus.fulfilled, (state, action) => {
        const { siteId } = action.payload;
        const index = state.sites.findIndex((cl) => cl.id === siteId);
        state.sites[index].status = !state.sites[index].status;
        state.posting = false;
        state.error = '';
      })
      .addCase(siteEditStatus.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  editClientContactsInSite,
  resetSite,
  resetSiteFetch,
  editClientStatus,
  editClientSubscription,
} = siteSlice.actions;

export default siteSlice.reducer;
