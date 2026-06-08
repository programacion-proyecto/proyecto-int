import { useState } from "react";

export function FormModal({
  open,
  onClose,
  title,
  subtitle,
  fields,
  submitLabel = "Guardar",
  onSubmit,
}) {
  const [values, setValues] = useState({});

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit(values);
    setValues({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-lg border-b border-outline-variant flex justify-between items-start">
          <div>
            <h2 className="text-title-lg text-on-surface font-bold">{title}</h2>
            {subtitle && <p className="text-label-md text-on-surface-variant mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container-high rounded-full w-8 h-8 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={submit} className="p-lg space-y-md overflow-y-auto">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="text-label-md text-on-surface-variant">
                {f.label} {f.required && <span className="text-error">*</span>}
              </label>
              {f.options ? (
                <select
                  required={f.required}
                  value={values[f.name] || ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  className="mt-1 w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar...</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  required={f.required}
                  placeholder={f.placeholder}
                  value={values[f.name] || ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  className="mt-1 w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-md pt-md border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-lg py-2 rounded-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-on-primary px-lg py-2 rounded-lg text-label-lg hover:opacity-90"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function useToast() {
  const [msg, setMsg] = useState(null);
  const show = (m) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 3000);
  };
  const node = msg ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] bg-on-surface text-surface px-lg py-3 rounded-lg shadow-2xl text-label-lg">
      {msg}
    </div>
  ) : null;
  return { show, node };
}
