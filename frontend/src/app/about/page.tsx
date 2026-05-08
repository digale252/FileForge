import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About FileForge</h1>
          <p className="text-xl text-muted-foreground">
            The modern, blazing fast file conversion platform built for the future.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At FileForge, we believe that managing and converting files should be an effortless experience. Our mission is to provide a seamless, secure, and fast platform where anyone can forge their files into the formats they need without dealing with complex software, subscriptions, or privacy concerns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Technology Stack</h2>
            <p className="text-lg text-muted-foreground mb-6">
              FileForge is built using modern, industry-standard technologies to ensure high performance and reliability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-primary">Frontend</h3>
                  <ul className="space-y-3">
                    {['Next.js (App Router)', 'React Hooks', 'Tailwind CSS v4', 'shadcn/ui Components'].map((tech, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-primary">Backend</h3>
                  <ul className="space-y-3">
                    {['Node.js & Express.js', 'Multer for File Uploads', 'CloudConvert API', 'RESTful Architecture'].map((tech, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Privacy & Security</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your privacy is our priority. We do not store your files permanently. All uploaded files are temporarily stored on our secure servers only for the duration of the conversion process. Once the conversion is complete and the file is downloaded, or after a short expiration period, the files are automatically and permanently deleted from our system.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
