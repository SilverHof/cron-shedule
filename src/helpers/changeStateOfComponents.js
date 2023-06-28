import { bubleSort } from "./bubleSort";
import { convertStringOfDataToArrayOfNumbers } from "./convertStringOfDataToArrayOfNumbers";

export const changeStateOfComponents = (
   stringToConvert,
   dataType, 
   className,
   isDays
) => {

   let stateArray = [];

   if (dataType === "numbers") {
      stateArray = convertStringOfDataToArrayOfNumbers(stringToConvert, "numbers");
   } else {
      stateArray = convertStringOfDataToArrayOfNumbers(stringToConvert, dataType);
      stateArray = convertStringOfDataToArrayOfNumbers(stateArray, "numbers");
   }

   const uniqueStateArrayOfNumbers = [...new Set(stateArray)];
   const finalState = [];
   const newActiveButtons = [];

   let minusOneFromIndex = 0;

   if (isDays === true) {
      minusOneFromIndex = 1;
   }

   for (let index = 0; index < uniqueStateArrayOfNumbers.length; index++) {
      finalState.push(uniqueStateArrayOfNumbers[index] - minusOneFromIndex);
      newActiveButtons.push(`${className}${uniqueStateArrayOfNumbers[index] - minusOneFromIndex}`);
   }

   const newState = bubleSort(finalState);

   return [newState, newActiveButtons];
};
