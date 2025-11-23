'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Check, Loader2 } from 'lucide-react'
import { newsletterSchema, type NewsletterFormData, subscribeToUpdates, interestCategories } from '@/lib/newsletter'

interface SubscribeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SubscribeDialog({ isOpen, onClose }: SubscribeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema)
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    
    try {
      const result = await subscribeToUpdates({
        ...data,
        interests: selectedInterests
      })
      
      if (result.success) {
        setIsSuccess(true)
        reset()
        setSelectedInterests([])
        
        // Close dialog after 2 seconds
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Subscription failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests(prev => [...prev, interest])
    } else {
      setSelectedInterests(prev => prev.filter(i => i !== interest))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-md">
            <div className="mb-6">
              <DialogTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Subscribe to Updates
              </DialogTitle>
            </div>
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register('email')}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...register('name')}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Interests (Optional)</Label>
                    <div className="space-y-2">
                      {interestCategories.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={selectedInterests.includes(interest)}
                            onCheckedChange={(checked) => 
                              handleInterestChange(interest, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={interest}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Successfully Subscribed!</h3>
                  <p className="text-muted-foreground">
                    You'll receive updates about X-Vrything development and new features.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
