export type List = {
  id: number;
  name: string;
};

export const listCards = [...new Array(8)].map((_, i) => ({
  id: i,
  name: `Card ${i + 1}`,
}));
