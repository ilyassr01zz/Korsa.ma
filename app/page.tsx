import { Hero } from "@/components/hero"
import { FeatureSection } from "@/components/feature-section"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* User-Friendly Interface Section */}
      <FeatureSection
        id="user-friendly"
        title="User-Friendly Interface"
        description="Our website is designed with you in mind, making it easy to search for and book grand taxis in just a few clicks."
        imageSrc="/images/city-taxis.jpg"
        imageAlt="Moroccan taxis in a traditional city"
      />
      
      {/* Real-Time Availability Section */}
      <FeatureSection
        id="about"
        title="Real-Time Availability"
        description="Check available seats in real-time, allowing you to make informed decisions and secure your travel plans without delay."
        imageSrc="/images/digital-tech.jpg"
        imageAlt="Digital technology concept with flowing lights"
        reverse
      />
      
      {/* Secure Payment Options Section */}
      <FeatureSection
        id="payment"
        title="Secure Payment Options"
        description="Enjoy peace of mind with our secure payment system designed to protect your transactions."
        imageSrc="/images/secure-payment.jpg"
        imageAlt="Laptop showing online payment interface"
      />
      
      {/* Booking Section */}
      <BookingSection />
      
      <Footer />
    </main>
  )
}
