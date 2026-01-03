"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    const target = process.env.NEXT_PUBLIC_LOGIN_URL || "http://localhost:3000/login"
    if (typeof window !== "undefined") {
      window.location.href = target
    } else {
      router.push(target)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={isLoading} className="gap-2">
      <LogOut className="h-4 w-4" />
      {isLoading ? "正在退出…" : "退出登录"}
    </Button>
  )
}
