"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { askChatbot } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const result = await askChatbot({
        message: currentInput,
      });

      // Type Guard: Check if the returned object has the success property
      if (typeof result === 'object' && 'success' in result && result.success) {
        const modelMessage: Message = { 
          role: 'model', 
          content: result.data as string // Tell TS result.data is the string we need
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        // Handle the error case from the object
        const errorMessage = (typeof result === 'object' && 'error' in result) 
          ? result.error 
          : "An unknown error occurred";
        throw new Error(errorMessage as string);
      }
      
    } catch (error: any) {
      console.error("Chatbot submission error:", error);
      toast({
        variant: 'destructive',
        title: 'Connection Error',
        description: error.message || 'The AI assistant is temporarily unavailable.',
      });
      setInput(currentInput); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="lg" onClick={() => setIsOpen(true)}>
        <Sparkles className="mr-2 h-5 w-5" />
        Chat with my AI Assistant
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] flex flex-col h-[70vh]">
          <DialogHeader>
            <DialogTitle>AI Portfolio Assistant</DialogTitle>
            <DialogDescription>
              Powered by GPT-OSS-120B. Ask me about Kanak's background and projects.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 p-4 border rounded-lg bg-muted/20" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-8">
                  <p className="font-medium">Hi! I'm Kanak's virtual twin.</p>
                  <p className="mt-2 text-xs">Try asking:</p>
                  <ul className="list-none space-y-1 mt-2">
                    <li>• "Tell me about your experience with Next.js"</li>
                    <li>• "What projects have you worked on?"</li>
                    <li>• "Are you available for freelance work?"</li>
                  </ul>
                </div>
              )}
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-end gap-2 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                 <div className="flex justify-start items-end gap-2">
                    <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-secondary animate-pulse">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                autoComplete="off"
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}