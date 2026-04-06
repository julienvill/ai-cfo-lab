"use client"

import { useCompany } from "@/lib/company-context"
import { ChatPanel } from "@/components/app/virtual-cfo/chat-panel"
import { RiskDashboard } from "@/components/app/virtual-cfo/risk-dashboard"
import { computeRiskScore } from "@/lib/virtual-cfo/risk-scoring"
import { getSuggestedQuestions } from "@/lib/virtual-cfo/chat-skills"

export default function VirtualCfoPage() {
  const { company } = useCompany()
  const riskScore = computeRiskScore(company.slug)
  const suggestions = getSuggestedQuestions(company.slug)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat — 2/3 */}
        <div className="lg:col-span-2">
          <ChatPanel company={company.slug} suggestedQuestions={suggestions} />
        </div>

        {/* Risk dashboard — 1/3 */}
        <div>
          <RiskDashboard score={riskScore} />
        </div>
      </div>
    </div>
  )
}
