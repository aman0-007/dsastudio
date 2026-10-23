export type CategoryId = 'sorting' | 'searching' | 'datastructures' | 'backtracking';
export type SupportedLanguage = 'java' | 'python';

export interface AlgorithmMetadata {
  id: string;
  name: string;
  category: CategoryId;
  complexity: string;
  bestTime: string;
  worstTime: string;
  spaceComplexity: string;
  description: string;
  algorithmSteps: string[];
  javaCode: string;
  pythonCode: string;
  pseudocode: string[];
}
