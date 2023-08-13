import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import api from '../api';
import { get, post } from '../../api/helpers';
import { paths } from '../../routers/paths';

const initialState = {
  functions: [],
  error: '',
  fetched: false,
  loading: false,
  posting: false,
  deleting: false,
};

export const fetchFunctions = createAsyncThunk(
  'function/fetchFunctions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get({
        url: paths.getAllFunctions,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const postFunction = createAsyncThunk(
  'function/postFunction',
  async (name, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      const response = api.post('/admin/functions', formData);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFunction = createAsyncThunk(
  'function/deleteFunction',
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/functions?name=${name}`);
      return { ...response, name };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const functionSlice = createSlice({
  name: 'fct',
  initialState,
  reducers: {
    resetFunction: () => initialState,
    resetFetch: (state) => {
      state.fetched = false;
    },
    addFunction: (state, payload) => {
      console.log(payload.payload);
      state.functions.push(payload.payload);
    },
    removeFunction: (state, payload) => {
      console.log(payload.payload);
      state.functions = state.functions.filter(
        (fn) => fn.id !== payload.payload
      );
    },
    setLoader: (state, payload) => {
      state.loading = payload.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFunctions.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchFunctions.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = '';
        state.functions = action.payload;
      })
      .addCase(fetchFunctions.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.functions = [];
        state.error = action.payload;
      });
    builder
      .addCase(postFunction.pending, (state) => {
        state.posting = true;
        state.error = '';
      })
      .addCase(postFunction.fulfilled, (state, action) => {
        const { function: fct } = action.payload.data;
        const found = state.functions.find((el) => el.id === fct.id);
        if (!found) {
          state.functions.push(action.payload.data.function);
        } else {
          state.functions = state.functions.filter((el) => el.id !== found.id);
          state.functions.push({ ...found, hidden: false });
        }
        state.posting = false;
        state.error = '';
      })
      .addCase(postFunction.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(deleteFunction.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteFunction.fulfilled, (state, action) => {
        const { name } = action.payload;
        state.functions = state.functions.map((el) => {
          if (el.name === name) return { ...el, hidden: true };
          return el;
        });
        state.deleting = false;
        state.error = '';
      })
      .addCase(deleteFunction.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.message;
      });
  },
});

export const selectFunction = (state) => state.function.functions;

export const selectFunctionById = createSelector(
  [selectFunction, (functions, id) => id],
  (functions, id) => functions.find((fun) => fun.id == id)
);

export const {
  resetFunction,
  resetFetch,
  addFunction,
  removeFunction,
  setLoader,
  clearError,
} = functionSlice.actions;
export default functionSlice.reducer;
