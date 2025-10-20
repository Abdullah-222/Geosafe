"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, File } from "lucide-react";
import { toast } from "sonner";

interface SafeZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  description?: string;
}

interface FileUploadDialogProps {
  onFileUploaded: () => void;
}

export default function FileUploadDialog({ onFileUploaded }: FileUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string>("");
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSafeZones();
  }, []);

  const fetchSafeZones = async () => {
    try {
      const response = await fetch("/api/safe-zones");
      if (response.ok) {
        const zones = await response.json();
        setSafeZones(zones);
      }
    } catch (error) {
      console.error("Error fetching safe zones:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    if (!selectedZoneId) {
      toast.error("Please select a safe zone");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("safeZoneId", selectedZoneId);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("File uploaded successfully!");
        setOpen(false);
        setSelectedFile(null);
        setSelectedZoneId("");
        onFileUploaded();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to upload file");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload a file and assign it to a safe zone. The file will be encrypted and only accessible within the selected zone.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor="file">Select File *</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                className="flex-1"
                required
              />
            </div>
            {selectedFile && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <File className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Safe Zone Selection */}
          <div className="space-y-2">
            <Label htmlFor="safeZone">Safe Zone *</Label>
            <Select value={selectedZoneId} onValueChange={setSelectedZoneId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a safe zone" />
              </SelectTrigger>
              <SelectContent>
                {safeZones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name} (Radius: {zone.radius}m)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedZoneId && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Selected Zone:</strong> {safeZones.find(z => z.id === selectedZoneId)?.name}
                </p>
                <p className="text-xs text-green-600">
                  This file will only be accessible within this safe zone
                </p>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              type="submit"
              className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
              disabled={!selectedFile || !selectedZoneId || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
