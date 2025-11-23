import { z } from 'zod'

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  interests: z.array(z.string()).optional()
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

// Mock subscription function
// TODO: Replace with actual API endpoint
export const subscribeToUpdates = async (data: NewsletterFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('Newsletter subscription:', data)
  
  // Mock success response
  return {
    success: true,
    message: 'Thank you for subscribing! You\'ll receive updates about X-Vrything development and new features.'
  }
}

// Mock unsubscribe function
export const unsubscribeFromUpdates = async (email: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  console.log('Newsletter unsubscription:', email)
  
  return {
    success: true,
    message: 'You have been unsubscribed from our updates.'
  }
}

// Interest categories for newsletter
export const interestCategories = [
  'Product Updates',
  'Tutorials & Guides',
  'Community News',
  'Beta Access',
  'Technical Documentation'
] as const

export type InterestCategory = typeof interestCategories[number]
