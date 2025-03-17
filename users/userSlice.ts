import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from './CreateUserDto'
import { UsersAPI } from './UsersAPI'


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
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);
      state.errormessage = "";
    }),
    builder.addCase(signup.rejected, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);
        
        state.errormessage = "Error signing up";
    })
  },
})

export default userSlice.reducer