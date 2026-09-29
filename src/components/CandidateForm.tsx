'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components';
import { submitCandidate } from '@/app/actions/submit-candidate';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Email validation regex - only allows known email providers
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

const candidateFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z]+$/, 'First name can only contain letters'),
  lastName: z.string()
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z]*$/, 'Last name can only contain letters')
    .optional()
    .or(z.literal('')),
  emailAlreadyRegistered: z.boolean().optional(),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .refine((email) => isValidEmail(email), {
      message: 'Please use a valid email from Gmail, Yahoo, Outlook, Hotmail, iCloud, Protonmail, Rediffmail, Zoho, or AOL',
    }),
  countryCode: z.string().min(1, 'Please select a country code'),
  phone: z.string()
    .min(10, 'Phone number must be exactly 10 digits')
    .max(10, 'Phone number must be exactly 10 digits')
    .regex(/^[0-9]{10}$/, 'Phone number must contain only 10 digits (no spaces or special characters)'),
  location: z.string().min(2, 'Please enter your location'),
  
  qualification: z.string().min(1, 'Please select your qualification'),
  
  currentRole: z.string().min(2, 'Please enter your current role'),
  jobType: z.string().min(1, 'Please select a job type'),
  industry: z.string().min(1, 'Please select an industry'),
  experience: z.string().min(1, 'Please select your experience level'),
  currentSalary: z.string()
    .optional()
    .refine((val) => !val || /^[0-9,]+$/.test(val), {
      message: 'Current salary must contain only numbers and commas',
    }),
  expectedSalary: z.string()
    .optional()
    .refine((val) => !val || /^[0-9,]+$/.test(val), {
      message: 'Expected salary must contain only numbers and commas',
    }),
  
  linkedIn: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  
  coverLetter: z.string().optional(),
  
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type CandidateFormData = z.infer<typeof candidateFormSchema>;

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  register: ReturnType<typeof useForm<CandidateFormData>>['register'];
  options?: string[];
  textarea?: boolean;
  rows?: number;
  autocomplete?: string;
}

