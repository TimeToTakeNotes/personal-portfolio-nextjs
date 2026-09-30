import * as React from "react"

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  disabled?: boolean
  as?: "input" | "textarea"
  rows?: number
  /** Browser autofill hint, for example "email" or "given-name" */
  autoComplete?: string
}

/**
 * Field - form control with the label above and an underline-only input.
 */
export function Field({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  as = "input",
  rows = 4,
  autoComplete,
}: FieldProps) {
  const shared = {
    id: name,
    name,
    required,
    disabled,
    autoComplete,
    className: "field-input disabled:cursor-not-allowed disabled:opacity-50",
  }

  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {required && (
          <span aria-hidden="true" className="text-primary">
            {" "}*
          </span>
        )}
      </label>
      {as === "textarea" ? (
        <textarea {...shared} rows={rows} className={`${shared.className} resize-none`} />
      ) : (
        <input {...shared} type={type} />
      )}
    </div>
  )
}
