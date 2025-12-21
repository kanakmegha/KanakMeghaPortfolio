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
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askChatbot({
        question: input,
        history: messages,
      });
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the chatbot.',
      });
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
              Ask me anything about Kanak's skills, projects, or experience.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 p-4 border rounded-lg bg-muted/20" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-8">
                  <p>Welcome! Try asking questions like:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>"What is Kanak's most recent job?"</li>
                    <li>"Tell me about the QuickRead project."</li>
                    <li>"What technologies does Kanak know?"</li>
                  </ul>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-end gap-2 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-end gap-2">
                    <div className="max-w-[75%] rounded-lg p-3 text-sm bg-background">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                autoComplete="off"
                disabled={isLoading}
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
