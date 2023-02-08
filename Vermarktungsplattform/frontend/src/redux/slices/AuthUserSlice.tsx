import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SESSION_TOKEN_ID } from "../../utils/AuthSessionHelper";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

/**
 * Redux queries to log in user
 */
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }: any, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data }: any = await axios.post(
        `${process.env.API_URL}/users/login`,
        { email, password },
        config
      );

      // store user's token in local storage
      sessionStorage.setItem(SESSION_TOKEN_ID, data.token);

      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Redux slice to manage auth
 */
const AuthUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    userLogOut: () => {
      sessionStorage.removeItem(SESSION_TOKEN_ID);
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.userToken = action.payload.userToken;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = (
        action.payload
          ? action.payload
          : "Fehler bei der Autorisierung des Benutzers"
      ) as any;
      state.loading = false;
    });
  },
});

export const { userLogOut, reset } = AuthUserSlice.actions;

export default AuthUserSlice.reducer;
