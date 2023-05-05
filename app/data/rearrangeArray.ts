export const rearrangeArray = <T>(
  arr: T[],
  fromIndex: number,
  newIndex: number
): T[] => {
  const tempArr = [...arr];
  const item = tempArr.splice(fromIndex, 1)[0];

  if (!item) return arr;

  tempArr.splice(newIndex, 0, item);
  return tempArr;
};
