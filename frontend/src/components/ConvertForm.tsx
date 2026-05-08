"use client";

import { useState, useRef } from 'react';
import { Upload, File as FileIcon, X, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

const ALLOWED_FORMATS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/svg+xml': 'svg'
};

const TARGET_FORMATS = ['pdf', 'docx', 'png', 'jpg', 'svg'];

export function ConvertForm() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [convertedFilename, setConvertedFilename] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error('File size exceeds 50MB limit.');
      return;
    }
    
    // Check if it's an allowed format based on type or extension
    setFile(selectedFile);
    setDownloadUrl(null);
    setConvertedFilename(null);
    setProgress(0);
    toast.success('File ready for conversion.');
  };

  const resetForm = () => {
    setFile(null);
    setTargetFormat('');
    setDownloadUrl(null);
    setConvertedFilename(null);
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!file || !targetFormat) {
      toast.error('Please select a file and target format.');
      return;
    }

    setIsUploading(true);
    setProgress(10);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload
      const uploadRes = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadRes.ok) throw new Error('Upload failed');
      const uploadData = await uploadRes.json();
      setProgress(50);
      setIsUploading(false);
      setIsConverting(true);

      // 2. Convert
      const convertRes = await fetch('http://localhost:5000/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: uploadData.filename,
          targetFormat: targetFormat
        })
      });

      if (!convertRes.ok) {
        const errorData = await convertRes.json();
        throw new Error(errorData.error || 'Conversion failed');
      }
      
      const convertData = await convertRes.json();
      
      setProgress(100);
      setDownloadUrl(convertData.downloadUrl);
      setConvertedFilename(convertData.convertedFilename);
      toast.success('File converted successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred during conversion.');
    } finally {
      setIsUploading(false);
      setIsConverting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {!file ? (
        <div 
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Animated glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-emerald-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          
          <Card className="relative border-2 border-dashed border-primary/30 bg-background/60 backdrop-blur-xl rounded-[2rem] shadow-2xl hover:border-primary/60 hover:bg-background/80 transition-all duration-500 overflow-hidden">
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            
            <CardContent className="flex flex-col items-center justify-center p-8 md:p-16 text-center min-h-[300px] md:min-h-[400px] relative z-10">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.docx,.png,.jpg,.jpeg,.svg"
              />
              <div className="relative mb-6 md:mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-5 md:p-6 rounded-full border border-primary/20 relative z-10 shadow-inner">
                  <Upload className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Drag & Drop your file here</h3>
              <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md leading-relaxed">
                Supported formats: PDF, DOCX, PNG, JPG, SVG. Maximum file size is 50MB.
              </p>
              <Button className="rounded-full px-8 md:px-10 h-12 md:h-14 text-base md:text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 border-0">
                Browse Files
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="shadow-2xl rounded-[2rem] border-primary/20 bg-background/80 backdrop-blur-xl overflow-hidden relative">
          {/* Subtle background texture/gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
          
          <CardContent className="p-8 md:p-10 relative z-10">
            <div className="flex items-center justify-between mb-8 p-5 bg-background border border-border/50 rounded-2xl shadow-sm">
              <div className="flex items-center gap-5 truncate">
                <div className="bg-primary/10 p-4 rounded-xl shadow-inner">
                  <FileIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="truncate">
                  <p className="font-bold text-lg truncate text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              {!isUploading && !isConverting && !downloadUrl && (
                <Button variant="ghost" size="icon" onClick={resetForm} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-10 w-10 transition-colors">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {!downloadUrl ? (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-center bg-muted/20 p-6 rounded-2xl border border-border/40">
                  <div className="w-full">
                    <label className="text-sm font-semibold mb-3 block text-foreground/80">Select Output Format:</label>
                    <Select value={targetFormat} onValueChange={setTargetFormat} disabled={isUploading || isConverting}>
                      <SelectTrigger className="w-full h-14 rounded-xl text-lg font-medium bg-background border-primary/20 focus:ring-primary/30">
                        <SelectValue placeholder="Choose format..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {TARGET_FORMATS.map(fmt => (
                          <SelectItem key={fmt} value={fmt} className="text-base font-medium py-3 cursor-pointer">{fmt.toUpperCase()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="hidden md:flex pt-8">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <ArrowRight className="text-primary h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="w-full flex items-end pt-2 md:pt-0">
                    <Button 
                      className={`w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 border-0 ${targetFormat ? 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 hover:scale-[1.02] hover:shadow-primary/30' : 'bg-muted text-muted-foreground'}`}
                      onClick={handleConvert}
                      disabled={isUploading || isConverting || !targetFormat}
                    >
                      {isUploading ? 'Uploading...' : isConverting ? 'Converting...' : 'Start Conversion'}
                    </Button>
                  </div>
                </div>

                {(isUploading || isConverting) && (
                  <div className="space-y-3 bg-background p-6 rounded-2xl border border-border/50 shadow-sm">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-primary flex items-center gap-2">
                        {isUploading ? 'Uploading securely to server...' : 'Processing your file...'}
                      </span>
                      <span className="font-mono font-bold text-primary">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3 rounded-full bg-primary/10 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-blue-500" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-8 bg-muted/10 rounded-3xl border border-border/30">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
                  <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-5 rounded-full text-white relative z-10 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold mb-3 text-foreground">Conversion Complete!</h3>
                  <p className="text-lg text-muted-foreground font-medium bg-background px-4 py-2 rounded-lg border inline-block shadow-sm">{convertedFilename}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
                  <Button variant="outline" size="lg" className="rounded-xl h-14 flex-1 text-lg font-semibold border-primary/20 hover:bg-primary/5" onClick={resetForm}>
                    Convert Another
                  </Button>
                  <a href={downloadUrl} download className="flex-1">
                    <Button size="lg" className="w-full rounded-xl h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 border-0 hover:scale-[1.02] transition-transform">
                      Download File
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
