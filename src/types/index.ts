export type Project = {
  slug: string;
  index: string;
  name: string;
  kind: string;
  summary: string;
  role: string;
  stack: string[];
  context: string;
  challenge: string;
  approach: string;
  architecture: string[];
  implementation: string[];
  impact: string[];
  year?: string;
};