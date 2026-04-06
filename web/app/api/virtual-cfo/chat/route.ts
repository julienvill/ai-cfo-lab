/**
 * POST /api/virtual-cfo/chat
 *
 * Deterministic chat endpoint for the Virtual CFO MVP.
 * Body : { company: CompanySlug, question: string }
 * Returns : { content: string, sources: ChatSource[] }
 *
 * Will be swapped for an Anthropic-backed RAG in Phase 4.
 */

import { NextResponse } from "next/server"
import { answerQuestion } from "@/lib/virtual-cfo/chat-skills"
import type { CompanySlug } from "@/lib/companies"

const VALID_SLUGS: CompanySlug[] = ["propello", "mecaform", "maison-nordique"]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { company, question } = body as {
      company?: string
      question?: string
    }

    if (!company || !VALID_SLUGS.includes(company as CompanySlug)) {
      return NextResponse.json(
        { error: "Invalid or missing company slug" },
        { status: 400 }
      )
    }
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      )
    }
    if (question.length > 500) {
      return NextResponse.json(
        { error: "Question too long (max 500 chars)" },
        { status: 400 }
      )
    }

    const response = answerQuestion(company as CompanySlug, question)
    return NextResponse.json(response)
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}
