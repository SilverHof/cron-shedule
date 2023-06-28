import { toShortString } from "./toShortString";

export const currentDisplayData = (
   currentArray,
   defaultText,
   data,
   storeKey
) => {
   let currentString = "";

   if (storeKey === "minutes" || storeKey === "hours" || storeKey === "daysOfWeek" || storeKey === "months") {
      if (currentArray[0] === "*") {
         currentString = `${defaultText}`;
      } else if (currentArray.length === 1) {
         currentString += data[currentArray[0]];
      } else {
         for (let index = 0; index < currentArray.length; index++) {
            currentString += data[currentArray[index]] + ",";
         }

         if (currentString.endsWith(",")) {
            currentString = currentString.substring(
               0,
               currentString.length - 1
            );
         }

         currentString = toShortString(currentArray, data);
      }
   } else if (storeKey === "daysOfMonth") {
      if (currentArray[0] === "*") {
         currentString = `${defaultText}`;
      } else if (currentArray.length === 1) {
         currentString += data[currentArray[0] - 1];
      } else {
         for (let index = 0; index < currentArray.length; index++) {
            currentString += data[currentArray[index - 1]] + ",";
         }

         if (currentString.endsWith(",")) {
            currentString = currentString.substring(
               0,
               currentString.length - 1
            );
         }

         currentString = toShortString(currentArray, data);
      }
   }

   return currentString;
};
