"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Captcha } from "@/components/ui/captcha";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  notes: string;
  selectedDate: string;
  selectedTime: string;
  captchaToken: string;
}

const WORKING_HOURS = {
  start: 8,
  end: 17,
  lunchStart: 12,
  lunchEnd: 13
};

const SERVICE_TYPES = [
  "Solar Panel Installation",
  "Battery Storage",
  "EV Charger Installation", 
  "Electrical Services",
  "Home Automation",
  "Off-Grid System",
  "Commercial Solar",
  "Builder Services"
];

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    notes: "",
    selectedDate: "",
    selectedTime: "",
    captchaToken: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // Booked times fetched from server for selected date
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  React.useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDate) { setBookedTimes([]); return; }
      try {
        const res = await fetch(`/api/bookings?date=${selectedDate}`);
        if (res.ok) {
          const data = await res.json();
          setBookedTimes(Array.isArray(data.times) ? data.times : []);
        }
      } catch {
        // ignore network errors, fallback to local
        setBookedTimes([]);
      }
    };
    fetchAvailability();
  }, [selectedDate]);

  // ----- Local storage persistence for demo purposes -----
  const loadBookedMap = (): Record<string, string[]> => {
    try {
      const raw = localStorage.getItem("xtechs-bookings");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const saveBookedTime = (date: string, time: string) => {
    const map = loadBookedMap();
    map[date] = Array.from(new Set([...(map[date] || []), time]));
    localStorage.setItem("xtechs-bookings", JSON.stringify(map));
  };

  const timeToMinutes = (t: string): number => {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  };

  const minutesToTime = (m: number): string => {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
  };

  // Generate available dates (today if weekday, then next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    
    // Include today if it's a weekday
    if (today.getDay() !== 0 && today.getDay() !== 6) {
      dates.push(today.toISOString().split('T')[0]);
    }
    
    // Add next 30 weekdays
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  // Generate time slots for selected date
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];

    // Build a set of blocked minutes based on existing bookings (block +90 minutes window)
    const bookedMap = loadBookedMap();
    const fallback = bookedMap[selectedDate] || [];
    const bookedForDate = (bookedTimes && bookedTimes.length > 0) ? bookedTimes : fallback;
    const blocked: Set<string> = new Set();
    bookedForDate.forEach((t) => {
      const start = timeToMinutes(t);
      // Block the booked slot and next two 30-min slots (total 90 minutes)
      [0, 30, 60].forEach((offset) => {
        blocked.add(minutesToTime(start + offset));
      });
    });

    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
      if (hour >= WORKING_HOURS.lunchStart && hour < WORKING_HOURS.lunchEnd) {
        continue;
      }
      const t1 = `${hour.toString().padStart(2, '0')}:00`;
      const t2 = `${hour.toString().padStart(2, '0')}:30`;
      slots.push({ time: t1, available: !blocked.has(t1) });
      slots.push({ time: t2, available: !blocked.has(t2) });
    }

    return slots;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setFormData(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, selectedTime: time }));
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCaptchaVerify = (token: string | null) => {
    setCaptchaToken(token);
    setFormData(prev => ({ ...prev, captchaToken: token || "" }));
  };

  const PAYMENT_URL = "https://book.stripe.com/9B6bIU8ILesR8r94xZ8Ra01";

  const redirectToPayment = () => {
    if (typeof window !== "undefined") {
      window.location.assign(PAYMENT_URL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check CAPTCHA verification
    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedDate,
          selectedTime,
          type: 'site-assessment'
        }),
      });

      if (response.ok) {
        // Persist booked slot locally to simulate backend availability
        if (selectedDate && selectedTime) {
          saveBookedTime(selectedDate, selectedTime);
        }

        // Fire-and-forget booking notification so it doesn't block redirect
        fetch('/api/notify-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            selectedDate,
            selectedTime,
            type: 'site-assessment'
          }),
        }).catch((notifyErr) => {
          console.warn('notify-booking request failed:', notifyErr);
        });

        // Redirect customer to Stripe payment page for site visit fee
        redirectToPayment();
        return;
      } else {
        const errorData = await response.json().catch(() => null);
        console.error('Booking API returned an error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData
        });
        alert(
          `We were unable to confirm the booking automatically (${
            errorData?.error || response.statusText || "Unknown error"
          }). You'll now be redirected to the payment page and our team will follow up.`
        );
        redirectToPayment();
        return;
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book appointment. Please try again or call us directly.');
      redirectToPayment();
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Site Assessment</h2>
        <p className="text-gray-600">
          Schedule a professional site assessment for your solar, battery, or electrical project
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableDates.slice(0, 24).map((date) => {
                const dateObj = new Date(date + 'T00:00:00'); // Ensure consistent timezone
                const isSelected = selectedDate === date;
                const isToday = date === new Date().toISOString().split('T')[0];
                
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : isToday
                        ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium">
                      {dateObj.toLocaleDateString('en-AU', { weekday: 'short' })}
                    </div>
                    <div className="text-xs">
                      {dateObj.getDate()}/{dateObj.getMonth() + 1}
                    </div>
                    {isToday && (
                      <div className="text-[10px] text-blue-600 mt-0.5">Today</div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Select Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-2 rounded-lg border text-sm transition-colors ${
                      selectedTime === slot.time
                        ? 'bg-blue-600 text-white border-blue-600'
                        : slot.available
                        ? 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        {selectedDate && selectedTime && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Property Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Full address for site assessment"
                  required
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md"
                  required
                >
                  <option value="">Select a service</option>
                  {SERVICE_TYPES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Site Assessment Details</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our technician will visit your property on {selectedDate} at {selectedTime} to assess your site for the best solar or electrical solution. 
                      Assessment fees apply and will be discussed during the visit.
                    </p>
                  </div>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="space-y-2">
                <Label>Security Verification</Label>
                <Captcha
                  onVerify={handleCaptchaVerify}
                  onExpire={() => setCaptchaToken(null)}
                  onError={() => setCaptchaToken(null)}
                  theme="light"
                  size="normal"
                  className="flex justify-center"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !captchaToken}
              >
                {isSubmitting ? "Booking..." : "Confirm Appointment"}
              </Button>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
