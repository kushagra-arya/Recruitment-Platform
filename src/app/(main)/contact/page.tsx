'use client';

import { useState } from "react";
import { Button, SectionWrapper } from "@/components";
import { sendContactInquiry } from "@/app/actions/send-contact-inquiry";

const allowedEmailDomains = [
  'gmail.com', 'yahoo.com', 'yahoo.in', 'yahoo.co.in', 'yahoo.co.uk',
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me',
  'rediffmail.com', 'rediff.com',
  'zoho.com', 'zohomail.com',
  'aol.com',
  'mail.com', 'email.com',
  'yandex.com', 'yandex.ru',
  'gmx.com', 'gmx.net',
  'tutanota.com', 'tutamail.com',
  'fastmail.com',
  'hey.com',
  'pm.me',
];

const isValidEmail = (email: string): boolean => {
  const basicEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!basicEmailRegex.test(email)) return false;
  
  const domain = email.split('@')[1].toLowerCase();
  return allowedEmailDomains.includes(domain);
};

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    if (id === 'email') {
      setEmailError('');
    }
    if (id === 'name') {
      setNameError('');
    }
    if (id === 'phone') {
      setPhoneError('');
    }
  };

  const validateName = (name: string): boolean => {
    if (name.length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    if (name.length > 100) {
      setNameError('Name must be less than 100 characters');
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
      setNameError('Name can only contain letters');
      return false;
    }
    return true;
  };

  const validateEmail = (email: string): boolean => {
    if (!isValidEmail(email)) {
      setEmailError('Please use a valid email from Gmail, Yahoo, Outlook, Hotmail, iCloud, Protonmail, Rediffmail, Zoho, or AOL');
      return false;
    }
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError('Phone number must be exactly 10 digits (no spaces or special characters)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    if (!validateName(formData.name)) {
      isValid = false;
    }
    if (!validateEmail(formData.email)) {
      isValid = false;
    }
    if (!validatePhone(formData.phone)) {
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    setIsSubmitting(true);
    
    const submitData = {
      ...formData,
      phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : '',
    };
    
    try {
      const result = await sendContactInquiry(submitData);
      
      if (result.success) {
        console.log('Contact inquiry and confirmation emails sent successfully');
        setIsSubmitted(true);
      } else {
        console.error('Failed to send emails:', result.error);
        alert('Failed to send your message. Please try again or email us directly at shreeshyamtalentsolutions@gmail.com');
      }
    } catch (error) {
      console.error('Error sending contact inquiry:', error);
      alert('An error occurred. Please try again or email us directly at shreeshyamtalentsolutions@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <SectionWrapper className="min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary">Message Sent Successfully!</h1>
          <p className="mt-4 text-secondary">
            Thank you for contacting us! Your message has been sent to our team, and a confirmation email has been sent to <strong>{formData.email}</strong>.
          </p>
          <p className="mt-2 text-secondary">
            We&apos;ll review your inquiry and get back to you within <strong>24-48 hours</strong>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="link" href="/">
              Back to Home
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsSubmitted(false);
                setEmailError('');
                setNameError('');
                setPhoneError('');
                setFormData({
                  name: "",
                  email: "",
                  countryCode: "+91",
                  phone: "",
                  company: "",
                  subject: "",
                  message: "",
                });
              }}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      <section className="relative bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-200 italic font-medium text-center">
            &ldquo;Talent is everywhere, but opportunity is not. We are the bridge.&rdquo;
          </p>
        </div>
      </section>

      <SectionWrapper className="bg-background">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary">
              Let&apos;s Talk
            </h2>
            <p className="mt-4 text-secondary">
              Whether you&apos;re a job seeker looking for your next opportunity or an employer 
              seeking top talent, our team is ready to assist you.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Email Us</h3>
                  <p className="mt-1 text-secondary">shreeshyamtalentsolutions@gmail.com</p>
                  <p className="text-muted text-sm">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Call Us</h3>
                  <p className="mt-1 text-secondary">+91 8570022580</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Visit Us</h3>
                  <p className="text-secondary">Gurugram, Haryana 122002</p>
                  <p className="text-secondary">India</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-primary mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/shree-shyam-talent-solutions/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white hover:bg-accent transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white hover:bg-accent transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white hover:bg-accent transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl shadow-lg p-8">
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => formData.name && validateName(formData.name)}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className={`w-full rounded-lg border ${nameError ? 'border-red-500' : 'border-background'} bg-white px-4 py-3 text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors`}
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {nameError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => formData.email && validateEmail(formData.email)}
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
                  className={`w-full rounded-lg border ${emailError ? 'border-red-500' : 'border-background'} bg-white px-4 py-3 text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors`}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    id="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-36 rounded-lg border border-background bg-white px-3 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  >
                    {countryCodes.map((cc) => (
                      <option key={cc.code} value={cc.code}>
                        {cc.flag} {cc.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => formData.phone && validatePhone(formData.phone)}
                    placeholder="9876543210"
                    autoComplete="tel-national"
                    className={`flex-1 rounded-lg border ${phoneError ? 'border-red-500' : 'border-background'} bg-white px-4 py-3 text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors`}
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {phoneError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  autoComplete="organization"
                  className="w-full rounded-lg border border-background bg-white px-4 py-3 text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject <span className="text-accent">*</span>
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-background bg-white px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="candidate">I&apos;m a Job Seeker</option>
                  <option value="employer">I&apos;m an Employer</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                  rows={5}
                  className="w-full rounded-lg border border-background bg-white px-4 py-3 text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
