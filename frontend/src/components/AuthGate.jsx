import { useEffect, useState } from "react";
import { ACCOUNTS, useAuth } from "@/context/AuthContext";

export function AuthGate({ children }) {
  const { authed, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (authed === null) return null;

  const submit = (e) => {
    e.preventDefault();
    const role = login(email, password);
    if (role) {
      setError("");
    } else {
      setError("Credenciales incorrectas. Revisa los datos al pie.");
    }
  };

  if (!authed) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.25), transparent 60%)",
        }}
      >
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-3xl shadow-2xl border border-outline-variant w-full max-w-3xl overflow-hidden">
          <div className="p-lg border-b border-outline-variant bg-surface-container-low">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <div>
                <h1 className="text-title-lg font-bold text-primary">Logistics Ops</h1>
                <p className="text-label-md text-on-surface-variant">
                  Inicia sesión para continuar
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="p-lg space-y-md">
            <div>
              <label className="text-label-md text-on-surface-variant">Correo electrónico</label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-label-md text-on-surface-variant">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            {error && <p className="text-error text-label-md">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-2.5 rounded-lg text-label-lg hover:opacity-90 transition-opacity"
            >
              Ingresar
            </button>
          </form>
          <div className="px-lg pb-lg pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {ACCOUNTS.map((a) => (
                <div
                  key={a.email}
                  className="bg-surface-container rounded-lg p-md border border-dashed border-outline-variant"
                >
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
                    Cuenta {a.role}
                  </p>
                  <p className="text-body-md text-on-surface">
                    <strong>Email:</strong> {a.email}
                  </p>
                  <p className="text-body-md text-on-surface">
                    <strong>Contraseña:</strong> {a.password}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
