import { configureStore } from "@reduxjs/toolkit";
import activationTokenReducer from "../features/account/activationToken";
import calenderReducer from "../features/calender";
import stickersReducer from "../features/calender/stickers";
import tutorialReducer from "../features/tutorial";
import profileReducer from "../features/profile";

export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    stickers: stickersReducer,
    tutorial: tutorialReducer,
    activationToken: activationTokenReducer,
    profile: profileReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