function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  required = false,
  error,
  register,
  options,
  textarea = false,
  rows = 4,
  autocomplete,
}: FormInputProps) {
  const baseInputStyles = `w-full rounded-lg border ${
    error ? 'border-red-500' : 'border-slate-200'
  } bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 
    focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 
    transition-all duration-200`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="text-amber-600 ml-1">*</span>}
      </label>
      {options ? (
        <select
          id={id}
          {...register(id as keyof CandidateFormData)}
          className={baseInputStyles}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={id}
          {...register(id as keyof CandidateFormData)}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInputStyles} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id as keyof CandidateFormData)}
          placeholder={placeholder}
          autoComplete={autocomplete}
          className={baseInputStyles}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function CandidateForm() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      location: '',
      qualification: '',
      currentRole: '',
      jobType: '',
      industry: '',
      experience: '',
      currentSalary: '',
      expectedSalary: '',
      linkedIn: '',
      portfolio: '',
      coverLetter: '',
      termsAccepted: false,
      emailAlreadyRegistered: false,
    },
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];
  const industries = ['Technology', 'Finance', 'Marketing', 'Healthcare', 'Legal', 'Engineering', 'Sales', 'Other'];
  const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior (5-10 years)', 'Executive (10+ years)'];
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) {
      setCvFile(null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      setCvFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 5MB');
      setCvFile(null);
      return;
    }

    setCvFile(file);
  };

  const onSubmit = async (data: CandidateFormData) => {
    if (!cvFile) {
      setFileError('Please upload your CV/Resume');
      return;
    }

    setSubmitError(null);

    try {
      const formData = new FormData();
      
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName || '');
      formData.append('email', data.email);
      formData.append('phone', `${data.countryCode} ${data.phone}`);
      formData.append('location', data.location);
      formData.append('qualification', data.qualification);
      formData.append('currentRole', data.currentRole);
      formData.append('jobType', data.jobType);
      formData.append('industry', data.industry);
      formData.append('experience', data.experience);
      formData.append('currentSalary', data.currentSalary || '');
      formData.append('expectedSalary', data.expectedSalary || '');
      formData.append('linkedIn', data.linkedIn || '');
      formData.append('portfolio', data.portfolio || '');
      formData.append('coverLetter', data.coverLetter || '');
      formData.append('resume', cvFile);

      const result = await submitCandidate(formData);

      if (result.success) {
        console.log('Resume uploaded successfully:', result.resumeUrl);
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-100">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">
            Thank You!
          </h2>
          <p className="text-slate-600 mb-2">
            We have received your details.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Our recruitment team will review your profile and get back to you within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" href="/jobs">
              Browse Jobs
            </Button>
            <Button as="link" href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Candidate Registration
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Fields marked with <span className="text-amber-600">*</span> are required
          </p>
        </div>

        <div className="p-8 space-y-10">
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-red-900 font-semibold text-sm">Submission Failed</h4>
                <p className="text-red-700 text-sm mt-1">{submitError}</p>
              </div>
            </div>
          )}

          <section>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Personal Information
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormInput
                label="First Name"
                id="firstName"
                placeholder="Enter your first name"
                required
                error={errors.firstName?.message}
                register={register}
                autocomplete="given-name"
              />
              <FormInput
                label="Last Name"
                id="lastName"
                placeholder="Enter your last name"
                error={errors.lastName?.message}
                register={register}
                autocomplete="family-name"
              />
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                error={errors.email?.message}
                register={register}
                autocomplete="email"
              />
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  Phone Number <span className="text-amber-600 ml-1">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    {...register('countryCode')}
                    className={`w-32 rounded-lg border ${errors.countryCode ? 'border-red-500' : 'border-slate-200'} bg-white px-3 py-3.5 text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200`}
                  >
                    {countryCodes.map((cc) => (
                      <option key={cc.code} value={cc.code}>
                        {cc.flag} {cc.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="9876543210"
                    autoComplete="tel-national"
                    className={`flex-1 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-200'} bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200`}
                  />
                </div>
                {(errors.countryCode || errors.phone) && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.countryCode?.message || errors.phone?.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <FormInput
                  label="Current Location"
                  id="location"
                  placeholder="Enter your current location"
                  required
                  error={errors.location?.message}
                  register={register}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Educational Qualification
            </h3>
            <div className="grid gap-6">
              <FormInput
                label="Highest Qualification"
                id="qualification"
                required
                options={[
                  'High School (10th)',
                  'Higher Secondary (12th)',
                  'Diploma',
                  'Bachelor\'s Degree (B.A./B.Sc./B.Com.)',
                  'Bachelor\'s in Engineering (B.E./B.Tech.)',
                  'Bachelor\'s in Business (BBA)',
                  'Master\'s Degree (M.A./M.Sc./M.Com.)',
                  'Master\'s in Engineering (M.E./M.Tech.)',
                  'Master\'s in Business (MBA)',
                  'Doctorate (Ph.D.)',
                  'Professional Certification',
                  'Other'
                ]}
                error={errors.qualification?.message}
                register={register}
              />
            </div>
          </section>

          <section>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Professional Details
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  label="Current Role"
                  id="currentRole"
                  placeholder="Enter your current role"
                  required
                  error={errors.currentRole?.message}
                  register={register}
                />
              </div>
              <FormInput
                label="Preferred Job Type"
                id="jobType"
                required
                options={jobTypes}
                error={errors.jobType?.message}
                register={register}
              />
              <FormInput
                label="Industry"
                id="industry"
                required
                options={industries}
                error={errors.industry?.message}
                register={register}
              />
              <FormInput
                label="Experience Level"
                id="experience"
                required
                options={experienceLevels}
                error={errors.experience?.message}
                register={register}
              />
              <FormInput
                label="Current Salary"
                id="currentSalary"
                placeholder="₹5,00,000"
                error={errors.currentSalary?.message}
                register={register}
              />
              <div className="sm:col-span-2">
                <FormInput
                  label="Expected Salary"
                  id="expectedSalary"
                  placeholder="₹6,00,000 - ₹7,00,000"
                  error={errors.expectedSalary?.message}
                  register={register}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Links & Documents
            </h3>
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormInput
                  label="LinkedIn Profile"
                  id="linkedIn"
                  type="url"
                  placeholder="Enter your LinkedIn profile URL"
                  error={errors.linkedIn?.message}
                  register={register}
                />
                <FormInput
                  label="Portfolio / Website"
                  id="portfolio"
                  type="url"
                  placeholder="Enter your portfolio/website URL"
                  error={errors.portfolio?.message}
                  register={register}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  Upload CV/Resume <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`border-2 border-dashed ${
                      fileError ? 'border-red-300 bg-red-50' : cvFile ? 'border-green-300 bg-green-50' : 'border-slate-200 hover:border-amber-400'
                    } rounded-xl p-8 text-center transition-colors duration-200`}
                  >
                    {cvFile ? (
                      <>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-slate-900 font-medium">{cvFile.name}</p>
                        <p className="text-slate-500 text-sm mt-1">
                          {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        <p className="mt-3 text-slate-600">
                          <span className="text-amber-600 font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="mt-1 text-slate-400 text-sm">PDF, DOC, or DOCX (max. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
                {fileError && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {fileError}
                  </p>
                )}
              </div>

              <FormInput
                label="Cover Letter / Additional Information"
                id="coverLetter"
                textarea
                rows={5}
                placeholder="Tell us about yourself, your career goals, and what you're looking for in your next role..."
                error={errors.coverLetter?.message}
                register={register}
              />
            </div>
          </section>

          {/* Terms & Submit Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('termsAccepted')}
                  className="mt-1 h-5 w-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500 focus:ring-2 transition-colors"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  I agree to the{' '}
                  <a href="/terms" className="text-amber-600 hover:text-amber-700 underline underline-offset-2">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-amber-600 hover:text-amber-700 underline underline-offset-2">
                    Privacy Policy
                  </a>
                  . I consent to Shree Shyam Talent Solutions storing my data and contacting me about relevant opportunities.
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-sm text-red-500 flex items-center gap-1 ml-8">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.termsAccepted.message}
                </p>
              )}
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
                  Uploading...
                </span>
              ) : (
                'Submit Application'
              )}
            </Button>
          </section>
        </div>
      </form>
    </div>
  );
}
