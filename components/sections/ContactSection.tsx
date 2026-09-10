'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Send, MapPin, Clock, MessageSquare, Loader2, Phone } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast.success('Message Sent Successfully! 📬', {
        description: `Thank you ${data.name}! Your message has been sent to ashadullah761@gmail.com. Ashadullah will reply to ${data.email} shortly.`,
      });
      reset();
    } catch (err: any) {
      // Fallback: Open mailto directly
      const mailtoUrl = `mailto:ashadullah761@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${data.subject}`
      )}&body=${encodeURIComponent(
        `Hi Ashadullah,\n\n${data.message}\n\nFrom: ${data.name} (${data.email})`
      )}`;
      window.location.href = mailtoUrl;
      toast.error('Could not send via form. Opening your email app...', {
        description: err.message || 'Please send your message via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-midnight-950/80 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full glass-card border border-purple-500/30"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>06. Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <a
              href="mailto:ashadullah761@gmail.com?subject=Project%20Inquiry%20-%20Ashadullah"
              className="glass-card p-6 rounded-2xl border border-purple-500/20 flex items-start space-x-4 hover:border-purple-500/40 transition-all group block"
            >
              <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-heading text-white">Direct Email</h4>
                <p className="text-sm text-slate-400 mt-0.5 group-hover:text-purple-300 transition-colors">ashadullah761@gmail.com</p>
                <span className="text-xs text-purple-400 group-hover:underline mt-2 inline-flex items-center font-medium">
                  Send an email &rarr;
                </span>
              </div>
            </a>

            <a
              href="tel:+919351625306"
              className="glass-card p-6 rounded-2xl border border-purple-500/20 flex items-start space-x-4 hover:border-purple-500/40 transition-all group block"
            >
              <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-heading text-white">Phone &amp; WhatsApp</h4>
                <p className="text-sm text-slate-400 mt-0.5 group-hover:text-emerald-300 transition-colors font-mono">+91 9351625306</p>
                <span className="text-xs text-emerald-400 group-hover:underline mt-2 inline-flex items-center font-medium">
                  Call or WhatsApp &rarr;
                </span>
              </div>
            </a>

            <div className="glass-card p-6 rounded-2xl border border-purple-500/20 flex items-start space-x-4">
              <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-heading text-white">Location</h4>
                <p className="text-sm text-slate-400 mt-0.5">Sanjay C Colony, Pratap Nagar</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-purple-500/20 flex items-start space-x-4">
              <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-heading text-white">Response Time</h4>
                <p className="text-sm text-slate-400 mt-0.5">Usually within 12 - 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 sm:p-10 rounded-3xl border border-purple-500/20 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-midnight-950/70 border border-purple-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  />
                  {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-midnight-950/70 border border-purple-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="Project Inquiry / Hiring"
                  className="w-full px-4 py-3 rounded-xl bg-midnight-950/70 border border-purple-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
                {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-4 py-3 rounded-xl bg-midnight-950/70 border border-purple-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all resize-none"
                />
                {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-base hover:shadow-xl hover:shadow-purple-600/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Mobile Phone & WhatsApp Contact Badge */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400 border-t border-purple-500/10">
                <span className="text-xs text-slate-400">Prefer direct call or WhatsApp?</span>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919351625306"
                    className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/50 transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 9351625306</span>
                  </a>
                  <a
                    href="https://wa.me/919351625306"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all shadow-sm shadow-emerald-600/20"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
