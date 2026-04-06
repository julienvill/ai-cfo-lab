/**
 * Virtual CFO — Types
 *
 * Types for the Virtual CFO module (9a Chat RAG, 9c Predictive Risk).
 * All computations are deterministic in this MVP — no external LLM calls.
 */

export type ChatRole = "user" | "assistant"

export type ChatSource = {
  module: string
  moduleHref: string
  label: string
}

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  sources?: ChatSource[]
  /** Timestamp ISO */
  createdAt: string
}

export type RiskLevel = "critical" | "warning" | "healthy"

export type RiskFactor = {
  key: "cash" | "dso" | "burn" | "bfr"
  label: string
  /** 0-100, higher = worse */
  penalty: number
  /** Weight in the global score (0-1) */
  weight: number
  level: RiskLevel
  detail: string
  recommendation: string
}

export type RiskScore = {
  /** 0-100, higher = healthier */
  global: number
  level: RiskLevel
  factors: RiskFactor[]
  /** Headline summary */
  summary: string
  /** Projected horizon if trend continues (90d) */
  horizon90d: string
}

export type ChatSkillResponse = {
  content: string
  sources: ChatSource[]
}
