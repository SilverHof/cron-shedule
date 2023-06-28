/* eslint-disable react/prop-types */
import { activateButton, deactivateButton } from "../../../../store/slices/form.slice";
import "./SelectBoxDropDownItem.scss";
import { useDispatch, useSelector } from "react-redux";

export const SelectBoxDropDownItem = ({
   name,
   index,
   id,
   dropDownItemView,
   addDataToStore,
}) => {
   const activeButtons = useSelector((state) => state.formReducer.activeButtons);
   const dispatch = useDispatch();

   const cn =
      dropDownItemView === "square"
         ? "select-box-dropdown-item__square"
         : dropDownItemView === "row"
         ? "select-box-dropdown-item__row"
         : "";
         
   const handleItemClick = () => {
      dispatch(addDataToStore(index));
      if (activeButtons.includes(id)) {
         dispatch(deactivateButton(id));
      } else {
         dispatch(activateButton(id));
      }
   };

   return (
      <div
         className={activeButtons.includes(id) ? `${cn}_active` : `${cn}`}
         onClick={handleItemClick}
      >
         {name}
      </div>
   );
};
