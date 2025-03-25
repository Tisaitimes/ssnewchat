
export interface Lead {
  id?: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: string;
  source: string;
  created: string;
  lastContact: string;
  notes?: string;
  avatarUrl?: string;
}
