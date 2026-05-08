import { ConvertForm } from "@/components/ConvertForm";
import { Sparkles } from "lucide-react";

export default function ConvertPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-16">
      {/* Vibrant Background Glow */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[600px] bg-blue-500/40 blur-[120px] rounded-full"></div>
        <div className="absolute top-[5%] left-[20%] w-[60%] h-[600px] bg-emerald-400/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[600px] bg-indigo-500/40 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Universal File Converter</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
            Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Files</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Securely convert your files between formats in seconds. Bank-grade encryption ensures your data remains private and is automatically deleted after conversion.
          </p>
        </div>
        
        <div className="relative">
          {/* Subtle glow behind the form itself */}
          <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-[3rem] pointer-events-none transform scale-110"></div>
          <div className="relative z-10">
            <ConvertForm />
          </div>
        </div>
      </div>
    </div>
  );
}
