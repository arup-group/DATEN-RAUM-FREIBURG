import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * @param { number[]} coordinate - x,y,z map coodinate array in degrees
 */
export interface WFSCentreCoordStateProp {
  coordinate: number[];
}

//initial coordinate state
const initialState: WFSCentreCoordStateProp = {
  coordinate: [0, 0, 0],
};

//Redux slice for storing state of centre coordinate of map instance for ingested WFS data
export const WfsCentreCoordSlice = createSlice({
  name: "wfsCentreCoord",
  initialState,
  reducers: {
    updateCentreCoordinate: (state: any, action: PayloadAction<number[]>) => {
      state.coordinate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCentreCoordinate } = WfsCentreCoordSlice.actions;

export default WfsCentreCoordSlice.reducer;
