export interface InboxItem {
  id: string;
  agent: string;
  title: string;
  summary: string;
  amount?: string;
  context?: string[];
  rationale?: string;
  priority: 'high' | 'medium' | 'low';
  receivedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export type Decision = 'approved' | 'rejected';
