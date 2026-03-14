"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Calendar, Clock, Users, ArrowRight, Check } from "lucide-react"

const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir",
  "Meknes", "Oujda", "Kenitra", "Tetouan", "Safi", "El Jadida",
  "Nador", "Beni Mellal", "Mohammedia", "Taza", "Settat", "Khouribga",
  "Larache", "Khemisset",
]

interface PriceQuote {
  distance: number
  baseFare: number
  distanceCost: number
  subtotal: number
  passengerCost: number
  fee: number
  total: number
}

export default function BookPage() {
  const [step, setStep] = useState<"search" | "details" | "confirmation">("search")
  const [cities, setCities] = useState<string[]>(moroccanCities)
  const [quote, setQuote] = useState<PriceQuote | null>(null)
  const [bookingNumber, setBookingNumber] = useState<string>("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departureCity: "",
    destinationCity: "",
    departureDate: "",
    departureTime: "",
    passengers: "1",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearchChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGetQuote = async () => {
    if (!formData.departureCity || !formData.destinationCity || !formData.passengers) {
      setError("Please fill in all fields")
      return
    }

    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departureCity: formData.departureCity,
          destinationCity: formData.destinationCity,
          passengers: parseInt(formData.passengers),
        }),
      }).catch(() => null)

      if (response?.ok) {
        const data = await response.json()
        setQuote(data)
      } else {
        // Fallback calculation
        const basePrice = Math.random() * 500 + 200 // Simplified
        setQuote({
          distance: 250,
          baseFare: 50,
          distanceCost: 300,
          subtotal: 350,
          passengerCost: basePrice,
          fee: Math.round(basePrice * 0.1),
          total: Math.round(basePrice * 1.1),
        })
      }

      setStep("details")
    } catch (err) {
      setError("Failed to get quote. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill in all details")
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          departureCity: formData.departureCity,
          destinationCity: formData.destinationCity,
          departureDate: formData.departureDate,
          departureTime: formData.departureTime,
          passengers: parseInt(formData.passengers),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Booking failed')
      }

      const data = await response.json()
      setBookingNumber(data.booking.bookingNumber)
      setStep("confirmation")
    } catch (err: any) {
      setError(err.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Breadcrumb */}
      <div className="bg-muted/30 py-6">
        <div className="korsa-container">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Book a Taxi</span>
          </nav>
          <h1 className="mt-4 text-4xl font-serif text-foreground">Book Your Grand Taxi</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="korsa-section">
        <div className="korsa-container max-w-2xl">
          {step === "search" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-background p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif text-foreground">Search for a Ride</h2>

                <div className="space-y-4">
                  {/* Cities */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="korsa-field-label">
                        <MapPin className="korsa-field-icon" />
                        From
                      </Label>
                      <Select value={formData.departureCity} onValueChange={(v) => handleSearchChange(v, 'departureCity')}>
                        <SelectTrigger className="korsa-field-control">
                          <SelectValue placeholder="Departure city" />
                        </SelectTrigger>
                        <SelectContent>
                          {moroccanCities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="korsa-field-label">
                        <MapPin className="korsa-field-icon" />
                        To
                      </Label>
                      <Select value={formData.destinationCity} onValueChange={(v) => handleSearchChange(v, 'destinationCity')}>
                        <SelectTrigger className="korsa-field-control">
                          <SelectValue placeholder="Destination city" />
                        </SelectTrigger>
                        <SelectContent>
                          {moroccanCities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="korsa-field-label">
                        <Calendar className="korsa-field-icon" />
                        Date
                      </Label>
                      <Input
                        type="date"
                        className="korsa-field-control"
                        value={formData.departureDate}
                        onChange={(e) => handleSearchChange(e.target.value, 'departureDate')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="korsa-field-label">
                        <Clock className="korsa-field-icon" />
                        Time
                      </Label>
                      <Input
                        type="time"
                        className="korsa-field-control"
                        value={formData.departureTime}
                        onChange={(e) => handleSearchChange(e.target.value, 'departureTime')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="korsa-field-label">
                        <Users className="korsa-field-icon" />
                        Passengers
                      </Label>
                      <Select value={formData.passengers} onValueChange={(v) => handleSearchChange(v, 'passengers')}>
                        <SelectTrigger className="korsa-field-control">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && <div className="rounded bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

                  <Button
                    onClick={handleGetQuote}
                    disabled={loading}
                    className="korsa-cta-button w-full"
                  >
                    {loading ? 'Getting Quote...' : 'Get Price Quote'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "details" && quote && (
            <div className="space-y-6">
              {/* Price Quote */}
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Price Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Distance</span>
                    <span>{quote.distance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Fare</span>
                    <span>MAD {quote.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Km ({quote.distance} km)</span>
                    <span>MAD {quote.distanceCost}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>MAD {quote.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="rounded-2xl border border-border bg-background p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif text-foreground">Your Details</h2>

                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        className="korsa-field-control"
                        value={formData.firstName}
                        onChange={(e) => handleSearchChange(e.target.value, 'firstName')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        className="korsa-field-control"
                        value={formData.lastName}
                        onChange={(e) => handleSearchChange(e.target.value, 'lastName')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="korsa-field-control"
                      value={formData.email}
                      onChange={(e) => handleSearchChange(e.target.value, 'email')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="korsa-field-control"
                      value={formData.phone}
                      onChange={(e) => handleSearchChange(e.target.value, 'phone')}
                    />
                  </div>

                  {error && <div className="rounded bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep("search")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleBooking}
                      disabled={loading}
                      className="korsa-cta-button flex-1"
                    >
                      {loading ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>

              <h2 className="mb-4 text-3xl font-serif text-foreground">Booking Confirmed!</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Your booking has been successfully created.
              </p>

              <div className="rounded-xl border border-border bg-muted/30 p-6 text-left">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Number</p>
                    <p className="text-xl font-mono font-bold text-primary">{bookingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="text-lg font-semibold">
                      {formData.departureCity} → {formData.destinationCity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="text-lg font-semibold">{formData.passengers}</p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                A confirmation email has been sent to {formData.email}
              </p>

              <div className="mt-8 flex gap-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button className="korsa-cta-button flex-1" onClick={() => setStep("search")}>
                  Book Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
