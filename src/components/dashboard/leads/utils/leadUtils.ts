
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'connected': return 'bg-yellow-100 text-yellow-800';
    case 'qualified': return 'bg-purple-100 text-purple-800';
    case 'proposal': return 'bg-orange-100 text-orange-800';
    case 'converted': return 'bg-green-100 text-green-800';
    case 'lost': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const generateCsv = (leads: any[]): string => {
  return [
    'Name,Email,Phone,Status,Created,Last Contact',
    ...leads.map(lead => 
      `${lead.name},${lead.email},${lead.phone},${lead.status},${lead.created},${lead.lastContact}`
    )
  ].join('\n');
};
