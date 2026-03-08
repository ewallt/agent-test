import { data as aiMmlu } from '../data/ai-mmlu';

// Add one line here when creating a new project.
export const registry: Record<string, typeof aiMmlu> = {
  'ai-mmlu': aiMmlu,
};
