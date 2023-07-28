export const randomBitString = (length: number): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.round(Math.random()).toString();
  }
  return result;
};
