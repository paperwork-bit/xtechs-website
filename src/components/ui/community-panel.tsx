'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Users, MessageSquare, FileText, ExternalLink, Calendar } from 'lucide-react'
import { Announcement } from '@/types/xclasses'
import { formatRelativeDate } from '@/lib/xclasses'

interface CommunityPanelProps {
  announcements: Announcement[]
  className?: string
}

const faqItems = [
  {
    question: "How do I get started with X-Vrything?",
    answer: "Start by watching our 'Getting Started' tutorial videos in the Videos tab. We also have comprehensive documentation and a supportive community ready to help."
  },
  {
    question: "When will X-Vrything be available?",
    answer: "We're targeting a Q2 2024 release for the public beta. Early access will be available to our community members first. Follow our updates for the latest timeline."
  },
  {
    question: "How can I join the beta program?",
    answer: "Subscribe to our newsletter and join our community Discord. We'll announce beta access opportunities through these channels."
  },
  {
    question: "What makes X-Vrything different?",
    answer: "X-Vrything combines powerful automation with an intuitive interface, making complex workflows accessible to everyone. Our focus is on simplicity without sacrificing power."
  },
  {
    question: "How can I contribute to the project?",
    answer: "Join our community, provide feedback, report bugs, and suggest features. We value input from our users and community members."
  }
]

const quickLinks = [
  { label: "Getting Started", href: "#getting-started", icon: FileText },
  { label: "Roadmap", href: "#roadmap", icon: Calendar },
  { label: "Report an issue", href: "#report-issue", icon: MessageSquare },
  { label: "Request a feature", href: "#request-feature", icon: ExternalLink }
]

export function CommunityPanel({ announcements, className = '' }: CommunityPanelProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className}`}>
      {/* Left Column */}
      <div className="space-y-6">
        {/* Start Here */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Start Here
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3"
                    asChild
                  >
                    <a href={link.href}>
                      <link.icon className="w-4 h-4 mr-2" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Join Community */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Join Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Connect with other users, get help, and stay updated on the latest developments.
              </p>
              
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <a href="https://discord.gg/QPw8VrSc" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Join Discord
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {announcements.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No announcements yet. Check back soon!
                </p>
              ) : (
                <div className="space-y-4">
                  {announcements.slice(0, 3).map((announcement, index) => (
                    <div key={announcement.id} className="border-l-2 border-primary/20 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {formatRelativeDate(announcement.publishedAt)}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{announcement.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {announcement.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
