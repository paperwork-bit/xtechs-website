"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { fetchGoogleReviews, formatReviewDate } from "@/lib/google-reviews";

interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}


export function GoogleReviewsSlider() {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [reviews, setReviews] = React.useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch reviews on component mount
  React.useEffect(() => {
    const loadReviews = async () => {
      try {
        const fetchedReviews = await fetchGoogleReviews();
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Filter to only show 5-star reviews
  const fiveStarReviews = reviews.filter(review => review.rating === 5);

  React.useEffect(() => {
    // Wait 5 seconds before starting the animation
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Auto-advance reviews every 8 seconds (slower)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fiveStarReviews.length);
    }, 8000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [fiveStarReviews.length]);

  if (!isVisible || isLoading || fiveStarReviews.length === 0) {
    return null;
  }

  const currentReview = fiveStarReviews[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Real reviews from satisfied customers who chose xTechs Renewables
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 50,
                damping: 20
              }}
              className="w-full"
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <Quote className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {currentReview.relative_time_description || formatReviewDate(currentReview.time)}
                        </span>
                      </div>
                      
                      <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        "{currentReview.text}"
                      </blockquote>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            {currentReview.author_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {currentReview.author_name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Google Review
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Review indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {fiveStarReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-blue-600 scale-125" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Google Reviews link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Read more reviews on
            </p>
            <a
              href="https://www.google.com/search?q=xTechs+Renewables+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google Reviews
            </a>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              *Real customer reviews from Google My Business
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
