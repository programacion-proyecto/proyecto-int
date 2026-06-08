import { useEffect, useState } from "react";
import { AppLayout, Icon } from "@/components/AppLayout";
import { FormModal, useToast } from "@/components/FormModal";
import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";

const proveedores = [
  { name: "Global Tech S.A.", contact: "marcos.l@tech.com", status: "Activo" },
  { name: "InduTrade Co.", contact: "ventas@indutrade.es", status: "En evaluación" },
  { name: "LogiParts Ltd.", contact: "support@logiparts.io", status: "Activo" },
  { name: "FastMove Supplies", contact: "ana.g@fastmove.com", status: "Activo" },
];

const pedidos = [
  {
    id: "PO-8821",
    proveedor: "Global Tech S.A.",
    fecha: "24/05/2024",
    estado: "Aceptado por proveedor",
  },
  { id: "PO-8819", proveedor: "LogiParts Ltd.", fecha: "22/05/2024", estado: "Enviado" },
  { id: "PO-8818", proveedor: "InduTrade Co.", fecha: "21/05/2024", estado: "Pendiente" },
  { id: "PO-8817", proveedor: "FastMove Supplies", fecha: "20/05/2024", estado: "Enviado" },
  {
    id: "PO-8815",
    proveedor: "Global Tech S.A.",
    fecha: "19/05/2024",
    estado: "Aceptado por proveedor",
  },
];

const estadoStyles = {
  Activo: "bg-green-500/10 text-green-700",
  "En evaluación": "bg-amber-500/10 text-amber-700",
  Enviado: "bg-green-500/10 text-green-700",
  Pendiente: "bg-amber-500/10 text-amber-700",
  "Aceptado por proveedor": "bg-blue-500/10 text-blue-700",
};

export default function ComprasPage() {
  useEffect(() => {
    document.title = "Compras — Logistics Ops";
  }, []);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const toast = useToast();
  const { addPendingOrder } = useOrders();
  const { role, name } = useAuth();
  return (
    <AppLayout title="Compras" subtitle="Proveedores y pedidos">
      <div className="space-y-xl max-w-7xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-headline-lg text-on-surface">Compras</h1>
            <p className="text-body-lg text-on-surface-variant">Proveedores y pedidos</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-gutter">
          <section className="col-span-12 xl:col-span-5">
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
              <div className="p-lg flex justify-between items-center border-b border-outline-variant bg-surface-bright">
                <h3 className="text-title-md">Proveedores</h3>
                <button className="text-primary hover:bg-primary/5 px-md py-sm rounded-lg flex items-center gap-xs">
                  <Icon name="person_add" className="!text-[18px]" />
                  <span className="text-label-md">+ Nuevo proveedor</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-lg py-md text-label-lg text-on-surface-variant">
                        Proveedor
                      </th>
                      <th className="px-lg py-md text-label-lg text-on-surface-variant">
                        Contacto
                      </th>
                      <th className="px-lg py-md text-label-lg text-on-surface-variant">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {proveedores.map((p, i) => (
                      <tr
                        key={p.name}
                        className={`hover:bg-surface-container-low transition-colors ${i % 2 ? "bg-surface-container-low/30" : ""}`}
                      >
                        <td className="px-lg py-md text-body-md">{p.name}</td>
                        <td className="px-lg py-md text-body-md">{p.contact}</td>
                        <td className="px-lg py-md">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-[12px] font-bold ${estadoStyles[p.status]}`}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="col-span-12 xl:col-span-7">
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant bg-surface-bright flex justify-between items-center">
                <h3 className="text-title-md">Pedidos de compra</h3>
                <Icon name="filter_list" className="text-on-surface-variant cursor-pointer" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      {["Pedido #", "Proveedor", "Fecha", "Estado"].map((h) => (
                        <th key={h} className="px-lg py-md text-label-lg text-on-surface-variant">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {pedidos.map((p, i) => (
                      <tr
                        key={p.id}
                        className={`hover:bg-surface-container-low transition-colors ${i % 2 ? "bg-surface-container-low/30" : ""}`}
                      >
                        <td className="px-lg py-md text-body-md font-bold">{p.id}</td>
                        <td className="px-lg py-md text-body-md">{p.proveedor}</td>
                        <td className="px-lg py-md text-body-md text-on-surface-variant">
                          {p.fecha}
                        </td>
                        <td className="px-lg py-md">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-[12px] font-bold ${estadoStyles[p.estado]}`}
                          >
                            {p.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-md flex justify-end border-t border-outline-variant bg-surface-bright">
                <div className="flex items-center gap-md text-label-md text-on-surface-variant">
                  <span>Filas por página: 10</span>
                  <span>1-5 de 24</span>
                  <div className="flex gap-xs">
                    <button className="hover:bg-surface-container-high rounded p-1">
                      <Icon name="chevron_left" />
                    </button>
                    <button className="hover:bg-surface-container-high rounded p-1">
                      <Icon name="chevron_right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-primary-container p-lg rounded-xl text-on-primary-container shadow-sm border border-primary/10">
            <div className="flex justify-between items-start mb-md">
              <Icon name="account_balance_wallet" className="!text-[32px]" />
              <span className="text-label-md bg-white/20 px-2 py-1 rounded">+12%</span>
            </div>
            <h4 className="text-title-md opacity-90">Gasto Total Mes</h4>
            <p className="text-headline-sm font-bold">$42.850,00</p>
          </div>
          {[
            { icon: "local_shipping", title: "Pedidos en camino", value: "18" },
            { icon: "assignment_late", title: "Acciones pendientes", value: "4" },
            { icon: "verified", title: "Cumplimiento SLA", value: "94.2%" },
          ].map((k) => (
            <div
              key={k.title}
              className="bg-surface-container-highest p-lg rounded-xl shadow-sm border border-outline-variant"
            >
              <div className="flex justify-between items-start mb-md">
                <Icon name={k.icon} className="!text-[32px] text-primary" />
              </div>
              <h4 className="text-title-md text-on-surface-variant">{k.title}</h4>
              <p className="text-headline-sm font-bold text-on-surface">{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setPurchaseOpen(true)}
        className="fixed bottom-margin right-margin bg-primary text-on-primary h-14 px-lg rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-md z-50"
      >
        <Icon name="add" />
        <span className="text-label-lg">Registrar Compra</span>
      </button>
      <FormModal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        title="Registrar compra"
        subtitle="Registra una compra recibida"
        submitLabel="Registrar"
        onSubmit={(d) => {
          if (role === "operario") {
            addPendingOrder({
              type: "compra",
              cliente: d.proveedor || "Sin proveedor",
              monto: Number(d.monto) || 0,
              fecha: d.fecha || new Date().toISOString().slice(0, 10),
              createdBy: name || "Operario",
              details: d,
            });
            toast.show(`Compra enviada para aprobación del administrador`);
          } else {
            toast.show(`Compra de ${d.proveedor} registrada`);
          }
        }}
        fields={[
          {
            name: "proveedor",
            label: "Proveedor",
            options: proveedores.map((p) => p.name),
            required: true,
          },
          { name: "factura", label: "N° de factura", required: true },
          { name: "fecha", label: "Fecha", type: "date", required: true },
          { name: "monto", label: "Monto total ($)", type: "number", required: true },
          {
            name: "metodo",
            label: "Método de pago",
            options: ["Transferencia", "Cheque", "Efectivo", "Crédito"],
            required: true,
          },
          { name: "notas", label: "Notas" },
        ]}
      />

      {toast.node}
    </AppLayout>
  );
}
