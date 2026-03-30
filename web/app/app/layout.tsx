import { CompanyProvider } from "@/lib/company-context"
import { Sidebar } from "@/components/app/sidebar"
import { AppHeader } from "@/components/app/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CompanyProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <AppHeader />
          <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-8">
            <div className="max-w-[1440px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </CompanyProvider>
  )
}
