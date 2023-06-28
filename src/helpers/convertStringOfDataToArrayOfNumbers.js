export const convertStringOfDataToArrayOfNumbers = (str, dataType) => {
   if (dataType === "numbers") {
      const result = [];

      if (str.includes(",")) {
         const parts = str.split(",");

         for (let i = 0; i < parts.length; i++) {
            if (parts[i].includes("-")) {
               const range = parts[i].split("-");

               const start = parseInt(range[0], 10);
               const end = parseInt(range[1], 10);

               for (let j = start; j <= end; j++) {
                  result.push(j);
               }
            } else {
               result.push(parseInt(parts[i], 10));
            }
         }
      } else if (str.includes("-")) {
         const range = str.split("-");

         const start = parseInt(range[0], 10);
         const end = parseInt(range[1], 10);

         for (let j = start; j <= end; j++) {
            result.push(j);
         }
      } else {
         result.push(parseInt(str, 10));
      }

      return result;
   } else if (dataType === "daysOfWeek") {
      const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

      const convertedString = str.replace(
         /\b(mon|tue|wed|thu|fri|sat|sun)\b/gi,
         (match) => {
            const index = daysOfWeek.findIndex(
               (day) => day.toLowerCase() === match.toLowerCase()
            );
            return index !== -1 ? index.toString() : match;
         }
      );

      return convertedString;
   } else if (dataType === "months") {
      const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct","nov", "dec"];

      const convertedString = str.replace(
         /\b(jan|feb|mar|apr|mau|jun|jul|aug|sep|oct|nov|dec)\b/gi,
         (match) => {
            const index = months.findIndex(
               (month) => month.toLowerCase() === match.toLowerCase()
            );
            return index !== -1 ? index.toString() : match;
         }
      );
   
      return convertedString;
   }
};
