export function getPage(pageParam: unknown): number {
  if (typeof pageParam !== "string") return 1;

  const digitMatch = pageParam.match(/\d+/);

  if (!digitMatch) return 1;
  const page = parseInt(digitMatch[0], 10);
  return page <= 0 ? 1 : page;
}
