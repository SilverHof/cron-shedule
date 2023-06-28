/* eslint-disable react/prop-types */
import "./SelectBoxDropDown.scss";
import { SelectBoxDropDownItem } from "./SelectBoxDropDownItem";

export const SelectBoxDropDown = ({
   items,
   addDataToStore,
   dropDownView,
   dropDownItemView,
   dropDownItemName,
}) => {

   const cn =
      dropDownView === "grid"
         ? "select-box-dropdown__grid"
         : dropDownView === "flex"
         ? "select-box-dropdown__flex"
         : "";

   return (
      <div
         className={cn}
      >
         {items.map((name, index) => (
            <SelectBoxDropDownItem
               name={name}
               key={index}
               index={index}
               id={`${dropDownItemName}${index}`}
               addDataToStore={addDataToStore}
               dropDownItemView={dropDownItemView}
            />
         ))}
      </div>
   );
};
