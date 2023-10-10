export function shuffleArray<T = unknown>(arr: T[]): T[] {
  const tempArr = [...arr];
  tempArr.sort(() => Math.random() - 0.5);
  return tempArr;
}
