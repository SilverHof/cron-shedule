import { bubleSort } from "../../helpers/bubleSort";

export const changeState = (state, action) => {
   if (state.includes(action.payload)) {
      const index = state.findIndex(
         (element) => element === action.payload
      );
      state.splice(index, 1);
   } else {
      state.push(action.payload);
   }

   if (state[0] === "*") {
      state.shift();
   }

   if (state.length === 0) {
      state[0] = "*";
   }

   state = bubleSort(state);

   return state;
};