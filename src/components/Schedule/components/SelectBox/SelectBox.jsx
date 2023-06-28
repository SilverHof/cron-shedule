/* eslint-disable react/prop-types */
import "./SelectBox.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrowIcon from "../../../../assets/arrow.svg";
import closeIcon from "../../../../assets/close.svg";
import { SelectBoxDropDown } from "./SelectBoxDropDown";
import { currentDisplayData } from "../../../../helpers/currentDisplayData";

export const SelectBox = ({
   dropdownData,
   shortData,
   defaultText,
   storeKey,
   addDataToStore,
   deleteData,
   resetData,
   dropDownView,
   dropDownItemView,
   dropDownItemName,
}) => {
   const [open, setOpen] = useState(false);

   const dispatch = useDispatch();
   const currentArray = useSelector((state) => state.formReducer[storeKey]);
   const isError = useSelector((state) => state.formReducer.invalidSyntax);
   const currentString = currentDisplayData(
      currentArray,
      defaultText,
      shortData,
      storeKey
   );

   const active = currentString !== defaultText;

   const handleOpenDropdown = () => {
      setOpen(!open);
   };

   const handleDeleteButton = () => {
      dispatch(deleteData());
      dispatch(resetData());
   };

   return (
      <div className="select-box">
         <div
            className={
               isError ? `select-box__field_error` : `select-box__field`
            }
            onClick={handleOpenDropdown}
         >
            {currentString}
            <div className="select-box__button-box">
               {active ? (
                  <button
                     className={
                        isError
                           ? `select-box__delete-button_error`
                           : `select-box__delete-button`
                     }
                     onClick={handleDeleteButton}
                  >
                     <img
                        src={closeIcon}
                        alt=""
                        className="select-box__button-image"
                     />
                  </button>
               ) : (
                  <button className={
                     isError
                        ? `select-box__arrow-button_error`
                        : `select-box__arrow-button`
                  }>
                     <img
                        src={arrowIcon}
                        alt=""
                        className="select-box__button-image"
                     />
                  </button>
               )}
            </div>
         </div>
         {open && (
            <SelectBoxDropDown
               items={dropdownData}
               addDataToStore={addDataToStore}
               dropDownView={dropDownView}
               dropDownItemView={dropDownItemView}
               dropDownItemName={dropDownItemName}
            />
         )}
      </div>
   );
};
