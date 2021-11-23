import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('login', async (user, thunkAPI) => {
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		let data = await response.json();

		if (response.status === 200) {
			localStorage.setItem('user', JSON.stringify(user));
			return { ...data };
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (e) {
		thunkAPI.rejectWithValue(e.response.data);
	}
});
export const userSlice = createSlice({
	name: 'user',
	initialState: {
		email: '',
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: '',
	},
	reducers: {
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;

			return state;
		},
	},
	extraReducers: {
		[loginUser.fulfilled]: (state, { payload }) => {
			state.email = payload.data.email;
			state.isFetching = false;
			state.isSuccess = true;
			return state;
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.message;
		},
		[loginUser.pending]: (state) => {
			state.isFetching = true;
		},
	},
});

export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
