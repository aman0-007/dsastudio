export interface SearchingStep {
  arr: number[];
  inspecting: number;
  found: number;
  low?: number;
  mid?: number;
  high?: number;
  msg: string;
  codeLine?: number;
}
