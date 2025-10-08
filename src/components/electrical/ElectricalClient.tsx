"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  CheckCircle, 
  ArrowRight,
  Zap,
  Clock,
  Award,
  Shield,
  Phone,
  Home,
  Building,
  Smartphone,
  Wrench
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ElectricalServicesSection } from "./ElectricalServicesSection";
import { ProcessSteps } from "@/components/ui/process-steps";
import { trackCalendlyBooking } from "@/lib/analytics";

const benefits = [
  {
    icon: Shield,
    title: "Licensed Professionals",
    description: "Fully licensed and insured electricians with extensive experience and training."
  },
  {
    icon: Award,
    title: "Safety First",
    description: "All work complies with Australian electrical safety standards and regulations."
  },
  {
    icon: Clock,
    title: "24/7 Emergency Service",
    description: "Round-the-clock emergency electrical services for urgent situations."
  },
  {
    icon: Zap,
    title: "Modern Solutions",
    description: "Latest technology and smart home integration capabilities for modern living."
  }
];

export function ElectricalClient() {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Zap className="w-4 h-4 mr-2" />
                Professional Electrical Services
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Electrical &
                <br />
                <AnimatedUnderline className="text-purple-600 dark:text-purple-400">
                  Home Automation
                </AnimatedUnderline>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional electrical services and smart home automation solutions. 
                From basic electrical work to advanced home automation systems, our 
                licensed electricians deliver safe, reliable, and innovative solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/contact">
                    Book Site Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link 
                    href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackCalendlyBooking('electrical-hero', 'electrical-consultation')}
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Site inspection fees apply. We'll provide a detailed quote after assessing your property.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <Home className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Smart Home Solutions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Smart Lighting Control</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Home Automation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Security Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Energy Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Electrical Services?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Licensed professionals delivering safe, reliable electrical work with 
              modern smart home integration capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                  <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <ProcessSteps
        title="Our Electrical Service Process"
        steps={[
          {
            number: "01",
            title: "Consultation & Assessment",
            description: "We assess your electrical needs, existing infrastructure, and discuss your goals for the project."
          },
          {
            number: "02",
            title: "Design & Planning",
            description: "Custom electrical design and planning with detailed specifications and compliance requirements."
          },
          {
            number: "03",
            title: "Professional Installation",
            description: "Licensed electricians perform the installation with proper permits and safety protocols."
          },
          {
            number: "04",
            title: "Testing & Handover",
            description: "Comprehensive testing, compliance certification, and training on new systems and features."
          }
        ]}
      />

      {/* Services Section */}
      <ElectricalServicesSection />

      {/* Emergency Services CTA */}
      <section className="py-20 bg-red-50 dark:bg-red-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={itemVariants}>
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              24/7 Emergency Electrical Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Electrical emergencies can happen at any time. Our team provides round-the-clock 
              emergency electrical services to ensure your safety and restore power quickly.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                1300 983 247
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Available 24 hours a day, 7 days a week
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="mr-2 w-5 h-5" />
                Call Emergency Line
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Upgrade Your Electrical Systems?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free consultation and quote for professional electrical services. 
              From basic repairs to smart home automation, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  Book Site Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link 
                  href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackCalendlyBooking('electrical-cta', 'electrical-consultation')}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="mr-2 w-5 h-5" />
                Call 1300 983 247
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">
              Site inspection fees apply. We'll provide a detailed quote after assessing your property.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
