
import { format } from "date-fns";
import { Lead } from "@/types/lead";

export const prepareLeadData = (
  name: string,
  email: string,
  phone: string,
  source: string,
  status: string,
  notes: string,
  address: string,
  createdDate: Date | undefined,
  lastContactDate: Date | undefined,
  avatarUrl: string
): Lead => {
  // Creating avatar URL based on name if no avatar uploaded
  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random`;
  
  return {
    name,
    email,
    phone,
    source,
    status,
    notes,
    address,
    created: createdDate ? format(createdDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    lastContact: lastContactDate ? format(lastContactDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    avatarUrl: avatarUrl || fallbackAvatarUrl,
    initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
  };
};
