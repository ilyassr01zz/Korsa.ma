"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Target, Award, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-6">
        <div className="korsa-container">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">About Us</span>
          </nav>
          <h1 className="mt-4 text-4xl font-serif text-foreground">About Korsa</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="korsa-section">
        <div className="korsa-container max-w-3xl">
          {/* Company Story */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-serif text-foreground">Our Story</h2>
            <p className="korsa-section-text">
              Korsa was founded with a mission to revolutionize intercity transportation in Morocco. 
              We recognized the need for a modern, reliable, and user-friendly platform to book grand taxis 
              across the country. What started as a vision has grown into a trusted service connecting thousands 
              of travelers daily.
            </p>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="mb-8 text-3xl font-serif text-foreground">Our Values</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: 'Reliability',
                  description: 'We ensure every journey is safe, on-time, and comfortable'
                },
                {
                  icon: Zap,
                  title: 'Innovation',
                  description: 'Cutting-edge technology for seamless booking experience'
                },
                {
                  icon: Users,
                  title: 'Community',
                  description: 'Supporting local drivers and businesses across Morocco'
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'Committed to the highest standards of service'
                },
              ].map((value, idx) => {
                const Icon = value.icon
                return (
                  <Card key={idx} className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              { number: '50K+', label: 'Bookings Completed' },
              { number: '500+', label: 'Partner Vehicles' },
              { number: '20+', label: 'Cities Connected' },
            ].map((stat, idx) => (
              <Card key={idx} className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Team */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-serif text-foreground">Our Team</h2>
            <p className="korsa-section-text mb-6">
              Our team consists of passionate professionals dedicated to making intercity travel 
              in Morocco more accessible, affordable, and reliable. From technology experts to customer 
              service specialists, we're here to serve you 24/7.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h3 className="mb-4 text-2xl font-serif text-foreground">Get in Touch</h3>
            <p className="mb-6 text-muted-foreground">
              Have questions? We'd love to hear from you. Contact us anytime.
            </p>
            <Button asChild className="korsa-cta-button">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
