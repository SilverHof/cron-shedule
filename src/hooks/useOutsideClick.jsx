import { useEffect, useRef } from "react";

export const useOutsideClick = (elementRef, handler, attached = true ) => {
   useEffect(() => {
      if (!attached) return;

      const handleClick = (event) => {
         if (!elementRef.current) return;
         if (!elementRef.current.contains(event.target)) {
            handler();
         }
      };

      document.addEventListener("click", handleClick);

      return () => {
         document.removeEventListener("click", handleClick)
      }

   }, [elementRef, handler, attached]);
};
