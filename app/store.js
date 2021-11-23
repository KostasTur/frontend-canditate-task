import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/user/userSlice';
export function makeStore() {
	return configureStore({
		reducer: { user: userSlice.reducer },
	});
}
const store = makeStore();
export const Appstate = store.getState;
export const AppDispatch = store.dispatch;

export default store;
