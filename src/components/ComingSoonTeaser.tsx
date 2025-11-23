"use client"

import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Sun, Battery, PlugZap, Rocket, Boxes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Bullet = { icon: React.ReactNode; text: string }

export type ComingSoonTeaserProps = {
  title?: string
  subtitle?: string
  bullets?: Bullet[]
  launchNote?: string
  showCountdown?: boolean
  targetDate?: string
  showWaitlist?: boolean
  accent?: "green" | "blue" | "teal"
  onJoin?: (email: string) => Promise<void>
  endpoint?: string
}

const ACCENT = {
  green: { ring: "ring-emerald-200", glow: "from-emerald-300/20", badge: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700" },
  blue: { ring: "ring-blue-200", glow: "from-blue-300/20", badge: "bg-blue-100 text-blue-700", btn: "bg-blue-600 hover:bg-blue-700" },
  teal: { ring: "ring-teal-200", glow: "from-teal-300/20", badge: "bg-teal-100 text-teal-700", btn: "bg-teal-600 hover:bg-teal-700" },
} as const

export function ComingSoonTeaser({
  title = "X-Vrything Platform",
  subtitle = "Revolutionary VR solar design platform.",
  bullets,
  launchNote,
  showCountdown = false,
  targetDate,
  showWaitlist = true,
  accent = "blue",
  onJoin,
  endpoint,
}: ComingSoonTeaserProps) {
  const accentCfg = ACCENT[accent]
  const defaultBullets: Bullet[] = useMemo(
    () => [
      { icon: <Boxes className="w-4 h-4" />, text: "VR layout & shading analysis" },
      { icon: <Sun className="w-4 h-4" />, text: "Live bill-savings math" },
      { icon: <Rocket className="w-4 h-4" />, text: "One-click proposal export" },
    ],
    []
  )
  const items = bullets && bullets.length ? bullets : defaultBullets

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [now, setNow] = useState<number>(Date.now())
  useEffect(() => {
    if (!showCountdown || !targetDate) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [showCountdown, targetDate])

  const remaining = useMemo(() => {
    if (!showCountdown || !targetDate) return null
    const diff = new Date(targetDate).getTime() - now
    if (diff <= 0) return "00:00:00"
    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const m = Math.floor((diff / (1000 * 60)) % 60)
    return `${String(d).padStart(2, "0")}:${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }, [showCountdown, targetDate, now])

  function validateEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!validateEmail(email)) {
      setError("Enter a valid email")
      return
    }
    setSubmitting(true)
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
        if (!res.ok) throw new Error("Failed to join")
      } else if (onJoin) {
        await onJoin(email)
      } else {
        await new Promise((r) => setTimeout(r, 1200))
      }
      setSuccess(true)
    } catch (err) {
      setError("Couldn’t join right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-slate-200/60 via-white to-white dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-950" />
        <motion.div
          className={`absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full blur-3xl bg-gradient-to-br ${accentCfg.glow} to-transparent opacity-60`}
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full blur-3xl bg-gradient-to-tr from-slate-300/20 to-transparent dark:from-slate-700/20"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating icons */}
        <div className="pointer-events-none select-none">
          <motion.div className="absolute left-8 top-16 opacity-10 blur-[2px]" animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
            <Sun className="w-14 h-14" />
          </motion.div>
          <motion.div className="absolute right-16 top-24 opacity-10 blur-[2px]" animate={{ y: [0, 6, 0], rotate: [0, -6, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}>
            <Battery className="w-12 h-12" />
          </motion.div>
          <motion.div className="absolute right-24 bottom-20 opacity-10 blur-[2px]" animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
            <PlugZap className="w-12 h-12" />
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative w-full px-4">
        <div className="mx-auto w-full max-w-2xl">
          <Card className={`rounded-3xl shadow-sm ring-1 ${accentCfg.ring} backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/40 p-8 md:p-10`}> 
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Badge className={`${accentCfg.badge} gap-1.5`}><Sparkles className="w-3.5 h-3.5" /> Coming Soon</Badge>
                {launchNote ? <span className="text-xs text-slate-500 dark:text-slate-400">{launchNote}</span> : null}
              </div>

              {/* Title with reveal */}
              <motion.h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                <AnimatePresence>
                  {title.split(" ").map((word, i) => (
                    <motion.span key={word + i} className="inline-block mr-2" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i, duration: 0.4 }}>
                      {word}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.h1>

              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>

              {/* Bullets */}
              <div className="grid grid-cols-1 gap-2">
                {items.map((b, i) => (
                  <motion.div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }} whileHover={{ rotate: 0.5 }}>
                    <div className="w-6 h-6 rounded-full bg-slate-900/5 dark:bg-white/10 flex items-center justify-center">{b.icon}</div>
                    <span className="text-sm md:text-base">{b.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Waitlist */}
              {showWaitlist && (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-describedby={error ? "email-error" : undefined} className="flex-1" />
                    <Button type="submit" aria-label="Join waitlist" disabled={submitting} className={`${accentCfg.btn}`}>
                      {submitting ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </div>
                  {error && <p id="email-error" className="text-sm text-red-600">{error}</p>}
                  <Separator className="my-2" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">No spam. Unsubscribe anytime.</p>
                </form>
              )}

              {/* Countdown */}
              {showCountdown && remaining && (
                <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">Launch in {remaining} (DD:HH:MM)</div>
              )}

              {/* Success toast substitute (inline minimal) */}
              {success && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-sm px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  You’re on the list!
                </motion.div>
              )}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

export default ComingSoonTeaser


