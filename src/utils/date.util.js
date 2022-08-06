export const formatFullDate = (date = new Date()) =>
  `${date.toLocaleTimeString("en-us")} ${date.toLocaleDateString("en-us")}`;
