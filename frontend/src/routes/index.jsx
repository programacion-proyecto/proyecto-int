import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout, Icon } from "@/components/AppLayout";

export default function Index() {
  useEffect(() => {
    document.title = "Inicio — Logistics Ops";
  }, []);
  return <IndexInner />;
}

function StatCard({ title, icon, iconColor, value, caption, children }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-sm flex flex-col overflow-hidden">
      <div className="p-lg flex justify-between items-center border-b border-surface-container">
        <div className={`flex items-center gap-sm ${iconColor}`}>
          <Icon name={icon} />
          <h3 className="text-title-md text-on-surface">{title}</h3>
        </div>
        <a className="text-primary text-label-md hover:underline" href="#">
          Ver todo
        </a>
      </div>
      <div className="flex-1 p-lg">
        <div className="mb-lg">
          <span className="text-display-lg text-on-surface">{value}</span>
          <p className="text-label-md text-on-surface-variant flex items-center gap-1 mt-xs">
            {caption}
          </p>
        </div>
        <div className="space-y-md">{children}</div>
      </div>
    </div>
  );
}

function MoveRow({ title, sub, badge, badgeColor }) {
  return (
    <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors">
      <div className="flex flex-col">
        <span className="text-label-lg text-on-surface">{title}</span>
        <span className="text-body-md text-on-surface-variant">{sub}</span>
      </div>
      {badge && (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function Notification({ icon, iconBg, iconColor, title, sub, urgent }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-md bg-surface-container-low rounded-lg border border-outline-variant/40 gap-md">
      <div className="flex items-center gap-md">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}
        >
          <Icon name={icon} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-label-lg text-on-surface">{title}</span>
            {urgent && (
              <span className="text-[10px] bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold uppercase">
                Urgente
              </span>
            )}
          </div>
          <p className="text-body-md text-on-surface-variant">{sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-sm">
        <button className="px-lg py-2 text-label-lg text-primary hover:bg-primary/5 rounded-full transition-colors border border-primary/20">
          Revisar
        </button>
        <div className="flex gap-xs">
          <button
            className="w-10 h-10 flex items-center justify-center text-error hover:bg-error/10 rounded-full transition-colors"
            title="Rechazar"
          >
            <Icon name="close" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-full hover:shadow-lg transition-all"
            title="Aprobar"
          >
            <Icon name="check" />
          </button>
        </div>
      </div>
    </div>
  );
}

function IndexInner() {
  return (
    <AppLayout title="Inicio" subtitle="Resumen general">
      <div className="space-y-xl">
        <section className="flex flex-col gap-xs">
          <h2 className="text-headline-sm text-primary">Resumen General</h2>
          <p className="text-body-md text-on-surface-variant">
            Bienvenido de nuevo. Aquí tienes el estado actual de tus operaciones logísticas.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <StatCard
            title="Ventas"
            icon="sell"
            iconColor="text-primary"
            value="$24.5k"
            caption={
              <>
                <Icon name="trending_up" className="!text-[14px] text-green-600" />
                <span className="text-green-600 font-bold">+12%</span> desde ayer
              </>
            }
          >
            <p className="text-label-lg text-on-surface-variant border-b border-outline-variant pb-xs">
              Movimientos más recientes
            </p>
            <MoveRow
              title="Orden #8821"
              sub="Global Logistics S.A."
              badge="En Ruta"
              badgeColor="bg-blue-100 text-blue-800"
            />
            <MoveRow
              title="Orden #8819"
              sub="FastTrack Services"
              badge="Entregado"
              badgeColor="bg-green-100 text-green-800"
            />
          </StatCard>

          <StatCard
            title="Compras"
            icon="shopping_cart"
            iconColor="text-tertiary"
            value="18"
            caption={<>Órdenes pendientes de recepción</>}
          >
            <p className="text-label-lg text-on-surface-variant border-b border-outline-variant pb-xs">
              Movimientos más recientes
            </p>
            <MoveRow
              title="PO-2024-045"
              sub="Tech Supply Corp"
              badge="Pendiente"
              badgeColor="bg-amber-100 text-amber-800"
            />
            <MoveRow
              title="PO-2024-044"
              sub="Industrial Parts SL"
              badge="Embarcado"
              badgeColor="bg-blue-100 text-blue-800"
            />
          </StatCard>

          <StatCard
            title="Stock"
            icon="inventory_2"
            iconColor="text-secondary"
            value="94%"
            caption={<>Capacidad de almacén utilizada</>}
          >
            <p className="text-label-lg text-on-surface-variant border-b border-outline-variant pb-xs">
              Alertas e inventario
            </p>
            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-error-container/10 transition-colors">
              <div className="flex flex-col">
                <span className="text-label-lg text-error">Stock Crítico: SKA-22</span>
                <span className="text-body-md text-on-surface-variant">
                  Almacén Central - Pasillo 4
                </span>
              </div>
              <Icon name="warning" className="text-error" />
            </div>
            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex flex-col">
                <span className="text-label-lg text-on-surface">Ingreso: Palet B-102</span>
                <span className="text-body-md text-on-surface-variant">Muelle de Carga 03</span>
              </div>
              <Icon name="add_box" className="text-primary" />
            </div>
          </StatCard>
        </div>

        <section className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-lg shadow-sm">
          <div className="flex items-center justify-between mb-lg border-b border-surface-container pb-md">
            <div className="flex items-center gap-sm">
              <Icon name="task_alt" className="text-primary" />
              <h3 className="text-title-lg text-on-surface">Notificaciones y Aprobaciones</h3>
            </div>
            <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-md font-bold">
              4 Pendientes
            </span>
          </div>
          <div className="space-y-md">
            <Notification
              icon="sell"
              iconBg="bg-primary/10"
              iconColor="text-primary"
              title="Venta: Orden #8840"
              sub="Cliente: Distribuciones Norte S.L. • $4,200.00"
              urgent
            />
            <Notification
              icon="shopping_cart"
              iconBg="bg-tertiary-container/30"
              iconColor="text-tertiary"
              title="Compra: PO-2024-058"
              sub="Proveedor: Tech Logistics Solutions • Repuestos Motor"
            />
            <Notification
              icon="sell"
              iconBg="bg-primary/10"
              iconColor="text-primary"
              title="Venta: Orden #8835"
              sub="Cliente: Retail Express • Solicitud de Crédito"
            />
            <Notification
              icon="inventory_2"
              iconBg="bg-secondary-container/40"
              iconColor="text-secondary"
              title="Stock: Reabastecimiento M-12"
              sub="Almacén Norte • Solicitud de transferencia"
            />
          </div>
          <div className="mt-md flex justify-end">
            <Link to="/ventas" className="text-primary text-label-lg hover:underline">
              Ir a Ventas →
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
