import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "./../../Config/axiosInstance";

const initialState = {
  ticketList: [],
  dowloadedTickets: [],
  ticketDistribution: {
    open: 0,
    inProgress: 0,
    resolved: 0,
    onHold: 0,
    cancelled: 0,
  },
};

export const getMyAssignedTickets = createAsyncThunk(
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


export const getMyCreatedTickets = createAsyncThunk(
  "tickets/getMyCreatedTickets",
  async () => {
    try {
      const response = axiosInstance.get("getMyCreatedTickets", {
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


export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async (ticket) => {
    try {
      const response = axiosInstance.patch(
        `ticket/${ticket._id}`,
        ticket, // req body
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      toast.promise(response, {
        success: "Successfully updated the ticket",
        loading: "Updating the ticket",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticket) => {
    try {
      const response = axiosInstance.post(
        `ticket`,
        ticket, // req body
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      toast.promise(response, {
        success: "Successfully created the ticket",
        loading: "working to creating the ticket",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  }
);

const mappedStatus = {
  open: "Open",
  inProgress: "In Progress",
  resolved: "Resolved",
  onHold: "On Hold",
  cancelled: "Cancelled",
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    filterTickets: (state, action) => {
      state.ticketList = state.dowloadedTickets.filter((element) => {
        return mappedStatus[element.status] == action.payload.status;
      });
    },
    resetTicketList: (state) => {
      state.ticketList = state.dowloadedTickets;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyAssignedTickets.fulfilled, (state, action) => {
        if (!action?.payload?.data?.result) return;
        state.dowloadedTickets = action.payload.data.result;
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
      }).addCase(getMyCreatedTickets.fulfilled, (state, action) => {
        if (!action?.payload?.data?.result) return;
        state.dowloadedTickets = action.payload.data.result;
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
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload.data.result;
        state.ticketList = state.ticketList.map((ticket) => {
          if (ticket._id == updatedTicket._id) return updatedTicket;
          return ticket;
        });
        state.dowloadedTickets = state.dowloadedTickets.map((ticket) => {
          if (ticket._id == updatedTicket._id) return updatedTicket;
          return ticket;
        });
        state.ticketDistribution = {
          open: 0,
          inProgress: 0,
          resolved: 0,
          onHold: 0,
          cancelled: 0,
        };
        state.dowloadedTickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] =
            state.ticketDistribution[ticket.status] + 1;
        });
      }).addCase(createTicket.fulfilled,(state,action)=>{
        
       const ticket = action.payload.data;

       state.dowloadedTickets.push(ticket);
       state.ticketList.push(ticket);
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

export const { filterTickets, resetTicketList } = ticketSlice.actions;
export default ticketSlice.reducer;
