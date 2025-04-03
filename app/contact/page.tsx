"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Your message has been sent! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "support@tesestore.com",
      link: "mailto:support@tesestore.com",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Commerce St, New York, NY 10001",
      link: "https://maps.google.com",
    },
  ]

  return (
    <div className="container py-12">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions, feedback, or need assistance? We're here to help. Reach out to our team using the form below
          or through our contact information.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target={item.title === "Address" ? "_blank" : undefined}
            rel={item.title === "Address" ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center text-center p-6 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.details}</p>
          </motion.a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        <motion.div
          className="lg:col-span-3 rounded-lg border p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="lg:col-span-2 rounded-lg overflow-hidden h-[400px] lg:h-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* This would be replaced with an actual map in a real implementation */}
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Our Location</h3>
              <p className="text-muted-foreground">
                123 Commerce St
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="rounded-lg border p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4">
            <h3 className="font-semibold">Monday - Friday</h3>
            <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">Saturday</h3>
            <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">Sunday</h3>
            <p className="text-muted-foreground">Closed</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">Holidays</h3>
            <p className="text-muted-foreground">Hours may vary</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

