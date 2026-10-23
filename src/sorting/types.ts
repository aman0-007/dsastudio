export interface SortingStep {
  arr: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number | null;
  msg: string;
  codeLine?: number;
}
