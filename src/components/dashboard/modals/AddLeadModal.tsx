
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lead } from '@/types/lead';
import AvatarUpload from './lead-form/AvatarUpload';
import LeadFormFields from './lead-form/LeadFormFields';
import { prepareLeadData } from './lead-form/LeadFormUtils';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (leadData: Lead) => void;
  initialData?: Lead;
  isEditing?: boolean;
}

const AddLeadModal = ({ isOpen, onClose, onAddLead, initialData, isEditing = false }: AddLeadModalProps) => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('website');
  const [status, setStatus] = useState('New');
  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState('');
  const [createdDate, setCreatedDate] = useState<Date | undefined>(new Date());
  const [lastContactDate, setLastContactDate] = useState<Date | undefined>(new Date());
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialData && isEditing) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
      setSource(initialData.source || 'website');
      setStatus(initialData.status || 'New');
      setNotes(initialData.notes || '');
      setAddress(initialData.address || '');
      setAvatarUrl(initialData.avatarUrl || '');
      
      // Convert string date to Date object if available
      if (initialData.created) {
        try {
          const created = new Date(initialData.created);
          setCreatedDate(created);
        } catch (error) {
          console.error("Invalid date format:", initialData.created);
          setCreatedDate(new Date());
        }
      }
      
      // Convert last contact date
      if (initialData.lastContact) {
        try {
          const lastContact = new Date(initialData.lastContact);
          setLastContactDate(lastContact);
        } catch (error) {
          console.error("Invalid date format:", initialData.lastContact);
          setLastContactDate(new Date());
        }
      }
    } else {
      // Reset form when not editing
      setName('');
      setEmail('');
      setPhone('');
      setSource('website');
      setStatus('New');
      setNotes('');
      setAddress('');
      setCreatedDate(new Date());
      setLastContactDate(new Date());
      setAvatarUrl('');
      setAvatarFile(null);
    }
  }, [initialData, isEditing, isOpen]);

  // Update last contact date whenever created date changes (for new leads only)
  useEffect(() => {
    if (!isEditing && createdDate) {
      setLastContactDate(createdDate);
    }
  }, [createdDate, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData = prepareLeadData(
      name,
      email,
      phone,
      source,
      status,
      notes,
      address,
      createdDate,
      lastContactDate,
      avatarUrl
    );
    
    onAddLead(leadData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Lead" : "Add New Lead"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the lead's information below." : "Enter the lead's information below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AvatarUpload
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            setAvatarFile={setAvatarFile}
          />
          
          <LeadFormFields
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            source={source}
            setSource={setSource}
            status={status}
            setStatus={setStatus}
            notes={notes}
            setNotes={setNotes}
            address={address}
            setAddress={setAddress}
            createdDate={createdDate}
            setCreatedDate={setCreatedDate}
            lastContactDate={lastContactDate}
            setLastContactDate={setLastContactDate}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{isEditing ? "Update Lead" : "Add Lead"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadModal;
