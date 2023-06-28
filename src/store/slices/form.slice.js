import { isValidCron } from "cron-validator";
import { createSlice } from "@reduxjs/toolkit";
import { changeState } from "../helpers/changeState";
import { toShortString } from "../../helpers/toShortString";
import {
   daysOfMonth,
   daysOfWeekShort,
   hours,
   minutes,
   monthsShort,
} from "../../constants/constants";
import { changeStateOfComponents } from "../../helpers/changeStateOfComponents";

const initialState = {
   cronStringSave: "* * * * *",
   cronStringLoad: "",
   cronString: "* * * * *",
   daysOfWeek: ["*"],
   months: ["*"],
   daysOfMonth: ["*"],
   hours: ["*"],
   minutes: ["*"],
   invalidSyntax: false,
   activeButtons: [],
};

export const formSlice = createSlice({
   name: "form",
   initialState,
   reducers: {
      saveComponentsState: (state) => {
         state.cronStringSave =
            toShortString(state.minutes, minutes) +
            " " +
            toShortString(state.hours, hours) +
            " " +
            toShortString(state.daysOfMonth, daysOfMonth) +
            " " +
            toShortString(state.months, monthsShort) +
            " " +
            toShortString(state.daysOfWeek, daysOfWeekShort);
      },
      resetAllData: (state) => {
         state.cronString = "* * * * *";
         state.cronStringSave = "* * * * *";
         state.cronStringLoad = "* * * * *";

         state.minutes = ["*"];
         state.hours = ["*"];
         state.daysOfMonth = ["*"];
         state.months = ["*"];
         state.daysOfWeek = ["*"];

         state.activeButtons = [];
         state.invalidSyntax = false;
      },
      checkValidCronString: (state, action) => {
         if (
            (isValidCron(action.payload) ||
               isValidCron(action.payload, { alias: true })) &&
            !action.payload.includes("W", "L", "C", "?", "/", "#")
         ) {
            state.invalidSyntax = false;
         } else {
            state.invalidSyntax = true;
         }
      },
      loadStateFromInput: (state, action) => {
         state.cronStringLoad = action.payload;
         const cronStringToArray = state.cronStringLoad.split(" ");

         // ** Change minutes component
         if (cronStringToArray[0] !== "*") {
            state.minutes = [];
            const [newMinutesState, newMinutesActiveButtons] =
               changeStateOfComponents(cronStringToArray[0], "numbers", "minutes-item_", false);
            state.minutes = newMinutesState;
            for (let index = 0; index < newMinutesActiveButtons.length; index++) {
               if (
                  !state.activeButtons.includes(newMinutesActiveButtons[index])
               ) {
                  state.activeButtons.push(newMinutesActiveButtons[index]);
               }
            }
         }

         // ** Change hours component
         if (cronStringToArray[1] !== "*") {
            state.hours = [];
            const [newHoursState, newHoursActiveButtons] =
               changeStateOfComponents(cronStringToArray[1], "numbers", "hours-item_", false);
            state.hours = newHoursState;
            for (let index = 0; index < newHoursActiveButtons.length; index++) {
               if (
                  !state.activeButtons.includes(newHoursActiveButtons[index])
               ) {
                  state.activeButtons.push(newHoursActiveButtons[index]);
               }
            }
         }

         // ** Change days of month component
         if (cronStringToArray[2] !== "*") {
            state.daysOfMonth = [];
            const [newDaysOfMonthState, newDaysOfMonthActiveButtons] =
               changeStateOfComponents(cronStringToArray[2], "numbers", "days-of-month-item_", true);
            state.daysOfMonth = newDaysOfMonthState;

            for (let index = 0; index < newDaysOfMonthActiveButtons.length; index++) {
               if (
                  !state.activeButtons.includes(
                     newDaysOfMonthActiveButtons[index]
                  )
               ) {
                  state.activeButtons.push(newDaysOfMonthActiveButtons[index]);
               }
            }
         }

         // ** Change months
         if (cronStringToArray[3] !== "*") {
            state.months = [];
            const [newMonthsState, newMonthsActiveButtons] =
               changeStateOfComponents(cronStringToArray[3], "months", "month-item_", false);
            state.months = newMonthsState;

            for (let index = 0; index < newMonthsActiveButtons.length; index++) {
               if (
                  !state.activeButtons.includes(newMonthsActiveButtons[index])
               ) {
                  state.activeButtons.push(newMonthsActiveButtons[index]);
               }
            }
         }

         // ** Change days of week
         if (cronStringToArray[4] !== "*") {
            state.daysOfWeek = [];
            const [newDaysOfWeekState, newDaysOfWeekActiveButtons] =
               changeStateOfComponents(cronStringToArray[4], "daysOfWeek", "days-of-week-item_", false);
            state.daysOfWeek = newDaysOfWeekState;

            for (let index = 0; index < newDaysOfWeekActiveButtons.length; index++) {
               if (
                  !state.activeButtons.includes(
                     newDaysOfWeekActiveButtons[index]
                  )
               ) {
                  state.activeButtons.push(newDaysOfWeekActiveButtons[index]);
               }
            }
         }
      },
      setInvalidSyntaxFalse: (state) => {
         state.invalidSyntax = false;
      },
      setInputText: (state, action) => {
         const stringToArray = action.payload.split(" ");
         state.cronString = action.payload;

         if (
            isValidCron(state.cronString) ||
            isValidCron(state.cronString, { alias: true })
         ) {
            console.log("valid");
            state.daysOfWeek.shift();
            state.months.shift();
            state.daysOfMonth.shift();
            state.hours.shift();
            state.minutes.shift();

            state.daysOfWeek.push(stringToArray[4]);
            state.months.push(stringToArray[3]);
            state.daysOfMonth.push(stringToArray[2]);
            state.hours.push(stringToArray[1]);
            state.minutes.push(stringToArray[0]);

            state.invalidSyntax = false;
         } else {
            console.log("invalid");
            state.invalidSyntax = true;
         }
      },
      addDaysOfWeek: (state, action) => {
         const oldState = state.daysOfWeek;
         const newState = changeState(oldState, action);
         state.daysOfWeek = newState;
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[4] = toShortString(newState, daysOfWeekShort);
         state.cronString = cronStringToArray.join(" ");
      },

      deleteDaysOfWeek: (state) => {
         state.daysOfWeek = ["*"];
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[4] = "*";
         state.cronString = cronStringToArray.join(" ");
      },

      addMonths: (state, action) => {
         const oldState = state.months;
         const newState = changeState(oldState, action);
         state.months = newState;
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[3] = toShortString(newState, monthsShort);
         state.cronString = cronStringToArray.join(" ");
      },

      deleteMonths: (state) => {
         state.months = ["*"];
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[3] = "*";
         state.cronString = cronStringToArray.join(" ");
      },

      addDaysOfMonth: (state, action) => {
         const oldState = state.daysOfMonth;
         const newState = changeState(oldState, action);
         state.daysOfMonth = newState;
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[2] = toShortString(newState, daysOfMonth);
         state.cronString = cronStringToArray.join(" ");
      },

      deleteDaysOfMonth: (state) => {
         state.daysOfMonth = ["*"];
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[2] = "*";
         state.cronString = cronStringToArray.join(" ");
      },

      addHours: (state, action) => {
         const oldState = state.hours;
         const newState = changeState(oldState, action);
         state.hours = newState;
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[1] = toShortString(newState, hours);
         state.cronString = cronStringToArray.join(" ");
      },

      deleteHours: (state) => {
         state.hours = ["*"];
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[1] = "*";
         state.cronString = cronStringToArray.join(" ");
      },

      addMinutes: (state, action) => {
         const oldState = state.minutes;
         const newState = changeState(oldState, action);
         state.minutes = newState;
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[0] = toShortString(newState, minutes);
         state.cronString = cronStringToArray.join(" ");
      },

      deleteMinutes: (state) => {
         state.minutes = ["*"];
         const cronStringToArray = state.cronString.split(" ");
         cronStringToArray[0] = "*";
         state.cronString = cronStringToArray.join(" ");
      },

      activateButton: (state, action) => {
         state.activeButtons.push(action.payload);
      },

      deactivateButton: (state, action) => {
         state.activeButtons = state.activeButtons.filter(
            (button) => button !== action.payload
         );
      },

      resetButtons: (state) => {
         state.activeButtons = [];
      },

      resetMonthsButtons: (state) => {
         state.activeButtons = state.activeButtons.filter(
            (item) => !item.startsWith("month-item_")
         );
      },

      resetDaysOfMonthButtons: (state) => {
         state.activeButtons = state.activeButtons.filter(
            (item) => !item.startsWith("days-of-month-item_")
         );
      },

      resetDaysOfWeekButtons: (state) => {
         state.activeButtons = state.activeButtons.filter(
            (item) => !item.startsWith("days-of-week-item_")
         );
      },

      resetHoursButtons: (state) => {
         state.activeButtons = state.activeButtons.filter(
            (item) => !item.startsWith("hours-item_")
         );
      },

      resetMinutesButtons: (state) => {
         state.activeButtons = state.activeButtons.filter(
            (item) => !item.startsWith("minutes-item_")
         );
      },
   },
});

export default formSlice.reducer;
export const {
   saveComponentsState,
   checkValidCronString,
   loadStateFromInput,
   setInvalidSyntaxFalse,
   setInputText,
   resetAllData,
   addMonths,
   deleteMonths,
   addDaysOfMonth,
   deleteDaysOfMonth,
   addDaysOfWeek,
   deleteDaysOfWeek,
   addHours,
   deleteHours,
   addMinutes,
   deleteMinutes,
   activateButton,
   deactivateButton,
   resetButtons,
   resetMonthsButtons,
   resetDaysOfMonthButtons,
   resetDaysOfWeekButtons,
   resetHoursButtons,
   resetMinutesButtons,
} = formSlice.actions;
