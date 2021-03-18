/*
Utility function for formating a number of seconds into string 00:00
*/
export const padZero = (n: number): string => {
  if (n >= 10) {
    return n.toString();
  }
  return `0${n}`;
};
