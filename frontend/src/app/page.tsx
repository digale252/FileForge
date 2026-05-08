import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Image as ImageIcon, Zap, Lock, RefreshCw, Star, Play, FileJson, FileCode2, FileType } from 'lucide-react';
import { ConvertForm } from '@/components/ConvertForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-0 overflow-hidden bg-background">
        
        {/* Vibrant Background Glow */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-[10%] w-[50%] h-[600px] bg-blue-500/60 blur-[120px] rounded-full"></div>
          <div className="absolute top-[-50px] left-[20%] w-[60%] h-[600px] bg-emerald-400/50 blur-[120px] rounded-full"></div>
          <div className="absolute top-0 -right-[10%] w-[50%] h-[600px] bg-indigo-500/60 blur-[120px] rounded-full"></div>
          {/* Fade mask so it blends perfectly into the white background above it */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-transparent"></div>
          {/* Fade out bottom to blend smoothly with next section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          
          {/* Text and Icons Wrapper */}
          <div className="relative z-20 pt-10 lg:pt-16 pb-4 w-full max-w-7xl mx-auto">
            {/* Floating Icons - 4 Edge Icons */}
            {/* Top Left */}
            <div className="absolute -top-6 left-0 md:top-0 md:left-10 lg:left-0 bg-background/80 backdrop-blur-md p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="bg-blue-600 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center">
                <FileText className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
            </div>
            
            {/* Bottom Left */}
            <div className="absolute -bottom-10 left-0 md:bottom-12 md:left-10 lg:left-0 bg-background/80 backdrop-blur-md p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <div className="bg-green-500 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center">
                <ImageIcon className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
            </div>
            
            {/* Top Right */}
            <div className="absolute -top-6 right-0 md:top-0 md:right-10 lg:right-0 bg-background/80 backdrop-blur-md p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '0.8s' }}>
              <div className="bg-emerald-600 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center">
                <FileCode2 className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
            </div>
            
            {/* Bottom Right */}
            <div className="absolute -bottom-10 right-0 md:bottom-12 md:right-10 lg:right-0 bg-background/80 backdrop-blur-md p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '1.2s' }}>
              <div className="bg-orange-500 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center">
                <FileJson className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.2]">
            Where your <span className="text-primary">files</span> turn into <span className="text-primary">any format</span> with a click
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Convert PDF, Word, and images effortlessly. From upload to download in seconds, not minutes.
          </p>

          <div className="flex justify-center mb-8 relative z-20">
            <Link href="/convert">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-foreground text-background hover:bg-foreground/90 shadow-2xl flex items-center gap-3 transition-all hover:scale-105">
                <Play className="h-5 w-5 fill-background" />
                Start Converting <span className="text-sm opacity-60 ml-1 font-normal">Free</span>
              </Button>
            </Link>
          </div>

          </div>

          {/* Browser Window Mockup */}
          <div className="max-w-5xl mx-auto relative mt-4 pt-4 z-10 perspective-1000 px-4 md:px-0">
            <div className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl overflow-hidden relative transform transition-transform hover:-translate-y-2 duration-500">
              <div className="bg-muted/30 border-b border-border/50 p-4 flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400/80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-400/80"></div>
                <div className="ml-4 bg-background/50 rounded-md px-4 py-1 text-xs text-muted-foreground border border-border/50 font-mono hidden sm:block">
                  fileforge.app/convert
                </div>
              </div>
              <div className="p-6 md:p-10 min-h-[400px] flex items-center justify-center bg-background/20">
                <ConvertForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Conversions Section */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">Popular Conversions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The most frequently used file conversion tools, designed for speed and quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'PDF to Word', desc: 'Convert PDF documents to editable DOCX files perfectly.', icon: FileText, color: 'text-blue-500', iconBg: 'bg-blue-500/10', cardBg: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40' },
              { title: 'Word to PDF', desc: 'Make DOCX files universally readable as PDFs.', icon: FileText, color: 'text-indigo-500', iconBg: 'bg-indigo-500/10', cardBg: 'from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 hover:border-indigo-500/40' },
              { title: 'JPG to PNG', desc: 'Convert JPG images to PNG with transparency.', icon: ImageIcon, color: 'text-emerald-500', iconBg: 'bg-emerald-500/10', cardBg: 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40' },
              { title: 'PNG to JPG', desc: 'Compress PNG images to standard JPG format.', icon: ImageIcon, color: 'text-orange-500', iconBg: 'bg-orange-500/10', cardBg: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/40' },
            ].map((tool, idx) => (
              <Card key={idx} className={`group relative overflow-hidden bg-gradient-to-b ${tool.cardBg} border shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl cursor-pointer`}>
                <CardContent className="p-8 text-center relative z-10 flex flex-col items-center">
                  <div className={`bg-background shadow-md p-5 rounded-2xl mb-6 group-hover:-translate-y-2 transition-transform duration-500`}>
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tool.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden bg-muted/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Three simple steps to convert any file instantly and securely.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-12 relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 z-0"></div>

            {[
              { step: '1', title: 'Upload File', desc: 'Drag & drop your files into our secure zone.', icon: Upload },
              { step: '2', title: 'Choose Format', desc: 'Select from dozens of output formats.', icon: FileType },
              { step: '3', title: 'Download', desc: 'Get your converted file in seconds.', icon: RefreshCw }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 w-full group">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] transition-all duration-500 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                    {item.step}
                  </div>
                  <item.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle background glow for features */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">Why Choose FileForge?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Engineered for performance, security, and exceptional user experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Lightning Fast', desc: 'Our dedicated conversion servers process your files in milliseconds.', icon: Zap, bg: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40', iconColor: 'text-blue-500' },
              { title: 'Bank-Grade Security', desc: 'Files are encrypted during transit and permanently deleted after 1 hour.', icon: Lock, bg: 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40', iconColor: 'text-emerald-500' },
              { title: 'No Registration', desc: 'We value your time. Convert files instantly without creating an account.', icon: RefreshCw, bg: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 hover:border-purple-500/40', iconColor: 'text-purple-500' },
              { title: '100% Free', desc: 'Access all our premium conversion tools without paying a single cent.', icon: Star, bg: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/40', iconColor: 'text-orange-500' },
            ].map((feature, idx) => (
              <div key={idx} className={`flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b ${feature.bg} border shadow-sm hover:shadow-xl transition-all duration-500 group`}>
                <div className="bg-background shadow-md p-5 rounded-2xl mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
