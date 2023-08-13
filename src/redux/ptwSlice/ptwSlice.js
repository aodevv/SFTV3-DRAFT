import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  loading: false,
  posting: false,
  deleting: false,
  categoriesLoading: false,
  subCategoriesLoading: false,
  error: '',
  categoriesError: '',
  subCategoriesError: '',
  fetched: false,
  categoriesFetched: false,
  subCategoriesFetched: false,
  topCategories: [],
  categories: [],
  subCategories: [],
};

export const fetchTopCategories = createAsyncThunk(
  'profile/fetchTopCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/ptw/top-categories');
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'profile/fetchCategories',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/ptw/categories?ptw_topcategory_id=${id}`
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const fetchSubCategories = createAsyncThunk(
  'profile/fetchSubCategories',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/ptw/subcategories?category_id=${id}`
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const addCategory = createAsyncThunk(
  'profile/addCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/ptw/categories`, data);
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);
export const addSubCategory = createAsyncThunk(
  'profile/addSubCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/ptw/subcategories`, data);
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const deleteCategories = createAsyncThunk(
  'profile/deleteCategories',
  async (params, { rejectWithValue }) => {
    try {
      const { data, ids } = params;
      const response = await api.post(
        `/admin/ptw/categories/delete?_method=delete`,
        data
      );
      return { ...response, ids };
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const deleteSubCategories = createAsyncThunk(
  'profile/deleteSubCategories',
  async (params, { rejectWithValue }) => {
    try {
      const { data, ids } = params;
      const response = await api.post(
        `/admin/ptw/subcategories/delete?_method=delete`,
        data
      );
      return { ...response, ids };
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const updateCategory = createAsyncThunk(
  'profile/updateCategory',
  async (params, { rejectWithValue }) => {
    try {
      const { data, id } = params;
      const response = await api.post(
        `/admin/ptw/categories/${id}?_method=put`,
        data
      );
      return { ...response, id };
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

export const updateSubcategory = createAsyncThunk(
  'profile/updateSubcategory',
  async (params, { rejectWithValue }) => {
    try {
      const { data, id } = params;
      const response = await api.post(
        `/admin/ptw/subcategories/${id}?_method=put`,
        data
      );
      return { ...response, id };
    } catch (error) {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      return rejectWithValue({ message, status });
    }
  }
);

// {{api}}/ptw/subcategories?category_id=1

// ptw/categories?ptw_topcategory_id=1

const ptwSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCategories.pending, (state) => {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(fetchTopCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.topCategories = action.payload.data;
        state.fetched = true;
      })
      .addCase(fetchTopCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fetched = true;
      });
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesFetched = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = '';
        state.categories = action.payload.data;
        state.categoriesFetched = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
        state.categoriesFetched = true;
      });
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.subCategoriesLoading = true;
        state.subCategoriesFetched = false;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subCategoriesLoading = false;
        state.subCategoriesError = '';
        state.subCategories = action.payload.data;
        state.subCategoriesFetched = true;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.subCategoriesLoading = false;
        state.subCategoriesError = action.payload;
        state.subCategoriesFetched = true;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.posting = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.posting = false;
        state.categories.push(action.payload.data?.category);
        state.error = '';
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.posting = false;
        console.log('error:', action.payload);
        state.error = action.payload;
      });

    builder
      .addCase(addSubCategory.pending, (state) => {
        state.posting = true;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.posting = false;
        console.log(action.payload.data?.['sub category']);
        state.subCategories.push(action.payload.data?.['sub category']);
        state.error = '';
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.posting = false;
        console.log('error:', action.payload);
        state.error = action.payload.message;
      });

    builder
      .addCase(deleteSubCategories.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteSubCategories.fulfilled, (state, action) => {
        state.deleting = false;
        console.log(action.payload);
        state.subCategories = state.subCategories.filter(
          (el) => !action.payload.ids.includes(el.id)
        );
        state.error = '';
      })
      .addCase(deleteSubCategories.rejected, (state, action) => {
        state.deleting = false;
        console.log('error:', action.payload);
        state.error = action.payload.message;
      });

    builder
      .addCase(deleteCategories.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.deleting = false;
        console.log(action.payload);
        state.categories = state.categories.filter(
          (el) => !action.payload.ids.includes(el.id)
        );
        state.error = '';
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.deleting = false;
        console.log('error:', action.payload);
        state.error = action.payload.message;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.posting = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.posting = false;
        console.log(action.payload);
        const {
          id,
          data: { category },
        } = action.payload;
        const index = state.categories.findIndex((cl) => cl.id === id);
        state.categories[index] = category;
        state.error = '';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.posting = false;
        console.log('error:', action.payload);
        state.error = action.payload.message;
      });

    builder
      .addCase(updateSubcategory.pending, (state) => {
        state.posting = true;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.posting = false;
        console.log(action.payload);
        const {
          id,
          data: { subcategory },
        } = action.payload;
        const index = state.subCategories.findIndex((cl) => cl.id === id);
        state.subCategories[index] = subcategory;
        state.error = '';
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.posting = false;
        console.log('error:', action.payload);
        state.error = action.payload.message;
      });
  },
});

export default ptwSlice.reducer;
