import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoryEntity } from './CategoryEntity'
import { CategoriesAPI } from './CategoriesAPI'

// First, create the thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async ( thunkAPI) => {
    return await CategoriesAPI.getCategories()
  },
)

export const createCategory = createAsyncThunk(
    'categories/create',
    async (category: CategoryEntity, thunkAPI) => {
        // the returned value will be the content of action.payload
      return await CategoriesAPI.createCategory(category) 
    },
  )


interface CategoryState {
  categories: CategoryEntity[],
  errormessage: string
}

const initialState: CategoryState = {
  categories: [],
  errormessage: ''
} 

// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);
      
      state.categories = action.payload;
    }),
    builder.addCase(createCategory.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);
        
        state.categories.push(action.payload); // action.payload is the new category
        state.errormessage = "";
    })
    builder.addCase(createCategory.rejected, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);
        
        state.errormessage = "Error creating category";
    })
  },
})

export default categorySlice.reducer