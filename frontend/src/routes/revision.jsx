import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppLayout, Icon } from "@/components/AppLayout";
import { useToast } from "@/components/FormModal";
import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";

function fmt(n) {
  return n.toLocaleString("es-AR", { style: "currency", currency: "USD" });
}

function Column({ title, icon, orders, onSelect }) {
  return (
    <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl shadow-sm flex flex-col">
      <div className="p-lg border-b border-surface-container-high flex items-center gap-md">
        <Icon name={icon} className="text-primary" />
        <div>
          <h3 className="text-title-md text-on-surface">{title}</h3>
          <p className="text-label-md text-on-surface-variant">
            {orders.length} pedido{orders.length === 1 ? "" : "s"} pendiente
            {orders.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-lg py-md text-label-lg text-on-surface-variant">Cliente</th>
              <th className="px-lg py-md text-label-lg text-on-surface-variant text-right">
                Monto
              </th>
              <th className="px-lg py-md text-label-lg text-on-surface-variant text-right">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high">
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-lg py-xl text-center text-on-surface-variant text-body-md"
                >
                  No hay pedidos pendientes
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-surface-container-low">
                <td className="px-lg py-md">
                  <div className="flex flex-col">
                    <span className="text-body-md font-semibold text-on-surface">{o.cliente}</span>
                    <span className="text-label-md text-on-surface-variant">{o.createdBy}</span>
                  </div>
                </td>
                <td className="px-lg py-md text-right text-body-md font-semibold text-on-surface">
                  {fmt(o.monto)}
                </td>
                <td className="px-lg py-md text-right">
                  <button
                    onClick={() => onSelect(o)}
                    className="text-primary hover:underline text-label-lg flex items-center gap-xs ml-auto"
                  >
                    <Icon name="visibility" className="!text-[18px]" /> Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RevisionPage() {
  useEffect(() => {
    document.title = "Revisión de pedidos — Logistics Ops";
  }, []);
  const { orders, setOrderStatus } = useOrders();
  const { role } = useAuth();
  const pendientes = orders.filter((o) => o.status === "pendiente");
  const ventas = pendientes.filter((o) => o.type === "venta");
  const compras = pendientes.filter((o) => o.type === "compra");
  const [selected, setSelected] = useState(null);
  const toast = useToast();
  if (role !== "admin") return <Navigate to="/" replace />;

  const decide = (status) => {
    if (!selected) return;
    setOrderStatus(selected.id, status);
    toast.show(`Pedido ${status}`);
    setSelected(null);
  };

  return (
    <AppLayout
      title="Revisión de pedidos"
      subtitle="Aprueba o rechaza pedidos generados por operarios"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <Column title="Pedidos de Venta" icon="sell" orders={ventas} onSelect={setSelected} />
        <Column
          title="Pedidos de Compra"
          icon="shopping_cart"
          orders={compras}
          onSelect={setSelected}
        />
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-lg border-b border-outline-variant flex justify-between items-start">
              <div>
                <h2 className="text-title-lg text-on-surface font-bold">
                  Detalle del pedido de {selected.type === "venta" ? "venta" : "compra"}
                </h2>
                <p className="text-label-md text-on-surface-variant mt-1">
                  {selected.id} • Generado por {selected.createdBy}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-on-surface-variant hover:bg-surface-container-high rounded-full w-8 h-8 flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-lg space-y-md overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="bg-surface-container-low rounded-lg p-md">
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider">
                    {selected.type === "venta" ? "Cliente" : "Proveedor"}
                  </p>
                  <p className="text-body-lg text-on-surface font-semibold">{selected.cliente}</p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-md">
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider">
                    Monto
                  </p>
                  <p className="text-body-lg text-on-surface font-semibold">
                    {fmt(selected.monto)}
                  </p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-md">
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider">
                    Fecha
                  </p>
                  <p className="text-body-lg text-on-surface">{selected.fecha}</p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-md">
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider">
                    Tipo
                  </p>
                  <p className="text-body-lg text-on-surface capitalize">{selected.type}</p>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-md">
                <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">
                  Datos completos
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {Object.entries(selected.details).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between border-b border-outline-variant/40 py-1"
                    >
                      <span className="text-label-md text-on-surface-variant capitalize">{k}</span>
                      <span className="text-body-md text-on-surface">{v || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-lg border-t border-outline-variant flex justify-end gap-md">
              <button
                onClick={() => decide("rechazado")}
                className="px-lg py-2 rounded-lg text-label-lg bg-error/10 text-error hover:bg-error/20 flex items-center gap-xs"
              >
                <Icon name="close" className="!text-[18px]" /> Rechazar
              </button>
              <button
                onClick={() => decide("aprobado")}
                className="px-lg py-2 rounded-lg text-label-lg bg-primary text-on-primary hover:opacity-90 flex items-center gap-xs"
              >
                <Icon name="check" className="!text-[18px]" /> Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
      {toast.node}
    </AppLayout>
  );
}
