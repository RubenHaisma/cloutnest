"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline"
  className?: string
}

export function LogoutButton({ variant = "ghost", className }: LogoutButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={() => signOut({ callbackUrl: "/" })}
      className={className}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </Button>
  )
}