"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Captcha } from "@/components/ui/captcha"

interface Contact2Props {
  title?: string
  description?: string
  phone?: string
  email?: string
  web?: { label: string; url: string }
  /** Override submit URL; defaults to import.meta.env.VITE_EMAIL_ENDPOINT */
  submitUrl?: string
}

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // honeypot field for basic spam bots
  company: z.string().optional(),
  // file uploads
  files: z.array(z.instanceof(File)).optional(),
  // CAPTCHA token
  captchaToken: z.string().min(1, "Please complete the CAPTCHA verification"),
})

type FormValues = z.infer<typeof schema>

export const Contact2 = ({
  title = "Contact Us",
  description = "We're available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "1300 983 247",
  email = "inquiries@xtechsrenewables.com.au",
  web = { label: "xtechsrenewables.com.au", url: "https://www.xtechsrenewables.com.au" },
  submitUrl,
}: Contact2Props) => {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null)
  const [showCaptcha, setShowCaptcha] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      company: "", // honeypot
      files: [],
      captchaToken: "",
    },
  })

  // Watch form fields to show CAPTCHA only after user starts filling
  const firstName = watch("firstName")
  const lastName = watch("lastName")
  const email = watch("email")
  const message = watch("message")

  // Show CAPTCHA only after user has filled at least some required fields
  React.useEffect(() => {
    const hasStartedFilling = 
      (firstName && firstName.trim().length > 0) ||
      (lastName && lastName.trim().length > 0) ||
      (email && email.trim().length > 0) ||
      (message && message.trim().length > 5)
    
    if (hasStartedFilling && !showCaptcha) {
      setShowCaptcha(true)
    }
  }, [firstName, lastName, email, message, showCaptcha])

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const files = watch("files")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList) {
      const newFiles = Array.from(fileList)
      const updatedFiles = [...selectedFiles, ...newFiles]
      setSelectedFiles(updatedFiles)
      setValue("files", updatedFiles)
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updatedFiles)
    setValue("files", updatedFiles)
  }

  const handleCaptchaVerify = (token: string | null) => {
    setCaptchaToken(token)
    setValue("captchaToken", token || "")
  }

  const onSubmit = async (values: FormValues) => {
    // If honeypot is filled, silently accept without sending
    if (values.company && values.company.trim().length > 0) {
      setStatus("success")
      reset()
      return
    }

    // Check CAPTCHA verification
    if (!captchaToken) {
      setErrorMsg("Please complete the CAPTCHA verification")
      return
    }

    setStatus("loading")
    setErrorMsg(null)

    try {
      const url =
        submitUrl ??
        (typeof import.meta !== "undefined" ? import.meta.env.VITE_EMAIL_ENDPOINT : process.env.NEXT_PUBLIC_EMAIL_ENDPOINT)

      if (!url) {
        throw new Error("Submit endpoint is not configured (VITE_EMAIL_ENDPOINT/NEXT_PUBLIC_EMAIL_ENDPOINT).")
      }

      // Create FormData for file uploads
      const formData = new FormData()
      formData.append("firstName", values.firstName)
      formData.append("lastName", values.lastName)
      formData.append("email", values.email)
      formData.append("subject", values.subject)
      formData.append("message", values.message)
      formData.append("captchaToken", values.captchaToken)
      
      // Add files to FormData
      if (values.files && values.files.length > 0) {
        values.files.forEach((file, index) => {
          formData.append(`file_${index}`, file)
        })
        formData.append("fileCount", values.files.length.toString())
      }

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        let errorMessage = `Request failed with status ${res.status}`;
        try {
          const data = await res.json().catch(() => null);
          if (data?.error) {
            errorMessage = data.error;
          } else {
            const text = await res.text().catch(() => "");
            if (text) {
              // Try to parse JSON from text
              try {
                const jsonError = JSON.parse(text);
                errorMessage = jsonError.error || jsonError.message || errorMessage;
              } catch {
                errorMessage = text || errorMessage;
              }
            }
          }
        } catch {
          // Fallback to status message
        }
        throw new Error(errorMessage);
      }

      setStatus("success")
      reset()
    } catch (e: any) {
      setStatus("error")
      setErrorMsg(e?.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          {/* Left column — copy + contact details */}
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-4xl font-semibold tracking-tight lg:mb-1 lg:text-5xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* Company Logo */}
            <div className="flex flex-col items-center text-center">
              <img 
                src="/xlogo.png" 
                alt="xTechs Renewables Logo" 
                className="h-24 w-auto object-contain mb-4"
              />
              <blockquote className="text-sm italic text-muted-foreground max-w-xs">
                "Powering Victoria's future with clean, reliable solar energy solutions."
              </blockquote>
            </div>

            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-4 text-center text-xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                <li>
                  <span className="font-semibold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-semibold">Email: </span>
                  <a href={`mailto:${email}`} className="underline underline-offset-4">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Web: </span>
                  <a href={web.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column — form */}
          <div className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-lg border p-6 md:p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" placeholder="First Name" {...register("firstName")} aria-invalid={!!errors.firstName} />
                  {errors.firstName && (
                    <p className="text-[13px] text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" placeholder="Last Name" {...register("lastName")} aria-invalid={!!errors.lastName} />
                  {errors.lastName && (
                    <p className="text-[13px] text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" {...register("email")} aria-invalid={!!errors.email} />
                {errors.email && <p className="text-[13px] text-destructive">{errors.email.message}</p>}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Subject" {...register("subject")} aria-invalid={!!errors.subject} />
                {errors.subject && <p className="text-[13px] text-destructive">{errors.subject.message}</p>}
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." rows={6} {...register("message")} aria-invalid={!!errors.message} />
                {errors.message && <p className="text-[13px] text-destructive">{errors.message.message}</p>}
              </div>

              {/* File Upload Section */}
              <div className="grid w-full gap-1.5">
                <Label htmlFor="files">Upload Photos (Optional)</Label>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Help us provide a better quote by sharing:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Photos of your meter box and switchboard</li>
                      <li>Recent power bills for usage analysis</li>
                      <li>Roof photos showing available space</li>
                      <li>Any existing solar equipment</li>
                    </ul>
                  </div>
                  <input
                    type="file"
                    id="files"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Selected files:</p>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CAPTCHA - Only show after user starts filling form */}
              {showCaptcha ? (
                <div className="grid w-full gap-1.5">
                  <Label>Security Verification</Label>
                  <Captcha
                    onVerify={handleCaptchaVerify}
                    onExpire={() => setCaptchaToken(null)}
                    onError={() => setCaptchaToken(null)}
                    theme="light"
                    size="normal"
                    className="flex justify-center"
                  />
                  {errors.captchaToken && (
                    <p className="text-[13px] text-destructive">{errors.captchaToken.message}</p>
                  )}
                </div>
              ) : (
                <div className="grid w-full gap-1.5">
                  <Label>Security Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Please fill in the form fields above to enable security verification.
                  </p>
                </div>
              )}

              {/* Honeypot (hidden) */}
              <div className="hidden">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Company" {...register("company")} />
              </div>

              <Button className="w-full" type="submit" disabled={status === "loading" || !captchaToken}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <p className="text-sm text-emerald-600">Thanks! Your message has been sent.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive">Error: {errorMsg ?? "Please try again."}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
