export const toShortString = (array, replacementArray) => {
   if (array[0] === "*") return "*";

   let result = "";
   let startRange = null;
   let endRange = null;

   for (let i = 0; i < array.length; i++) {
      if (startRange === null) {
         // Start a new range
         startRange = array[i];
         endRange = array[i];
      } else if (array[i] === endRange + 1) {
         // Expand the current range
         endRange = array[i];
      } else {
         // Finish the current range
         if (startRange === endRange) {
            result += replacementArray[startRange] + ",";
         } else {
            result +=
               replacementArray[startRange] +
               "-" +
               replacementArray[endRange] +
               ",";
         }
         startRange = array[i];
         endRange = array[i];
      }
   }

   // Add the last range to the result
   if (startRange === endRange) {
      result += replacementArray[startRange];
   } else {
      result += replacementArray[startRange] + "-" + replacementArray[endRange];
   }

   return result;
};
