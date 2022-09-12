import { createSlice } from "@reduxjs/toolkit";
import { getSharesData, getTargetTicket } from "../api/api";

const initialState = {
  sharesList: [],
  pendingStatus: null,
  sharesTrackedTicker: [],
};

export const sharesSlice = createSlice({
  name: "shares",
  initialState,
  reducers: {
    setShares: (state, actions) => {
      state.sharesList = actions.payload;
    },
    setSharesTrackedTicker: (state, actions) => {
      state.sharesTrackedTicker = [...state.sharesTrackedTicker, actions.payload];
    },
    deleteSharesTrackedTicker: (state, actions) => {
      state.sharesTrackedTicker = state.sharesTrackedTicker.filter(tiker => tiker !== actions.payload)
    },
    setTargetTicketsFromLS: (state, actions) => {
      state.sharesTrackedTicker = actions.payload
    },
  },
});

export const getSharesDataThunk = () => {
  return async (dispatch) => {
    const setData = (data) => dispatch(setShares(data))
    return getSharesData(setData)
  }
}

export const getTargetTicketThunk = () => {
  return async (dispatch) => {
    const targerTicket = await getTargetTicket()
    return dispatch(setTargetTicketsFromLS(targerTicket))
  }
}

export const { setShares, setSharesTrackedTicker, deleteSharesTrackedTicker, setTargetTicketsFromLS } = sharesSlice.actions;

export default sharesSlice.reducer;
