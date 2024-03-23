import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slices/AuthSlice";
import ticketReducer from "./Slices/TicketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
