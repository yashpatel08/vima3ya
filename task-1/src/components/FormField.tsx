import React from 'react'
import { useField, useFormikContext } from 'formik'

type ValidatorType = 'email' | 'phone' | 'required'

function runValidator(value: string, type: ValidatorType): string | undefined {
    const trimmed = value?.trim() ?? ''

    if (type === 'required') {
        return trimmed === '' ? undefined : undefined
    }
    if (type === 'email') {
        if (trimmed === '') return undefined
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        return valid ? undefined : 'Please enter a valid email address'
    }
    if (type === 'phone') {
        if (trimmed === '') return undefined
        const valid = /^[+]?[\d\s\-().]{7,15}$/.test(trimmed)
        return valid ? undefined : 'Please enter a valid phone number'
    }
    return undefined
}

interface FormFieldProps {
    label: string
    name: string
    type?: 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select'
    placeholder?: string
    validator?: ValidatorType
    errorMessage?: string
    options?: string[] // for select
}


const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    validator,
    errorMessage,
    options = [],
}) => {
    const { submitCount } = useFormikContext()

    const validate = (value: string) => {
        const trimmed = value?.trim() ?? ''
        if (trimmed === '') {
            return errorMessage ?? 'This field is required'
        }
        if (validator) {
            const msg = runValidator(value, validator)
            if (msg) return errorMessage ?? msg
        }
        return undefined
    }

    const [field, meta] = useField({ name, validate })

    const showError = submitCount > 0 && meta.touched && !!meta.error

    const baseInputClasses = `
    w-full px-4 py-3 rounded-lg text-sm font-body
    bg-ink-900 border transition-all duration-200 outline-none
    placeholder:text-ink-600 text-ink-100
    focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60
    ${showError
            ? 'border-red-500/60 bg-red-950/20'
            : 'border-ink-700 hover:border-ink-500'
        }
  `

    return (
        <div className="flex flex-col gap-1.5 animate-fadeIn">
            <label
                htmlFor={name}
                className="text-xs font-mono font-medium tracking-widest uppercase text-ink-400"
            >
                {label}
            </label>

            {type === 'textarea' ? (
                <textarea
                    {...field}
                    id={name}
                    placeholder={placeholder}
                    rows={3}
                    className={`${baseInputClasses} resize-none`}
                />
            ) : type === 'select' ? (
                <select
                    {...field}
                    id={name}
                    className={`${baseInputClasses} cursor-pointer`}
                >
                    <option value="" disabled>
                        {placeholder ?? 'Select an option'}
                    </option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...field}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className={baseInputClasses}
                />
            )}

            {/* Error message — only shown after submit */}
            <div className={`min-h-[18px] transition-all duration-200`}>
                {showError && (
                    <p className="text-xs text-red-400 font-mono animate-fadeIn flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        {meta.error}
                    </p>
                )}
            </div>
        </div>
    )
}

export default FormField