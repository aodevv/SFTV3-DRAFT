import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { clientEditStatus, resetFetch } from '../clientSlice/clientSlice';
import {
  editClientStatus,
  editClientSubscription,
} from '../siteSlice/siteSlice';

const initialState = {
  loading: false,
  posting: false,
  error: '',
  fetched: false,
  clientFetch: true,
  client: null,
  ppe_styles: [],
  preferences: {},
  report_styles: [],
  report_types: [],
  subscriptions: [],
  table_styles: [],
  languages: [],
};

export const fetchPreferences = createAsyncThunk(
  'preference/fetchPreferences',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/client/preference/${id}`);

      return { ...response, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setSubscription = createAsyncThunk(
  'preference/setSubscription',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const { clientId, subscriptionId } = ids;
      const response = await api.put(
        `/admin/client/preference/subscription/${clientId}?subscription_id=${subscriptionId}`
      );
      dispatch(resetFetch());

      if (response.data.subscription.subscription_id) {
        dispatch(editClientSubscription(response.data.subscription));
      } else {
        dispatch(editClientSubscription(null));
        dispatch(editClientStatus(2));
        dispatch(clientEditStatus({ id: 2, clientId }));
      }

      return { ...response, clientId, subscriptionId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReportType = createAsyncThunk(
  'preference/updateReportType',
  async (ids, { rejectWithValue }) => {
    try {
      const { clientId, reportTypeId } = ids;
      const response = await api.put(
        `/admin/client/preference/report-type/${clientId}?report_type_id=${reportTypeId}`
      );

      return { ...response, clientId, reportTypeId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReportStyle = createAsyncThunk(
  'preference/updateReportStyle',
  async (ids, { rejectWithValue, dispatch, getState }) => {
    const { preference } = getState();
    try {
      const { clientId, reportStyleId } = ids;
      const response = await api.put(
        `/admin/client/preference/report-style/${clientId}?report_style_id=${reportStyleId}`
      );
      const ppeId = preference.preferences?.p_p_e_style_id;
      if (reportStyleId === 2 || reportStyleId === 1) {
        if (ppeId !== 1) {
          dispatch(updatePPEStyle({ clientId, styleId: 1 }));
        }
      }
      if (reportStyleId === 3) {
        if (ppeId !== 2) {
          dispatch(updatePPEStyle({ clientId, styleId: 2 }));
        }
      }

      return { ...response, reportStyleId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTableStyle = createAsyncThunk(
  'preference/updateTableStyle',
  async (ids, { rejectWithValue }) => {
    try {
      const { clientId, styleId } = ids;
      const response = await api.put(
        `/admin/client/preference/table-style/${clientId}?table_style_id=${styleId}`
      );

      return { ...response, styleId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePPEStyle = createAsyncThunk(
  'preference/updatePPEStyle',
  async (ids, { rejectWithValue }) => {
    try {
      const { clientId, styleId } = ids;
      const response = await api.put(
        `/admin/client/preference/ppe-style/${clientId}?p_p_e_style_id=${styleId}`
      );

      return { ...response, styleId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLanguage = createAsyncThunk(
  'preference/updateLanguage',
  async (ids, { rejectWithValue }) => {
    try {
      const { languageId, statusId, defaultId } = ids;
      const response = await api.put(
        `/admin/client/preference/langue/${languageId}?default_preference_langue=${defaultId}&status_id=${statusId}`
      );

      return { ...response, languageId, statusId, defaultId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const preferencesSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    resetPreference: () => initialState,
    disableClientFetch: (state, action) => {
      state.clientFetch = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.fetched = false;
        state.error = '';
        state.ppe_styles = [];
        state.preferences = {};
        state.report_styles = [];
        state.report_types = [];
        state.subscriptions = [];
        state.table_styles = [];
        state.languages = [];
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.fetched = true;
        state.client = action.payload.data.client;
        state.ppe_styles = action.payload.data.ppe_styles;
        state.preferences = action.payload.data.preference;
        state.report_styles = action.payload.data.report_styles;
        state.report_types = action.payload.data.report_types;
        state.subscriptions = action.payload.data.subscriptions;
        state.table_styles = action.payload.data.table_styles;
        state.languages = action.payload.data.preference.preference_langues;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = action.payload.message;
      });
    builder
      .addCase(updateReportType.pending, (state, action) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(updateReportType.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        const { reportTypeId } = action.payload;
        state.preferences.report_type_id = reportTypeId;
      })
      .addCase(updateReportType.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload?.message;
      });
    builder
      .addCase(updateTableStyle.pending, (state, action) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(updateTableStyle.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        const { styleId } = action.payload;
        state.preferences.table_style_id = styleId;
      })
      .addCase(updateTableStyle.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload?.message;
      });
    builder
      .addCase(updateReportStyle.pending, (state, action) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(updateReportStyle.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        const { reportStyleId } = action.payload;
        state.preferences.report_style_id = reportStyleId;
      })
      .addCase(updateReportStyle.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload?.message;
      });
    builder
      .addCase(updatePPEStyle.pending, (state, action) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(updatePPEStyle.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        const { styleId } = action.payload;
        state.preferences.p_p_e_style_id = styleId;
      })
      .addCase(updatePPEStyle.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload?.message;
      });

    builder
      .addCase(setSubscription.pending, (state, action) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(setSubscription.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        const { subscriptionId } = action.payload;
        state.preferences.subscription_id = subscriptionId;
        state.preferences.date_subscription =
          action.payload.data?.subscription?.date_subscription;
      })
      .addCase(setSubscription.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload?.message;
      });

    builder
      .addCase(updateLanguage.pending, (state, action) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        state.posting = false;
        state.error = '';
        const { languageId, statusId, defaultId, response } = action.payload;
        const index = state.languages.findIndex((ln) => ln.id === languageId);
        state.languages[index].status_id = statusId;
        state.languages = state.languages.map((ln) => ({
          ...ln,
          default_preference_langue: 0,
        }));
        state.languages[index].default_preference_langue = defaultId;
        // state.languages = action.payload.data.preference.preference_langues;
        // state.preferences.subscription_id = subscriptionId;
      })
      .addCase(updateLanguage.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload?.message;
      });
  },
});

export const { disableClientFetch, resetPreference } = preferencesSlice.actions;

export default preferencesSlice.reducer;
