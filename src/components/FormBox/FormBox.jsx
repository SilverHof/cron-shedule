import { useDispatch, useSelector } from "react-redux";
import "./FormBox.scss";
import {
   checkValidCronString,
   loadStateFromInput,
   resetAllData,
   setInvalidSyntaxFalse,
} from "../../store/slices/form.slice";
import { useState } from "react";

export const FormBox = () => {
   const [inputValue, setInputValue] = useState("* * * * *");
   const [isCustom, setIsCustom] = useState(false);
   const dispatch = useDispatch();
   const fieldValue = useSelector(
      (state) => state.formReducer.cronStringSave);
   const isInvalidSyntax = useSelector(
      (state) => state.formReducer.invalidSyntax);

   const handleInputChange = (event) => {
      setInputValue(event.target.value);
      dispatch(checkValidCronString(event.target.value));
   };

   const handleLoadButtonClick = () => {
      console.log(inputValue);
      dispatch(loadStateFromInput(inputValue));
   };

   const handleCopyButtonClick = () => {
      navigator.clipboard.writeText(fieldValue);
   };

   const handleToggleInput = () => {
      setIsCustom(!isCustom);
      setInputValue("* * * * *");
      dispatch(setInvalidSyntaxFalse());
      dispatch(resetAllData());
   };

   return (
      <form
         className="form-box"
         onSubmit={(event) => event.preventDefault()}
      >
         {isCustom ? (
            <input
               className="form-box__field"
               placeholder="Input custom cron string"
               value={inputValue}
               onChange={handleInputChange}
            />
         ) : (
            <span className="form-box__field">{fieldValue}</span>
         )}

         {isCustom ? (
            <button
               className="form-box__load-button"
               disabled={isInvalidSyntax}
               onClick={handleLoadButtonClick}
            >
               Load
            </button>
         ) : (
            <button
               className="form-box__copy-button"
               onClick={handleCopyButtonClick}
            >
               Copy
            </button>
         )}
         {isCustom ? (
            <button
               className="form-box__clear-button"
               onClick={handleToggleInput}
            >
               Clear
            </button>
         ) : (
            <button
               className="form-box__custom-button"
               onClick={handleToggleInput}
            >
               Custom
            </button>
         )}
      </form>
   );
};
