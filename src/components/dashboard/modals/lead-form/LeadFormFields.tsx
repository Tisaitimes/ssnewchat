
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CountryCodeSelect from './CountryCodeSelect';

interface LeadFormFieldsProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  source: string;
  setSource: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  createdDate: Date | undefined;
  setCreatedDate: (date: Date | undefined) => void;
  lastContactDate: Date | undefined;
  setLastContactDate: (date: Date | undefined) => void;
  referralName?: string;
  setReferralName?: (name: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
}

const LeadFormFields = ({
  name, setName, 
  email, setEmail, 
  phone, setPhone, 
  source, setSource, 
  status, setStatus, 
  notes, setNotes, 
  address, setAddress,
  createdDate, setCreatedDate,
  lastContactDate, setLastContactDate,
  referralName = '', 
  setReferralName = () => {},
  countryCode,
  setCountryCode
}: LeadFormFieldsProps) => {
  // Local state to track if referral source is selected
  const [isReferralSelected, setIsReferralSelected] = useState(source === 'Referral');

  // Update referral selection state when source changes
  useEffect(() => {
    setIsReferralSelected(source === 'Referral');
  }, [source]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="text-sm font-medium">Phone Number</label>
          <div className="flex items-center gap-2">
            <div className="w-1/4">
              <CountryCodeSelect 
                value={countryCode} 
                onChange={setCountryCode} 
              />
            </div>
            <div className="flex-1">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Source</label>
          <Select value={source} onValueChange={(value) => {
            setSource(value);
            // Clear referral name if not referral
            if (value !== 'Referral' && setReferralName) {
              setReferralName('');
            }
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="WhatsApp Campaign">WhatsApp Campaign</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Conditional referral name field */}
          {isReferralSelected && (
            <div className="mt-2">
              <Input
                value={referralName}
                onChange={(e) => setReferralName(e.target.value)}
                placeholder="Enter referrer's name"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter lead address"
          />
        </div>
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
    </>
  );
};

export default LeadFormFields;
