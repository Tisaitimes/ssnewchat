
import React, { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  setAvatarFile: (file: File | null) => void;
}

const AvatarUpload = ({ avatarUrl, setAvatarUrl, setAvatarFile }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
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
  );
};

export default AvatarUpload;
