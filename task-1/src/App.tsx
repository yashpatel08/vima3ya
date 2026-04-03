import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Formik, Form } from 'formik'
import type { FormikHelpers } from 'formik'
import Sidebar from './components/Sidebar'
import FormField from './components/FormField'
import FormSection from './components/FormSection'
import ShimmerLoader from './components/ShimmerLoader'


interface FormValues {
  // Section A — Personal Info
  firstName: string
  lastName: string
  dateOfBirth: string
  // Section B — Contact Details
  email: string
  phone: string
  address: string
  // Section C — Professional Info
  jobTitle: string
  company: string
  experience: string
  // Section D — Preferences
  department: string
  availability: string
  notes: string
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  address: '',
  jobTitle: '',
  company: '',
  experience: '',
  department: '',
  availability: '',
  notes: '',
}

function onFormComplete() {
  console.log('[onFormComplete] triggered — all fields valid ✓')
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [shimmerVisible, setShimmerVisible] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      let highest = 0
      sectionRefs.forEach((ref, i) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.6) {
          highest = Math.max(highest, i)
        }
      })
      setActiveSection(highest)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = useCallback((index: number) => {
    sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const triggerFormComplete = useCallback(() => {
    onFormComplete()
    setShimmerVisible(true)
    const timer = setTimeout(() => {
      setShimmerVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    console.log('Form submitted:', values)
    setSubmitSuccess(true)
    helpers.setSubmitting(false)
    triggerFormComplete()
  }

  return (
    <div className="min-h-screen bg-ink-950 font-body">
      <ShimmerLoader visible={shimmerVisible} />
      <Sidebar activeSection={activeSection} onNavClick={handleNavClick} />
      <main
        ref={scrollContainerRef}
        className="ml-64 min-h-screen"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={false}
        >
          {({ isValid, dirty, values, errors, submitCount }) => {
            const allFilled = Object.values(values).every((v) => v.trim() !== '')
            const noErrors = Object.keys(errors).length === 0
            const formComplete = allFilled && noErrors && dirty
            const prevComplete = useRef(false)
            useEffect(() => {
              if (formComplete && submitCount > 0) {
                if (!prevComplete.current) {
                  triggerFormComplete()
                }
                prevComplete.current = true
              } else {
                prevComplete.current = false
              }
            }, [formComplete, submitCount])

            return (
              <Form noValidate>
                <FormSection
                  id="section-a"
                  label="A"
                  title="Personal Information"
                  description="Tell us a bit about who you are."
                  sectionRef={sectionRefs[0]}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      name="firstName"
                      placeholder="e.g. Arjun"
                      validator="required"
                    />
                    <FormField
                      label="Last Name"
                      name="lastName"
                      placeholder="e.g. Sharma"
                      validator="required"
                    />
                  </div>
                  <FormField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    validator="required"
                    errorMessage="Please select your date of birth"
                  />
                </FormSection>

                <FormSection
                  id="section-b"
                  label="B"
                  title="Contact Details"
                  description="How can we reach you?"
                  sectionRef={sectionRefs[1]}
                >
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    validator="email"
                    errorMessage="Please enter a valid email address"
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    validator="phone"
                  />
                  <FormField
                    label="Street Address"
                    name="address"
                    type="textarea"
                    placeholder="Enter your full address..."
                    validator="required"
                  />
                </FormSection>

                <FormSection
                  id="section-c"
                  label="C"
                  title="Professional Info"
                  description="Share your work background."
                  sectionRef={sectionRefs[2]}
                >
                  <FormField
                    label="Job Title"
                    name="jobTitle"
                    placeholder="e.g. Frontend Engineer"
                    validator="required"
                  />
                  <FormField
                    label="Company / Organisation"
                    name="company"
                    placeholder="e.g. Vima3ya Pvt. Ltd."
                    validator="required"
                  />
                  <FormField
                    label="Years of Experience"
                    name="experience"
                    type="select"
                    placeholder="Select experience range"
                    validator="required"
                    errorMessage="Please select your experience level"
                    options={[
                      '0–1 years',
                      '1–3 years',
                      '3–5 years',
                      '5–10 years',
                      '10+ years',
                    ]}
                  />
                </FormSection>

                <FormSection
                  id="section-d"
                  label="D"
                  title="Preferences"
                  description="Help us personalise your experience."
                  sectionRef={sectionRefs[3]}
                >
                  <FormField
                    label="Preferred Department"
                    name="department"
                    type="select"
                    placeholder="Choose a department"
                    validator="required"
                    errorMessage="Please choose a department"
                    options={[
                      'Engineering',
                      'Design',
                      'Product',
                      'Marketing',
                      'Operations',
                    ]}
                  />
                  <FormField
                    label="Availability"
                    name="availability"
                    type="select"
                    placeholder="Select availability"
                    validator="required"
                    options={[
                      'Full-time',
                      'Part-time',
                      'Contract',
                      'Internship',
                    ]}
                  />
                  <FormField
                    label="Additional Notes"
                    name="notes"
                    type="textarea"
                    placeholder="Anything else you'd like us to know..."
                    validator="required"
                  />

                  <div className="pt-4 flex items-center gap-6">
                    <button
                      type="submit"
                      className="
                        relative px-8 py-3.5 rounded-lg font-body font-medium text-sm
                        bg-amber-500 text-ink-950 tracking-wide
                        hover:bg-amber-400 active:scale-[0.98]
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg shadow-amber-500/20
                      "
                    >
                      Submit Application
                    </button>

                    {submitSuccess && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
                          Submitted
                        </span>
                      </div>
                    )}

                    {formComplete && !submitSuccess && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs font-mono text-amber-400 tracking-wider uppercase">
                          Ready to submit
                        </span>
                      </div>
                    )}
                  </div>
                </FormSection>
              </Form>
            )
          }}
        </Formik>
      </main>
    </div>
  )
}

export default App