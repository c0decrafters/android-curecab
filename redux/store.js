import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import OrderSlice from "./features/OrderSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    orders: OrderSlice,
  },
});

export default store;
