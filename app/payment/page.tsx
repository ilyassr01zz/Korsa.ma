"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, Truck, Clock, Shield, CheckCircle } from "lucide-react"

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-6">
        <div className="korsa-container">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Payment & Ticket</span>
          </nav>
          <h1 className="mt-4 text-4xl font-serif text-foreground">Payment & Tickets</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="korsa-section">
        <div className="korsa-container">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Payment Methods */}
            <div>
              <h2 className="mb-6 text-2xl font-serif text-foreground">Payment Methods</h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: CreditCard,
                    title: 'Credit/Debit Card',
                    description: 'Visa, Mastercard, American Express'
                  },
                  {
                    icon: Truck,
                    title: 'Pay at Station',
                    description: 'Cash payment at pickup location'
                  },
                  {
                    icon: CreditCard,
                    title: 'Bank Transfer',
                    description: 'Direct bank to bank transfer'
                  },
                ].map((method, idx) => {
                  const Icon = method.icon
                  return (
                    <Card key={idx} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              <Button asChild className="korsa-cta-button mt-8 w-full">
                <Link href="/book">Make a Booking</Link>
              </Button>
            </div>

            {/* Ticket Information */}
            <div>
              <h2 className="mb-6 text-2xl font-serif text-foreground">About Your Ticket</h2>

              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle,
                    title: 'Instant Confirmation',
                    description: 'Receive your ticket immediately after payment'
                  },
                  {
                    icon: Shield,
                    title: 'Secure & Safe',
                    description: 'All payments are encrypted and secure'
                  },
                  {
                    icon: Clock,
                    title: 'Digital Ticket',
                    description: 'Show your email confirmation at the station'
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <Card key={idx} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
                <h3 className="mb-3 font-semibold text-foreground">Cancellation Policy</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cancel up to 24 hours before departure for full refund</li>
                  <li>• Cancel 12-24 hours: 50% refund</li>
                  <li>• Cancel less than 12 hours: No refund</li>
                  <li>• No-show: Booking forfeited</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
