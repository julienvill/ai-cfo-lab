import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { AskCfoButton } from "@/components/app/ask-cfo-button"

// Mock locale + company contexts used inside the drawer & button
vi.mock("@/lib/locale-context", () => ({
  useLocale: () => ({
    locale: "fr",
    setLocale: () => {},
    t: (k: string) => {
      const map: Record<string, string> = {
        "app.header.askCfo.button": "Ask CFO",
        "app.header.askCfo.drawerTitle": "Ask CFO — Assistant financier",
        "app.header.askCfo.viewFull": "Voir le tableau de bord complet →",
        "app.header.askCfo.close": "Fermer",
      }
      return map[k] ?? k
    },
  }),
}))

vi.mock("@/lib/company-context", () => ({
  useCompany: () => ({
    company: { slug: "flowtechy", name: "FlowTechy" },
    setCompany: () => {},
    companies: [],
  }),
}))

// Stub ChatPanel to avoid fetch & full rendering
vi.mock("@/components/app/virtual-cfo/chat-panel", () => ({
  ChatPanel: () => <div data-testid="chat-panel-stub">ChatPanel</div>,
}))

vi.mock("@/lib/virtual-cfo/chat-skills", () => ({
  getSuggestedQuestions: () => ["Q1", "Q2"],
}))

afterEach(() => {
  cleanup()
})

describe("[AppHeader] AskCfoButton", () => {
  it("renders the gradient button with Ask CFO label", () => {
    render(<AskCfoButton />)
    const btn = screen.getByTestId("ask-cfo-button")
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent("Ask CFO")
    expect(btn).toHaveAttribute("aria-label", "Ask CFO")
    expect(btn).toHaveAttribute("aria-haspopup", "dialog")
    expect(btn).toHaveAttribute("aria-expanded", "false")
  })

  it("opens the drawer on click and shows ChatPanel + footer link", () => {
    render(<AskCfoButton />)
    expect(screen.queryByTestId("ask-cfo-drawer")).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId("ask-cfo-button"))

    expect(screen.getByTestId("ask-cfo-drawer")).toBeInTheDocument()
    expect(screen.getByTestId("chat-panel-stub")).toBeInTheDocument()
    const viewFull = screen.getByTestId("ask-cfo-view-full")
    expect(viewFull).toHaveAttribute("href", "/app/virtual-cfo")
    expect(screen.getByTestId("ask-cfo-button")).toHaveAttribute(
      "aria-expanded",
      "true"
    )
  })

  it("closes the drawer via the X button", () => {
    render(<AskCfoButton />)
    fireEvent.click(screen.getByTestId("ask-cfo-button"))
    expect(screen.getByTestId("ask-cfo-drawer")).toBeInTheDocument()

    fireEvent.click(screen.getByTestId("ask-cfo-close"))
    expect(screen.queryByTestId("ask-cfo-drawer")).not.toBeInTheDocument()
  })

  it("closes the drawer via Escape key", () => {
    render(<AskCfoButton />)
    fireEvent.click(screen.getByTestId("ask-cfo-button"))
    expect(screen.getByTestId("ask-cfo-drawer")).toBeInTheDocument()

    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByTestId("ask-cfo-drawer")).not.toBeInTheDocument()
  })

  it("closes the drawer via overlay click", () => {
    render(<AskCfoButton />)
    fireEvent.click(screen.getByTestId("ask-cfo-button"))
    fireEvent.click(screen.getByTestId("ask-cfo-overlay"))
    expect(screen.queryByTestId("ask-cfo-drawer")).not.toBeInTheDocument()
  })
})
