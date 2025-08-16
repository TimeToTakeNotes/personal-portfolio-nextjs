import React, { forwardRef } from "react";

const FloatingInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  { label: string; name: string; type?: string; required?: boolean; as?: "input" | "textarea"; rows?: number }
>(({ label, name, type = "text", required = false, as = "input", rows }, ref) => {
  if (as === "textarea") {
    return (
      <div className="relative input-group">
        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows || 4}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className="peer input-field resize-none"
          placeholder=" "
          aria-autocomplete="none"
          autoComplete="off"
        />
        <label htmlFor={name} className="floating-label">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="relative input-group">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        ref={ref as React.Ref<HTMLInputElement>}
        className="peer input-field"
        placeholder=" "
        autoComplete="off"
      />
      <label htmlFor={name} className="floating-label">
        {label}
      </label>
    </div>
  );
});

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;