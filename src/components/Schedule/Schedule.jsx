import { useDispatch } from "react-redux";
import {
   months,
   daysOfMonth,
   daysOfWeek,
   hours,
   minutes,
   monthsShort,
   daysOfWeekShort,
} from "../../constants/constants";
import {
   addDaysOfMonth,
   addDaysOfWeek,
   addHours,
   addMinutes,
   addMonths,
   deleteDaysOfMonth,
   deleteDaysOfWeek,
   deleteHours,
   deleteMinutes,
   deleteMonths,
   resetAllData,
   resetDaysOfMonthButtons,
   resetDaysOfWeekButtons,
   resetHoursButtons,
   resetMinutesButtons,
   resetMonthsButtons,
   saveComponentsState,
} from "../../store/slices/form.slice";
import "./Schedule.scss";
import { SelectBox } from "./components/SelectBox/SelectBox";

export const Schedule = () => {
   const dispatch = useDispatch();
   const handleSaveButtonClick = () => {
      dispatch(saveComponentsState());
   };

   const handleResetButtonClick = () => {
      dispatch(resetAllData());
   };

   return (
      <section className="schedule">
         In
         <SelectBox
            dropdownData={months}
            shortData={monthsShort}
            storeKey={"months"}
            defaultText={"every month"}
            addDataToStore={addMonths}
            deleteData={deleteMonths}
            resetData={resetMonthsButtons}
            dropDownView={"flex"}
            dropDownItemView={"row"}
            dropDownItemName={"month-item_"}
         />
         on
         <SelectBox
            dropdownData={daysOfMonth}
            shortData={daysOfMonth}
            storeKey={"daysOfMonth"}
            defaultText={"every day of the month"}
            addDataToStore={addDaysOfMonth}
            deleteData={deleteDaysOfMonth}
            resetData={resetDaysOfMonthButtons}
            dropDownView={"grid"}
            dropDownItemView={"square"}
            dropDownItemName={"days-of-month-item_"}
         />
         and
         <SelectBox
            dropdownData={daysOfWeek}
            shortData={daysOfWeekShort}
            storeKey={"daysOfWeek"}
            defaultText={"every day of the week"}
            addDataToStore={addDaysOfWeek}
            deleteData={deleteDaysOfWeek}
            resetData={resetDaysOfWeekButtons}
            dropDownView={"flex"}
            dropDownItemView={"row"}
            dropDownItemName={"days-of-week-item_"}
         />
         at
         <SelectBox
            dropdownData={hours}
            shortData={hours}
            storeKey={"hours"}
            defaultText={"every hour"}
            addDataToStore={addHours}
            deleteData={deleteHours}
            resetData={resetHoursButtons}
            dropDownView={"grid"}
            dropDownItemView={"square"}
            dropDownItemName={"hours-item_"}
         />
         :
         <SelectBox
            dropdownData={minutes}
            shortData={minutes}
            storeKey={"minutes"}
            defaultText={"every minute"}
            addDataToStore={addMinutes}
            deleteData={deleteMinutes}
            resetData={resetMinutesButtons}
            dropDownView={"grid"}
            dropDownItemView={"square"}
            dropDownItemName={"minutes-item_"}
         />
         <button
            className="schedule__save-button"
            onClick={handleSaveButtonClick}
         >
            Save
         </button>
         <button
            className="schedule__reset-button"
            onClick={handleResetButtonClick}
         >
            Reset
         </button>
      </section>
   );
};
