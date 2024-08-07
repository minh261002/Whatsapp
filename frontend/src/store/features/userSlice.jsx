import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENPOINT = `${import.meta.env.VITE_API_ENDPOINT}/auth`;

const initialState = {
    error: "",
    status: "",
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    }
};

export const createUser = createAsyncThunk('auth/register', async (value, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_ENPOINT}/register`, {
            ...value
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (value, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_ENPOINT}/login`, {
            ...value
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            }
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "successed";
                state.user = action.payload.user;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "successed";
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout, changeStatus } = userSlice.actions;

export default userSlice.reducer;