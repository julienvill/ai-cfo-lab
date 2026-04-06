"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, User, Bot, ExternalLink } from "lucide-react"
import type { ChatMessage } from "@/lib/virtual-cfo/types"
import type { CompanySlug } from "@/lib/companies"
import Link from "next/link"

type Props = {
  company: CompanySlug
  suggestedQuestions: string[]
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function ChatPanel({ company, suggestedQuestions }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  // Reset chat on company switch
  useEffect(() => {
    setMessages([])
  }, [company])

  async function sendQuestion(question: string) {
    if (!question.trim() || loading) return
    const userMsg: ChatMessage = {
      id: makeId(),
      role: "user",
      content: question.trim(),
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/virtual-cfo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, question: question.trim() }),
      })
      const data = await res.json()
      const assistantMsg: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: data.content ?? "Erreur lors de la réponse.",
        sources: data.sources ?? [],
        createdAt: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: "Erreur réseau — impossible de contacter le Virtual CFO.",
          createdAt: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendQuestion(input)
  }

  return (
    <Card className="flex flex-col h-[640px]">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-[#1E3A5F] flex items-center gap-2">
            <Bot className="h-4 w-4 text-[#7C3AED]" strokeWidth={1.5} />
            Chat Virtual CFO
          </CardTitle>
          <Badge className="bg-[#7C3AED] text-white text-[10px] px-1.5 gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0 gap-3">
        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 pr-2"
          data-testid="chat-messages"
        >
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-10 w-10 mx-auto text-[#CBD5E1] mb-3" strokeWidth={1.5} />
              <p className="text-sm text-[#64748B] mb-4">
                Posez une question financière en langage naturel.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendQuestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] hover:border-[#7C3AED]/30 transition-colors"
                    data-testid="suggested-question"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              data-testid={`message-${msg.role}`}
            >
              {msg.role === "assistant" && (
                <div className="shrink-0 h-7 w-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-[#7C3AED]" strokeWidth={1.5} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F1F5F9] text-[#1E3A5F]"
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-[#CBD5E1]/40 space-y-1">
                    {msg.sources.map((s, i) => (
                      <Link
                        key={i}
                        href={s.moduleHref}
                        className="flex items-center gap-1 text-[11px] text-[#7C3AED] hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                        {s.module} — {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="shrink-0 h-7 w-7 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-[#2563EB]" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 justify-start" data-testid="chat-loading">
              <div className="shrink-0 h-7 w-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-[#7C3AED] animate-pulse" strokeWidth={1.5} />
              </div>
              <div className="rounded-lg bg-[#F1F5F9] px-3.5 py-2.5">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2 shrink-0 pt-3 border-t border-[#E2E8F0]">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question financière..."
            className="flex-1"
            disabled={loading}
            data-testid="chat-input"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] gap-1.5"
            data-testid="chat-send"
          >
            <Send className="h-4 w-4" strokeWidth={1.5} />
            Envoyer
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
