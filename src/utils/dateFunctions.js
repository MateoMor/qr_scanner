import { format } from "date-fns";
import { enUS } from "date-fns/locale";

// This script returns today's date in format "Jan 25, 2024"
export const getTodaysDate = () => {
  const today = new Date();
  const formattedDate = format(today, "MMM dd, yyyy", {
    locale: enUS /* English months */,
  });
  return formattedDate;
};

export const getCurrentHour = () => {
    const today = new Date();
    const formattedHour = format(today, 'HH:mm');
    return formattedHour;
}