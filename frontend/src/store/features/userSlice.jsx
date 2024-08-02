import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errors:"",
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

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.errors = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            }
        },
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;