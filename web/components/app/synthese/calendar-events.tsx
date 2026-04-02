"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, CreditCard, Landmark, Users, CalendarClock } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import type { CalendarEvent } from "@/lib/synthese-data"

const EVENT_TYPE_CONFIG = {
  fiscal: {
    icon: Landmark,
    color: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10",
  },
  payment: {
    icon: CreditCard,
    color: "text-[#2563EB]",
    bg: "bg-[#2563EB]/10",
  },
  internal: {
    icon: Users,
    color: "text-[#7C3AED]",
    bg: "bg-[#7C3AED]/10",
  },
  deadline: {
    icon: CalendarClock,
    color: "text-[#D97706]",
    bg: "bg-[#D97706]/10",
  },
} as const

function EventRow({ event }: { event: CalendarEvent }) {
  const config = EVENT_TYPE_CONFIG[event.type]
  const Icon = config.icon

  return (
    <div className="flex items-start gap-3 py-2">
      <div className={`flex items-center justify-center h-7 w-7 rounded-md ${config.bg} shrink-0`}>
        <Icon className={`h-3.5 w-3.5 ${config.color}`} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#94A3B8] tabular-nums">
            {event.date}
          </span>
          <span className="text-sm text-[#1E3A5F]">{event.label}</span>
        </div>
        {event.amount !== undefined && (
          <span className="text-xs font-medium text-[#475569] tabular-nums">
            {formatCurrency(event.amount, { compact: true })}
          </span>
        )}
      </div>
    </div>
  )
}

export function CalendarEvents({
  today,
  week,
}: {
  today: CalendarEvent[]
  week: CalendarEvent[]
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#64748B]" strokeWidth={1.5} />
          <CardTitle className="text-sm font-semibold text-[#1E3A5F]">
            Calendrier financier
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* Today */}
        <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
          Aujourd&apos;hui
        </div>
        {today.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}

        <Separator className="my-3" />

        {/* This week */}
        <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
          Cette semaine
        </div>
        {week.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </CardContent>
    </Card>
  )
}
