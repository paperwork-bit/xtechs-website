"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
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
  lunchEnd: 13,
};

const SERVICE_TYPES = [
  "Solar Panel Installation",
  "Battery Storage",
  "EV Charger Installation",
  "Electrical Services",
  "Home Automation",
  "Off-Grid System",
  "Commercial Solar",
  "Builder Services",
];

/* ---------------------------------------------
 * Responsive helpers
 * ---------------------------------------------
 */

/** Basic responsive breakpoint hook.
 *  - isMobile: < 640px
 *  - isTablet: 640–1023px
 *  - isDesktop: ≥ 1024px
 */
function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") {
      return { isMobile: false, isTablet: false, isDesktop: true };
    }
    const w = window.innerWidth;
    return {
      isMobile: w < 640,
      isTablet: w >= 640 && w < 1024,
      isDesktop: w >= 1024,
    };
  };
  const [bp, setBp] = React.useState(get);
  React.useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp;
}

/** Format weekday in short form (e.g., Tue, Wed) */
function formatShortWeekday(dateStr: string, locale = "en-AU") {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale, { weekday: "short" });
}

/** Format to dd/MM */
function ddMM(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

/** Check if a given ISO date string is today */
function isTodayISO(dateStr: string) {
  return dateStr === new Date().toISOString().split("T")[0];
}

/* ---------------------------------------------
 * Mobile horizontal date strip (scrollable)
 * ---------------------------------------------
 */
function MobileDateStrip({
  dates,
  selectedDate,
  onSelect,
}: {
  dates: string[];
  selectedDate: string;
  onSelect: (d: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the selected item on mount/update
  React.useEffect(() => {
    if (!containerRef.current || !selectedDate) return;
    const el = containerRef.current.querySelector<HTMLButtonElement>(
      `button[data-date="${selectedDate}"]`
    );
    if (el) {
      const parent = containerRef.current;
      const offset =
        el.offsetLeft - parent.clientWidth / 2 + el.clientWidth / 2;
      parent.scrollTo({ left: Math.max(offset, 0), behavior: "smooth" });
    }
  }, [selectedDate]);

  // If you have shadcn ScrollArea, you can replace the wrapper below with:
  /*
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 py-2 pr-2">
        { ...buttons }
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
  */

  return (
    <div className="relative">
      {/* Edge gradient to hint horizontal scroll */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex gap-2 py-2 pr-2 overflow-x-auto scrollbar-thin snap-x snap-mandatory"
        role="listbox"
        aria-label="Select Date"
      >
        {dates.map((date) => {
          const selected = selectedDate === date;
          return (
            <button
              key={date}
              data-date={date}
              type="button"
              onClick={() => onSelect(date)}
              role="option"
              aria-selected={selected}
              className={[
                "snap-center shrink-0",
                "flex flex-col items-center justify-center",
                "min-w-[78px] h-16 px-2 rounded-xl border text-sm",
                "transition-colors active:scale-[0.98]",
                selected
                  ? "bg-blue-600 text-white border-blue-600"
                  : isTodayISO(date)
                  ? "bg-blue-50 text-blue-700 border-blue-300 font-semibold"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300",
              ].join(" ")}
            >
              <span className="font-medium leading-none">
                {formatShortWeekday(date)}
              </span>
              <span className="text-xs opacity-90 mt-1">{ddMM(date)}</span>
              {/* Compact Today badge */}
              {isTodayISO(date) && (
                <span className="text-[10px] text-blue-600 mt-0.5">Today</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------
 * Grid dates for tablet/desktop
 * ---------------------------------------------
 */
function GridDates({
  dates,
  selectedDate,
  onSelect,
  cols = 6,
}: {
  dates: string[];
  selectedDate: string;
  onSelect: (d: string) => void;
  cols?: number;
}) {
  const gridCols =
    cols === 3
      ? "grid-cols-3"
      : cols === 4
      ? "grid-cols-4"
      : cols === 5
      ? "grid-cols-5"
      : "grid-cols-6";

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {dates.map((date) => {
        const selected = selectedDate === date;
        return (
          <button
            key={date}
            type="button"
            onClick={() => onSelect(date)}
            aria-pressed={selected}
            className={[
              "p-3 rounded-lg border text-sm transition-colors",
              "min-h-[64px] flex flex-col items-center justify-center",
              selected
                ? "bg-blue-600 text-white border-blue-600"
                : isTodayISO(date)
                ? "bg-blue-50 text-blue-700 border-blue-300 font-semibold"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300",
            ].join(" ")}
          >
            <div className="font-medium leading-none">
              {formatShortWeekday(date)}
            </div>
            <div className="text-xs opacity-90 mt-1">{ddMM(date)}</div>
            {isTodayISO(date) && (
              <div className="text-[10px] text-blue-600 mt-0.5">Today</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------
 * Main component
 * ---------------------------------------------
 */
export function BookingCalendar() {
  // Selected date/time
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Form data
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
    captchaToken: "",
  });

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Booked times fetched from server for selected date
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // Responsive breakpoint flags
  const { isMobile, isTablet } = useBreakpoint();

  // Limit of days shown (smaller on mobile to avoid long lists)
  const [dateLimit, setDateLimit] = React.useState<number>(30);
  React.useEffect(() => {
    // On breakpoint change, reset suitable limit (≈ 3 weeks for mobile)
    setDateLimit(isMobile ? 21 : 30);
  }, [isMobile]);

  // Fetch availability when date changes
  React.useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDate) {
        setBookedTimes([]);
        return;
      }
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

  /* -------- Local storage helpers (for demo fallback) -------- */
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

  /* -------- Time math helpers -------- */
  const timeToMinutes = (t: string): number => {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  };

  const minutesToTime = (m: number): string => {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
    // Note: padding keeps times consistent (e.g., 08:00 instead of 8:0)
  };

  /* -------- Generate available dates (weekdays only) -------- */
  const generateAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of day

    // Include today if it's a weekday
    if (today.getDay() !== 0 && today.getDay() !== 6) {
      dates.push(today.toISOString().split("T")[0]);
    }

    // Add next 30 weekdays
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends (Sat=6, Sun=0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  /* -------- Generate time slots with blocking around booked ones -------- */
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];

    // Build a set of blocked minutes based on existing bookings (block 90 minutes window)
    const bookedMap = loadBookedMap();
    const fallback = bookedMap[selectedDate] || [];
    const bookedForDate =
      bookedTimes && bookedTimes.length > 0 ? bookedTimes : fallback;

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
        continue; // skip lunch hour
      }
      const t1 = `${hour.toString().padStart(2, "0")}:00`;
      const t2 = `${hour.toString().padStart(2, "0")}:30`;
      slots.push({ time: t1, available: !blocked.has(t1) });
      slots.push({ time: t2, available: !blocked.has(t2) });
    }
    return slots;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  /* -------- Handlers -------- */
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setFormData((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, selectedTime: time }));
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCaptchaVerify = (token: string | null) => {
    setCaptchaToken(token);
    setFormData((prev) => ({ ...prev, captchaToken: token || "" }));
  };

  /* -------- Payment helpers -------- */
  const PAYMENT_URL = "https://buy.stripe.com/00weV61gj1G5gXF5C38Ra03";

  const buildPaymentUrl = (bookingId?: string) => {
    try {
      const url = new URL(PAYMENT_URL);
      if (bookingId) {
        url.searchParams.set("client_reference_id", bookingId);
      }
      if (formData.email) {
        url.searchParams.set("prefilled_email", formData.email);
      }
      return url.toString();
    } catch {
      return PAYMENT_URL;
    }
  };

  const redirectToPayment = (paymentUrl: string) => {
    if (typeof window !== "undefined") {
      window.location.assign(paymentUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure CAPTCHA is completed
    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedDate,
          selectedTime,
          type: "site-assessment",
        }),
      });

      const json = await response.json().catch(() => null);
      const bookingIdFromApi =
        json && typeof json.bookingId === "string" ? json.bookingId : undefined;
      const paymentUrl = buildPaymentUrl(bookingIdFromApi);

      // Fire-and-forget notification so it doesn't block redirect
      fetch("/api/notify-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedDate,
          selectedTime,
          type: "site-assessment",
          bookingId: bookingIdFromApi,
          bookingSaved: response.ok,
          paymentStatus: "pending",
          paymentUrl,
        }),
      }).catch((notifyErr) => {
        console.warn("notify-booking request failed:", notifyErr);
      });

      if (response.ok) {
        // Persist booked slot locally to simulate backend availability
        if (selectedDate && selectedTime) {
          saveBookedTime(selectedDate, selectedTime);
        }
        // Redirect to Stripe
        redirectToPayment(paymentUrl);
        return;
      } else {
        const errorData = json;
        console.error("Booking API returned an error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorData,
        });
        alert(
          `We were unable to confirm the booking automatically (${
            errorData?.error || response.statusText || "Unknown error"
          }). You'll now be redirected to the payment page and our team will follow up.`
        );
        redirectToPayment(paymentUrl);
        return;
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book appointment. Please try again or call us directly.");
      redirectToPayment(buildPaymentUrl(undefined));
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-3 sm:px-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Book Site Assessment
        </h2>
        <p className="text-gray-600">
          Schedule a professional site assessment for your solar, battery, or
          electrical project
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ---------------------------------------------
            Date Selection (Responsive Optimized)
           --------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Mobile: horizontal scroll chips */}
              {isMobile && (
                <MobileDateStrip
                  dates={availableDates.slice(0, dateLimit)}
                  selectedDate={selectedDate}
                  onSelect={(d) => {
                    handleDateSelect(d);
                    // Auto scroll to time section after choosing a date
                    setTimeout(() => {
                      document
                        .getElementById("time-select")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 60);
                  }}
                />
              )}

              {/* Tablet/Desktop: grid 3/6 columns */}
              {!isMobile && (
                <GridDates
                  dates={availableDates.slice(0, dateLimit)}
                  selectedDate={selectedDate}
                  onSelect={handleDateSelect}
                  cols={isTablet ? 3 : 6}
                />
              )}

              {/* Show more dates to avoid huge lists initially */}
              {availableDates.length > dateLimit && (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setDateLimit((x) =>
                        Math.min(
                          x + (isMobile ? 14 : 30),
                          availableDates.length
                        )
                      )
                    }
                  >
                    Show more dates
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------
            Time Selection
           --------------------------------------------- */}
        {selectedDate && (
          <Card id="time-select">
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
                    className={[
                      "p-2 rounded-lg border text-sm transition-colors min-h-[44px]",
                      selectedTime === slot.time
                        ? "bg-blue-600 text-white border-blue-600"
                        : slot.available
                        ? "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed",
                    ].join(" ")}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------------------------------------------
            Contact Information
           --------------------------------------------- */}
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
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Property Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Full address for site assessment"
                  required
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) =>
                    handleInputChange("serviceType", e.target.value)
                  }
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
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Site Assessment Details
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our technician will visit your property on {selectedDate} at{" "}
                      {selectedTime} to assess your site for the best solar or
                      electrical solution. Assessment fees apply and will be
                      discussed during the visit.
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
