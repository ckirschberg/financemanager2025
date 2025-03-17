import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateUserDto } from './CreateUserDto'
import { UsersAPI } from './UsersAPI'
import * as SecureStore from 'expo-secure-store';

export const signup = createAsyncThunk(
    'auth/signup', // not the endpoint
    async (createUserDto: CreateUserDto, thunkAPI) => {
        // the returned value will be the content of action.payload

      return await UsersAPI.signup(createUserDto)
    },
  )


interface UserState {
  token: string,
  errormessage: string
}

const initialState: UserState = {
  token: '',
  errormessage: ''
} 

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);
      SecureStore.setItemAsync('object', JSON.stringify(action.payload));
      // state.token = action.payload; // in login.fulfilled

      state.errormessage = "";
    }),
    builder.addCase(signup.rejected, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);
        
        state.errormessage = "Error signing up";
    })
  },
})

// Action creators are generated for each case reducer function
export const { reloadJwtFromStorage } = userSlice.actions

export default userSlice.reducer
