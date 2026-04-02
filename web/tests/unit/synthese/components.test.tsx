import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { HealthScoreCard } from "@/components/app/synthese/health-score"
import { AlertsList } from "@/components/app/synthese/alerts-list"
import { ActionsList } from "@/components/app/synthese/actions-list"
import { MorningBriefCard } from "@/components/app/synthese/morning-brief"
import type {
  HealthScore,
  Alert,
  RecommendedAction,
  MorningBrief,
} from "@/lib/synthese-data"

// Mock recharts to avoid jsdom rendering issues
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Area: () => null,
}))

afterEach(() => {
  cleanup()
})

// ── HealthScoreCard ──

describe("[Synthese] HealthScoreCard", () => {
  const healthData: HealthScore = {
    global: 72,
    axes: [
      { label: "Liquidite", score: 85, status: "good" },
      { label: "Rentabilite", score: 75, status: "good" },
      { label: "Croissance", score: 65, status: "warning" },
      { label: "Risque", score: 55, status: "warning" },
    ],
  }

  it("should render the global score", () => {
    render(<HealthScoreCard data={healthData} />)
    expect(screen.getByText("72")).toBeInTheDocument()
    expect(screen.getByText("/100")).toBeInTheDocument()
  })

  it("should render all 4 axis labels", () => {
    render(<HealthScoreCard data={healthData} />)
    for (const label of ["Liquidite", "Rentabilite", "Croissance", "Risque"]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it("should render axis scores", () => {
    render(<HealthScoreCard data={healthData} />)
    for (const score of ["85", "75", "65", "55"]) {
      expect(screen.getByText(score)).toBeInTheDocument()
    }
  })

  it("should display correct status labels", () => {
    render(<HealthScoreCard data={healthData} />)
    expect(screen.getAllByText("Bon")).toHaveLength(2)
    expect(screen.getAllByText("Attention")).toHaveLength(2)
  })

  it("should render the card title", () => {
    render(<HealthScoreCard data={healthData} />)
    expect(screen.getByText("Sante financiere")).toBeInTheDocument()
  })

  it("should show AI badge", () => {
    render(<HealthScoreCard data={healthData} />)
    expect(screen.getByText("AI")).toBeInTheDocument()
  })

  it("should show 'Alerte' status for critical axes", () => {
    const criticalData: HealthScore = {
      global: 35,
      axes: [
        { label: "Liquidite", score: 35, status: "critical" },
        { label: "Rentabilite", score: 35, status: "critical" },
        { label: "Croissance", score: 35, status: "critical" },
        { label: "Risque", score: 35, status: "critical" },
      ],
    }
    render(<HealthScoreCard data={criticalData} />)
    expect(screen.getAllByText("Alerte")).toHaveLength(4)
  })
})

// ── AlertsList ──

describe("[Synthese] AlertsList", () => {
  const alerts: Alert[] = [
    {
      id: "test-critical",
      severity: "critical",
      title: "Alerte critique test",
      description: "Description critique",
      module: "Synthese",
      moduleHref: "/app/synthese",
    },
    {
      id: "test-warning",
      severity: "warning",
      title: "Attention test",
      description: "Description attention",
      module: "Tresorerie",
      moduleHref: "/app/tresorerie",
    },
    {
      id: "test-info",
      severity: "info",
      title: "Info test",
      description: "Description info",
      module: "KPIs SaaS",
      moduleHref: "/app/kpis-saas",
    },
  ]

  it("should render all alert titles", () => {
    render(<AlertsList alerts={alerts} />)
    expect(screen.getByText("Alerte critique test")).toBeInTheDocument()
    expect(screen.getByText("Attention test")).toBeInTheDocument()
    expect(screen.getByText("Info test")).toBeInTheDocument()
  })

  it("should render alert descriptions", () => {
    render(<AlertsList alerts={alerts} />)
    expect(screen.getByText("Description critique")).toBeInTheDocument()
    expect(screen.getByText("Description attention")).toBeInTheDocument()
    expect(screen.getByText("Description info")).toBeInTheDocument()
  })

  it("should render severity badges", () => {
    render(<AlertsList alerts={alerts} />)
    expect(screen.getByText("Critique")).toBeInTheDocument()
    // "Attention" appears both as badge and as alert title — use getAllByText
    expect(screen.getAllByText("Attention").length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText("Info")).toBeInTheDocument()
  })

  it("should show alert count badge", () => {
    render(<AlertsList alerts={alerts} />)
    expect(screen.getByText("3 actives")).toBeInTheDocument()
  })

  it("should render module link text", () => {
    render(<AlertsList alerts={alerts} />)
    // Module names appear as link text
    expect(screen.getByText("Tresorerie")).toBeInTheDocument()
    expect(screen.getByText("KPIs SaaS")).toBeInTheDocument()
  })

  it("should render nothing when alerts is empty", () => {
    const { container } = render(<AlertsList alerts={[]} />)
    expect(container.innerHTML).toBe("")
  })

  it("should show singular 'active' for single alert", () => {
    render(<AlertsList alerts={[alerts[0]]} />)
    expect(screen.getByText("1 active")).toBeInTheDocument()
  })
})

// ── ActionsList ──

describe("[Synthese] ActionsList", () => {
  const actions: RecommendedAction[] = [
    {
      id: "action-1",
      priority: 1,
      title: "Action prioritaire",
      description: "Faire ceci en premier",
      module: "Synthese",
      moduleHref: "/app/synthese",
    },
    {
      id: "action-2",
      priority: 2,
      title: "Action secondaire",
      description: "Faire ceci ensuite",
      module: "Tresorerie",
      moduleHref: "/app/tresorerie",
    },
  ]

  it("should render all action titles", () => {
    render(<ActionsList actions={actions} />)
    expect(screen.getByText("Action prioritaire")).toBeInTheDocument()
    expect(screen.getByText("Action secondaire")).toBeInTheDocument()
  })

  it("should render priority numbers", () => {
    render(<ActionsList actions={actions} />)
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("should render descriptions", () => {
    render(<ActionsList actions={actions} />)
    expect(screen.getByText("Faire ceci en premier")).toBeInTheDocument()
    expect(screen.getByText("Faire ceci ensuite")).toBeInTheDocument()
  })

  it("should render the card title", () => {
    render(<ActionsList actions={actions} />)
    expect(screen.getByText("Actions recommandees")).toBeInTheDocument()
  })

  it("should render nothing when actions is empty", () => {
    const { container } = render(<ActionsList actions={[]} />)
    expect(container.innerHTML).toBe("")
  })
})

// ── MorningBriefCard ──

describe("[Synthese] MorningBriefCard", () => {
  const brief: MorningBrief = {
    text: "Bonjour. Votre tresorerie est de 1,5 M euros.",
    generatedAt: "Il y a 8 min",
  }

  it("should render the brief text", () => {
    render(<MorningBriefCard brief={brief} companyName="Propello" />)
    expect(
      screen.getByText("Bonjour. Votre tresorerie est de 1,5 M euros.")
    ).toBeInTheDocument()
  })

  it("should render the company name in heading", () => {
    render(<MorningBriefCard brief={brief} companyName="Propello" />)
    expect(screen.getByText(/Briefing du matin — Propello/)).toBeInTheDocument()
  })

  it("should render the generatedAt timestamp", () => {
    render(<MorningBriefCard brief={brief} companyName="Propello" />)
    expect(screen.getByText("Il y a 8 min")).toBeInTheDocument()
  })

  it("should show AI badge", () => {
    render(<MorningBriefCard brief={brief} companyName="Propello" />)
    expect(screen.getByText("AI")).toBeInTheDocument()
  })

  it("should render nothing when brief text is empty", () => {
    const emptyBrief: MorningBrief = { text: "", generatedAt: "" }
    const { container } = render(
      <MorningBriefCard brief={emptyBrief} companyName="Test" />
    )
    expect(container.innerHTML).toBe("")
  })
})
