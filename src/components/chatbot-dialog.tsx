"use client"

import * as React from "react"
import { Send, Bot, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { askChatbot } from "@/app/actions"
import { Repo } from "./projects-section"
import { cn } from "@/lib/utils"

export default function ChatbotDialog({ liveProjects }: { liveProjects: Repo[] }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I'm Kanak's AI assistant. Ask me anything about my projects or experience! ✨" }
  ])
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
  
    try {
      const result = await askChatbot(userMessage, liveProjects);
  
      // Type Guard: Check if result is an object and has success property
      if (typeof result === "object" && result !== null && "success" in result) {
        if (result.success && "data" in result) {
          setMessages((prev) => [...prev, { role: "assistant", content: result.data as string }]);
        } else if ("error" in result) {
          setMessages((prev) => [...prev, { role: "assistant", content: result.error as string }]);
        }
      } else if (typeof result === "string") {
        // Handle the case where the action might return just a string
        setMessages((prev) => [...prev, { role: "assistant", content: result }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! My storytelling gears got stuck." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl transition-all hover:scale-110",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col shadow-2xl animate-in slide-in-from-bottom-5">
          <CardHeader className="flex flex-row items-center justify-between border-b p-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              Kanak's AI
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted animate-pulse rounded-2xl px-4 py-2 text-sm">Typing...</div>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t p-4">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex w-full items-center gap-2"
            >
              <Input
                placeholder="Ask about a project..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}