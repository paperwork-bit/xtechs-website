"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import { Captcha } from "@/components/ui/captcha"

export type ComingSoonStealthSplitProps = {
  heroSrc?: string
  eyebrow?: string
  blurb?: string
  redactedWords?: string[]
  requireBusinessEmail?: boolean
  endpoint?: string
  onJoin?: (payload: { email:string; company?:string; interest?:string; nda:boolean }) => Promise<void>
  showSocials?: boolean
}

const DEFAULT_BLURB = "We’re quietly building something for solar businesses—installers, EPCs and developers. Less noise. More throughput. Details shared with verified companies only."

export default function ComingSoonStealthSplit({
  heroSrc = "/coming-soon-hero.jpg",
  eyebrow = "Invite-Only Preview",
  blurb = DEFAULT_BLURB,
  redactedWords = ["Plan", "Operate", "Scale"],
  requireBusinessEmail = true,
  endpoint,
  onJoin,
  showSocials = true,
}: ComingSoonStealthSplitProps) {
  const prefersReducedMotion = useReducedMotion()

  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [interest, setInterest] = useState("")
  const [nda, setNda] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  function isFreeDomain(e: string) {
    const free = ["gmail.com","yahoo.com","outlook.com","hotmail.com","icloud.com","proton.me","protonmail.com","aol.com","live.com"]
    const m = e.split("@")[1]?.toLowerCase()
    return m ? free.includes(m) : true
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setError("")
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid work email")
      return
    }
    if (requireBusinessEmail && isFreeDomain(email) && !company) {
      setError("Use a company email or add your company name for verification")
      return
    }
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification")
      return
    }
    setSubmitting(true)
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, company, interest, nda, captchaToken }) })
        if (!res.ok) throw new Error("Request failed")
      } else if (onJoin) {
        await onJoin({ email, company, interest, nda })
      } else {
        await new Promise((r) => setTimeout(r, 1200))
      }
      setSuccess(true)
    } catch (e) {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background with moody overlay and Ken Burns */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.06] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          style={{ backgroundImage: `url(${heroSrc})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/50 to-black/65" />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }} className="mx-auto max-w-6xl px-4 md:px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center w-full">
          {/* Left headline */}
          <div className="md:col-span-6 flex items-start">
            <div className="relative">
              <h1 className="uppercase tracking-[0.2em] leading-tight text-5xl md:text-7xl font-extrabold">
                <span className="block">DESIGN. INSTALL. SUPPLY.</span>
                <span className="block mt-6">COMING SOON</span>
              </h1>
            </div>
          </div>

          {/* Middle divider */}
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <motion.div
              className="w-[2px] h-[72vh] max-h-[520px] bg-gradient-to-b from-white/0 via-white/50 to-white/0 shadow-[0_0_24px_rgba(255,255,255,0.18)]"
              initial={{ height: 0 }}
              animate={{ height: "72vh" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            />
          </div>

          {/* Right content */}
          <div className="md:col-span-5">
            {/* Right header with subtle separator label */}
            <div className="text-sm text-white/70 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" /> {eyebrow}
            </div>
            <p className="text-white/80 max-w-prose leading-relaxed">We’re quietly building for solar businesses — installers and electricians first, with an invite-only marketplace for trusted solar products to follow.</p>

            {/* Redacted signal row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Design','Install','Supply'].map((label) => (
                <motion.span key={label} className="text-sm px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 transition relative overflow-hidden">
                  <span className="pr-2">{label}</span>
                  <span className="inline-block w-10 h-3 bg-white/30 blur-sm opacity-70" />
                </motion.span>
              ))}
            </div>

            {/* Invite form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-3" noValidate>
              <div>
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input id="email" type="email" placeholder="your@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 rounded-xl" aria-describedby={error ? "email-error" : undefined} />
                {error && <p id="email-error" className="text-sm text-red-300 mt-1">{error}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="company" className="text-white/70">Company (optional)</Label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="interest" className="text-white/70">I’m interested as (optional)</Label>
                  <Input id="interest" placeholder="Installer/Electrician, EPC/Developer, Supplier/Manufacturer, Distributor, Other" value={interest} onChange={(e) => setInterest(e.target.value)} className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 rounded-xl" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="nda" checked={nda} onCheckedChange={(v) => setNda(Boolean(v))} />
                <Label htmlFor="nda" className="text-white/80">Contact me for a private beta under NDA.</Label>
              </div>
              
              {/* CAPTCHA */}
              <div className="space-y-2">
                <Label className="text-white/80">Security Verification</Label>
                <Captcha
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  onError={() => setCaptchaToken(null)}
                  theme="dark"
                  size="compact"
                  className="flex justify-center"
                />
              </div>
              
              <Button type="submit" disabled={submitting || !captchaToken} className="rounded-xl bg-white/90 text-black hover:bg-white" aria-label="Get early access">
                {submitting ? "Sending…" : "Get Early Access"}
              </Button>
              <p className="text-xs text-white/60">We’ll only share details with verified business emails.</p>
              {success && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-300 text-sm">Request received. We’ll be in touch.</motion.div>
              )}
            </form>

            {/* Socials (optional) */}
            {showSocials && (
              <div className="mt-6 flex items-center gap-3 text-white/60">
                <a className="underline/20 hover:underline" href="mailto:hello@xtechs.au">Email</a>
                <span className="opacity-30">•</span>
                <a className="underline/20 hover:underline" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            )}
          </div>

          {/* Mobile divider */}
          <div className="md:hidden col-span-1">
            <div className="h-px w-full bg-white/20" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}


