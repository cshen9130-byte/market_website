import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const bypass = process.env.DEV_AUTH_BYPASS === "true"
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!bypass && (error || !user)) {
    redirect("/")
  }

  // Fetch admin user profile
  const adminUser = bypass ? { email: user?.email, full_name: "Developer User" } : (await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user!.id)
    .single()).data

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader user={adminUser || { email: user.email, full_name: null }} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
