import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApi = createAsyncThunk(
  "api/fetchApi",
  async ({ url, method, body }) => {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? JSON.stringify(body) : null,
    });

    const data = await res.json();
    return { data, status: res.status };
  }
);

export const axiosApi = createAsyncThunk(
  "api/axiosApi",
  async ({ url, method, body }) => {
    const res = await axios({
      url,
      method,
      data: body,
    });

    return { data: res.data, status: res.status };
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: true,
    data: null,
    error: null,
    status: null,
    method: "",
    url: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(axiosApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(axiosApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(axiosApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;