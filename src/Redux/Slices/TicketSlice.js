import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "./../../Config/axiosInstance";

const initialState = {
  ticketList: [],
  ticketDistribution: {
    open: 0,
    inProgress: 0,
    resolved: 0,
    onHold: 0,
    cancelled: 0,
  },
};

export const getTickets = createAsyncThunk(
  "tickets/getMyAssignedTickets",
  async () => {
    try {
      const response = axiosInstance.get("getMyAssignedTickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      toast.promise(response, {
        loading: "Fetching tickets ..",
        success: "Successfully fetch tickets",
        error: "Something went wrong, try again",
      });
      return await response;
    } catch (error) {
      console.log("printing error", error);
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTickets.fulfilled, (state, action) => {
      if (!action?.payload?.data?.result) return;
      state.ticketList = action.payload.data.result;
      state.ticketDistribution = {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0,
      };
      state.ticketList.forEach((ticket) => {
        state.ticketDistribution[ticket.status] =
          state.ticketDistribution[ticket.status] + 1;
      });
    });
  },
});
export default ticketSlice.reducer;
