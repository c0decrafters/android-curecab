import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.sort((a, b) => {
        return new Date(b.orderDate) - new Date(a.orderDate);
      });
    },
    updateOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },

    updateOrdersData: (state, action) => {
      const orderToChange = state.orders.find(
        (o) => o.orderId === action.payload
      );
      orderToChange.status = "delivered";
      orderToChange.delivered = true;
    },
  },
});

export const { setOrders, updateOrders, toggleOrder, updateOrdersData } =
  OrderSlice.actions;
export default OrderSlice.reducer;
