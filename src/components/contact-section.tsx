"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SOCIAL_LINKS } from "@/lib/data";
import { sendContactEmail, type ContactFormData } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// NAMED EXPORT: This must match the curly braces in your page.tsx import
export function ContactSection() {
  const [year, setYear] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const { toast } = useToast();

  // Handle Hydration for the dynamic year
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all sections before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-card border-t">
      <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Let's Connect</h2>
          <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed">
            Have a project in mind, or just want to say hi? Feel free to reach out.
          </p>
        </div>
        
        <div className="mx-auto w-full max-w-sm space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <Input 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Textarea 
              name="message"
              placeholder="Message" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
            {SOCIAL_LINKS.map((link) => (
                <Button key={link.name} variant="outline" size="icon" asChild>
                    <Link href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="h-5 w-5" />
                        <span className="sr-only">{link.name}</span>
                    </Link>
                </Button>
            ))}
        </div>
        
        {year && <p className="text-xs text-muted-foreground mt-4">© {year} Kanak. All Rights Reserved.</p>}
      </div>
    </footer>
  );
}