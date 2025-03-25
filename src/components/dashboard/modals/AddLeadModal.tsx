
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Upload, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Lead {
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

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (leadData: Lead) => void;
  initialData?: Lead;
  isEditing?: boolean;
}

const AddLeadModal = ({ isOpen, onClose, onAddLead, initialData, isEditing = false }: AddLeadModalProps) => {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file size is under 1MB (1048576 bytes)
      if (file.size > 1048576) {
        toast.error("Avatar image must be less than 1 MB");
        return;
      }

      // Create a URL for preview
      const fileUrl = URL.createObjectURL(file);
      setAvatarUrl(fileUrl);
      setAvatarFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Creating avatar URL based on name if no avatar uploaded
    const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random`;
    
    const leadData = {
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
    
    onAddLead(leadData);
    toast.success(isEditing ? "Lead updated successfully" : "Lead added successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Lead" : "Add New Lead"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the lead's information below." : "Enter the lead's information below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar 
                className="h-24 w-24 cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary rounded-full"
                onClick={handleAvatarClick}
              >
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="Lead avatar" />
                ) : (
                  <AvatarFallback className="text-xl">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </AvatarFallback>
                )}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="mt-2 text-xs text-center text-muted-foreground">
                Click to upload (Max: 1MB)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter lead name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter lead email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter lead phone number"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter lead address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Connected">Connected</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Created Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !createdDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {createdDate ? format(createdDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={createdDate}
                  onSelect={setCreatedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Contact Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !lastContactDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {lastContactDate ? format(lastContactDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={lastContactDate}
                  onSelect={setLastContactDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add additional information about this lead"
              rows={4}
            />
          </div>
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
