import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useId, isValidElement, cloneElement } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { enquiryApi } from '@/services/api';
import { cn } from '@/lib/utils';

// ---- Validation schemas ----

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const demoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  productOfInterest: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more about your requirements'),
});

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  productOfInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, 'Please describe your requirements'),
});

type ContactFormData = z.infer<typeof contactSchema>;
type DemoFormData = z.infer<typeof demoSchema>;
type QuoteFormData = z.infer<typeof quoteSchema>;

// ---- Shared form field components ----

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function FormField({ label, error, required, className, children }: FieldProps) {
  const id = useId();
  const control = isValidElement<{ id?: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string; 'aria-required'?: boolean }>(children)
    ? cloneElement(children, { id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined, 'aria-required': required || undefined })
    : children;
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      {control}
      {error && <p id={`${id}-error`} className="form-error" role="alert">{error}</p>}
    </div>
  );
}

// ---- Success Message ----

interface SuccessMessageProps {
  title: string;
  message: string;
}

function SuccessMessage({ title, message }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(46, 204, 113, 0.15)', border: '1px solid rgba(46, 204, 113, 0.3)' }}
      >
        <CheckCircle className="w-8 h-8 text-[#2ECC71]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--heading)] mb-2">{title}</h3>
      <p className="text-[var(--copy)] leading-relaxed">{message}</p>
    </div>
  );
}

// ==========================================
// CONTACT FORM
// ==========================================

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    await enquiryApi.submitEnquiry({ ...data, enquiryType: 'CONTACT' });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessMessage
        title="Message Received"
        message="Thank you for reaching out. Our team will be in touch with you shortly."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" id="contact-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            className={cn('form-input', errors.name && 'border-red-400 focus:border-red-400 focus:ring-red-200')}
            placeholder="Your name"
            autoComplete="name"
          />
        </FormField>
        <FormField label="Company" error={errors.company?.message}>
          <input
            {...register('company')}
            type="text"
            className="form-input"
            placeholder="Company name"
            autoComplete="organization"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Email Address" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            className={cn('form-input', errors.email && 'border-red-400')}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </FormField>
        <FormField label="Phone Number" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </FormField>
      </div>
      <FormField label="Subject" error={errors.subject?.message} required>
        <input
          {...register('subject')}
          type="text"
          className={cn('form-input', errors.subject && 'border-red-400')}
          placeholder="How can we help?"
        />
      </FormField>
      <FormField label="Message" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={5}
          className={cn('form-textarea', errors.message && 'border-red-400')}
          placeholder="Tell us about your requirements..."
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center py-3.5 text-base"
        id="contact-form-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

// ==========================================
// REQUEST DEMO FORM
// ==========================================

export function RequestDemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormData>({ resolver: zodResolver(demoSchema) });

  const onSubmit = async (data: DemoFormData) => {
    await enquiryApi.submitEnquiry({ ...data, enquiryType: 'DEMO' });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessMessage
        title="Demo Request Received"
        message="Thank you. Your demo request has been received. Our team will contact you to arrange a suitable time."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" id="demo-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            className={cn('form-input', errors.name && 'border-red-400')}
            placeholder="Your name"
            autoComplete="name"
          />
        </FormField>
        <FormField label="Company" error={errors.company?.message} required>
          <input
            {...register('company')}
            type="text"
            className={cn('form-input', errors.company && 'border-red-400')}
            placeholder="Company name"
            autoComplete="organization"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Email Address" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            className={cn('form-input', errors.email && 'border-red-400')}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </FormField>
        <FormField label="Phone Number" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </FormField>
      </div>
      <FormField label="Product / Solution Interest" error={errors.productOfInterest?.message}>
        <select {...register('productOfInterest')} className="form-input">
          <option value="">Select a product or solution...</option>
          <optgroup label="Software">
            <option value="VtestIMS">VtestIMS</option>
            <option value="VtestAnalytics">VtestAnalytics</option>
            <option value="VtestConnect">VtestConnect</option>
          </optgroup>
          <optgroup label="Hardware">
            <option value="VtestLane Controller">VtestLane Controller</option>
            <option value="VtestSense Module">VtestSense Module</option>
          </optgroup>
          <optgroup label="Solutions">
            <option value="Vehicle Inspection">Vehicle Inspection</option>
            <option value="End-of-Line Testing">End-of-Line Testing</option>
            <option value="Test Lane Management">Test Lane Management</option>
            <option value="Equipment Integration">Equipment Integration</option>
            <option value="Compliance & Analytics">Compliance & Analytics</option>
          </optgroup>
          <option value="General">General Enquiry</option>
        </select>
      </FormField>
      <FormField label="Additional Information" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={4}
          className={cn('form-textarea', errors.message && 'border-red-400')}
          placeholder="Tell us about your facility, current setup, and what you'd like to see in a demo..."
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center py-3.5 text-base"
        id="demo-form-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request a Demo'
        )}
      </button>

      <p className="text-xs text-center text-[var(--muted)]">
        We'll be in touch to arrange a suitable time for your demonstration.
      </p>
    </form>
  );
}

// ==========================================
// REQUEST QUOTE FORM
// ==========================================

export function RequestQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({ resolver: zodResolver(quoteSchema) });

  const onSubmit = async (data: QuoteFormData) => {
    await enquiryApi.submitEnquiry({ ...data, enquiryType: 'QUOTE' });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessMessage
        title="Quote Request Received"
        message="Thank you. We have received your quote request and will prepare a response based on your requirements."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" id="quote-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            className={cn('form-input', errors.name && 'border-red-400')}
            placeholder="Your name"
            autoComplete="name"
          />
        </FormField>
        <FormField label="Company" error={errors.company?.message} required>
          <input
            {...register('company')}
            type="text"
            className={cn('form-input', errors.company && 'border-red-400')}
            placeholder="Company name"
            autoComplete="organization"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Email Address" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            className={cn('form-input', errors.email && 'border-red-400')}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </FormField>
        <FormField label="Phone Number" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Product / Solution" error={errors.productOfInterest?.message}>
          <select {...register('productOfInterest')} className="form-input">
            <option value="">Select a product...</option>
            <optgroup label="Software">
              <option value="VtestIMS">VtestIMS</option>
              <option value="VtestAnalytics">VtestAnalytics</option>
              <option value="VtestConnect">VtestConnect</option>
            </optgroup>
            <optgroup label="Hardware">
              <option value="VtestLane Controller">VtestLane Controller</option>
              <option value="VtestSense Module">VtestSense Module</option>
            </optgroup>
            <option value="Complete Solution">Complete Integrated Solution</option>
          </select>
        </FormField>
        <FormField label="Quantity / Scale" error={errors.quantity?.message}>
          <input
            {...register('quantity')}
            type="text"
            className="form-input"
            placeholder="e.g. 2 units, 5 lanes, 1 site"
          />
        </FormField>
      </div>
      <FormField label="Requirements & Details" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={5}
          className={cn('form-textarea', errors.message && 'border-red-400')}
          placeholder="Describe your requirements, deployment context, timeline, and any specific needs..."
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center py-3.5 text-base"
        id="quote-form-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request a Quote'
        )}
      </button>
    </form>
  );
}
