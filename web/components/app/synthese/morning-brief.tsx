"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import type { MorningBrief } from "@/lib/synthese-data"

export function MorningBriefCard({
  brief,
  companyName,
}: {
  brief: MorningBrief
  companyName: string
}) {
  if (!brief.text) return null

  return (
    <Card className="border-l-[3px] border-l-[#8B5CF6] bg-[#EDE9FE]/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Sparkles
            className="h-5 w-5 text-[#7C3AED] shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#7C3AED] text-white text-[10px] px-1.5">
                AI
              </Badge>
              <span className="text-sm font-semibold text-[#1E3A5F]">
                Briefing du matin — {companyName}
              </span>
              <span className="text-[10px] text-[#94A3B8] ml-auto">
                {brief.generatedAt}
              </span>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed italic">
              {brief.text}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
