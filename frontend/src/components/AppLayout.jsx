import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const baseNav = [
  { to: "/", label: "Inicio", icon: "home" },
  { to: "/ventas", label: "Ventas", icon: "sell" },
  { to: "/compras", label: "Compras", icon: "shopping_cart" },
  { to: "/stock", label: "Stock", icon: "inventory_2" },
];

function Icon({ name, className = "", filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

export function AppLayout({ title, subtitle, children }) {
  const { pathname } = useLocation();
  const { role, name: userName, logout } = useAuth();
  const nav =
    role === "admin"
      ? [...baseNav, { to: "/revision", label: "Revisión de pedidos", icon: "fact_check" }]
      : baseNav;
  const initials =
    userName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    window.location.reload();
  };
  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <aside className="fixed left-0 top-0 h-screen w-[280px] z-50 bg-surface-container-low border-r border-outline-variant flex flex-col py-lg">
        <div className="px-lg mb-xl">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
              <Icon name="hub" />
            </div>
            <div>
              <h1 className="text-title-lg font-bold text-primary">Logistics Ops</h1>
              <p className="text-label-md text-on-surface-variant">Admin Console</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-xs">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  active
                    ? "flex items-center gap-md px-lg py-md text-primary border-l-4 border-primary bg-secondary-container/40 transition-all"
                    : "flex items-center gap-md px-lg py-md text-on-surface-variant hover:bg-surface-container-high transition-colors border-l-4 border-transparent"
                }
              >
                <Icon name={item.icon} filled={active} />
                <span className="text-label-lg">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-outline-variant pt-md">
          <a
            className="flex items-center gap-md px-lg py-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
            href="#"
          >
            <Icon name="help" />
            <span className="text-label-lg">Support</span>
          </a>
          <a
            onClick={handleLogout}
            className="flex items-center gap-md px-lg py-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            href="#"
          >
            <Icon name="logout" />
            <span className="text-label-lg">Logout</span>
          </a>
        </div>
      </aside>

      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        <header className="bg-surface border-b border-outline-variant flex justify-between items-center h-16 w-full px-lg sticky top-0 z-40">
          <div className="flex items-center gap-md">
            <div className="flex flex-col">
              <h2 className="text-title-md font-bold text-on-surface">{title}</h2>
              {subtitle && (
                <span className="text-[12px] leading-tight text-on-surface-variant">
                  {subtitle}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="relative hidden md:flex">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant !text-[20px]"
              />
              <input
                className="bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-body-md focus:outline-none focus:ring-2 focus:ring-primary w-64"
                placeholder="Buscar..."
                type="text"
              />
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant">
              <Icon name="notifications" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant">
              <Icon name="settings" />
            </button>
            <div className="h-8 w-px bg-outline-variant mx-2" />
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-label-md">
                {initials}
              </div>
              <span className="text-label-lg text-on-surface hidden sm:block">
                {userName || "Usuario"}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-lg">{children}</main>
      </div>
    </div>
  );
}

export { Icon };
