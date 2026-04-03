
import React from 'react'

interface FormSectionProps {
    id: string
    label: string // e.g. "A"
    title: string
    description: string
    children: React.ReactNode
    sectionRef: React.RefObject<HTMLDivElement | null>
}

const FormSection: React.FC<FormSectionProps> = ({
    id,
    label,
    title,
    description,
    children,
    sectionRef,
}) => {
    return (
        <section
            id={id}
            ref={sectionRef}
            className="min-h-screen py-16 px-12 border-b border-ink-800/40 scroll-mt-8"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-amber-500/40 bg-amber-500/10">
                    <span className="font-display text-amber-400 text-lg">{label}</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
            </div>

            <div className="mb-10">
                <p className="text-xs font-mono tracking-[0.3em] uppercase text-ink-500 mb-2">
                    Section {label}
                </p>
                <h2 className="font-display text-3xl text-ink-50 mb-2">{title}</h2>
                <p className="text-sm font-body text-ink-500">{description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-2xl">
                {children}
            </div>
        </section>
    )
}

export default FormSection