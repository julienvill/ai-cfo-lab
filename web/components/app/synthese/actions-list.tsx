"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { RecommendedAction } from "@/lib/synthese-data"

export function ActionsList({ actions }: { actions: RecommendedAction[] }) {
  if (actions.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-[#1E3A5F]">
          Actions recommandees
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <div
            key={action.id}
            className="flex items-start gap-3 rounded-lg p-3 hover:bg-[#F8FAFC] transition-colors"
          >
            {/* Priority indicator */}
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold shrink-0 mt-0.5">
              {action.priority}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-[#1E3A5F]">
                {action.title}
              </span>
              <p className="text-xs text-[#475569] leading-relaxed mt-0.5">
                {action.description}
              </p>
              <Link
                href={action.moduleHref}
                className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline mt-1"
              >
                {action.module}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
