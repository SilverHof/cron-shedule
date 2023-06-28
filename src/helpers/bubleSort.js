export const bubleSort = (arr) => {
   //Outer pass
   for (let i = 0; i < arr.length; i++) {
      //Inner pass
      for (let j = 0; j < arr.length - i - 1; j++) {
         //Value comparison using ascending order

         if (arr[j + 1] < arr[j]) {
            //Swapping
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
         }
      }
   }
   return arr;
};
