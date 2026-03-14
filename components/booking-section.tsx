"use client"

import { useState, useRef } from "react"
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
import { MapPin, Calendar, Clock, Users, Search } from "lucide-react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "Safi",
  "El Jadida",
  "Nador",
  "Beni Mellal",
  "Mohammedia",
  "Taza",
  "Settat",
  "Khouribga",
  "Larache",
  "Khemisset",
]

export function BookingSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Booking submitted:", formData)
  }

  return (
    <section
      id="booking"
      ref={ref}
      className="korsa-section korsa-section--muted"
    >
      <div className="korsa-container">
        <div
          className={cn(
            "korsa-section-intro",
            isInView
              ? "animate-in fade-in slide-in-from-bottom-4 duration-700"
              : "opacity-0",
          )}
        >
          <h2 className="korsa-section-title">
            Find Your Perfect Ride
          </h2>
          <p className="korsa-section-text korsa-section-text--narrow">
            Quickly search for available grand taxis by entering your departure 
            and destination cities, along with your preferred travel date and time.
          </p>
        </div>

        <div
          className={cn(
            "mx-auto max-w-4xl",
            isInView
              ? "animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
              : "opacity-0",
          )}
        >
          <form
            onSubmit={handleSubmit}
            className="korsa-surface-card"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Departure City */}
              <div className="space-y-2">
                <Label htmlFor="departure" className="korsa-field-label">
                  <MapPin className="korsa-field-icon" />
                  Departure City
                </Label>
                <Select
                  value={formData.departure}
                  onValueChange={(value) =>
                    setFormData({ ...formData, departure: value })
                  }
                >
                  <SelectTrigger id="departure" className="korsa-field-control">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    {moroccanCities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Destination City */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="korsa-field-label">
                  <MapPin className="korsa-field-icon" />
                  Destination City
                </Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) =>
                    setFormData({ ...formData, destination: value })
                  }
                >
                  <SelectTrigger id="destination" className="korsa-field-control">
                    <SelectValue placeholder="Select destination city" />
                  </SelectTrigger>
                  <SelectContent>
                    {moroccanCities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="korsa-field-label">
                  <Calendar className="korsa-field-icon" />
                  Travel Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="korsa-field-control"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              {/* Travel Time */}
              <div className="space-y-2">
                <Label htmlFor="time" className="korsa-field-label">
                  <Clock className="korsa-field-icon" />
                  Travel Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="korsa-field-control"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>

              {/* Passengers */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="passengers" className="korsa-field-label">
                  <Users className="korsa-field-icon" />
                  Passengers
                </Label>
                <Select
                  value={formData.passengers}
                  onValueChange={(value) =>
                    setFormData({ ...formData, passengers: value })
                  }
                >
                  <SelectTrigger id="passengers" className="korsa-field-control">
                    <SelectValue placeholder="Select number of passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="cta"
                className="korsa-cta-button"
              >
                <Link href="/book">
                  <Search className="w-5 h-5 mr-2" />
                  Find Taxis
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
