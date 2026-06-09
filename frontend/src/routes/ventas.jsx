import { useEffect, useState } from "react";
import { AppLayout, Icon } from "@/components/AppLayout";
import { FormModal, useToast } from "@/components/FormModal";
import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";

const clientes = [
  { name: "TechSolutions S.A.", id: "CLI-9042", contact: "Carlos Ruiz", status: "Activo" },
  { name: "Distribuidora Norte", id: "CLI-8821", contact: "Marta Gómez", status: "Activo" },
  { name: "Logística Global", id: "CLI-7740", contact: "Jorge Pardo", status: "Inactivo" },
  { name: "Construcciones S.A.", id: "CLI-6623", contact: "Ana Belén", status: "Activo" },
];

const pedidos = [
  {
    id: "#ORD-5540",
    cliente: "TechSolutions S.A.",
    fecha: "12 May 2024",
    estado: "Confirmado",
    total: "$12.450,00",
  },
  {
    id: "#ORD-5541",
    cliente: "Distribuidora Norte",
    fecha: "13 May 2024",
    estado: "Pendiente",
    total: "$3.200,00",
  },
  {
    id: "#ORD-5542",
    cliente: "ElectroMundo",
    fecha: "13 May 2024",
    estado: "Parcial",
    total: "$8.150,00",
  },
  {
    id: "#ORD-5543",
    cliente: "Construcciones S.A.",
    fecha: "14 May 2024",
    estado: "Confirmado",
    total: "$22.400,00",
  },
  {
    id: "#ORD-5544",
    cliente: "Alpha Corp",
    fecha: "14 May 2024",
    estado: "Pendiente",
    total: "$1.420,00",
  },
];

const estadoStyles = {
  Confirmado: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  Pendiente: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Parcial: "bg-purple-500/10 text-purple-700 border-purple-500/20",
};

export default function VentasPage() {
  useEffect(() => {
    document.title = "Ventas — Logistics Ops";
  }, []);
  const [clientOpen, setClientOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const toast = useToast();
  const { addPendingOrder } = useOrders();
  const { role, name } = useAuth();
  return (
    <AppLayout title="Ventas" subtitle="Clientes y pedidos">
      <div className="flex flex-col gap-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="bg-surface-container-lowest border border-surface-container-high p-lg rounded-xl shadow-sm flex flex-col gap-xs">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">
              Total Ventas
            </span>
            <span className="text-headline-sm text-on-surface">$42.850,00</span>
            <span className="flex items-center text-primary text-label-md font-bold">
              <Icon name="trending_up" className="!text-[16px]" /> +12.5% vs mes anterior
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-surface-container-high p-lg rounded-xl shadow-sm flex flex-col gap-xs">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">
              Pedidos Pendientes
            </span>
            <span className="text-headline-sm text-on-surface">14</span>
            <span className="flex items-center text-error text-label-md font-bold">
              <Icon name="priority_high" className="!text-[16px]" /> Requiere atención
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl shadow-sm flex flex-col">
          <div className="p-lg flex justify-between items-center border-b border-surface-container-high">
            <div>
              <h3 className="text-title-md text-on-surface">Clientes</h3>
              <p className="text-label-md text-on-surface-variant mt-xs">
                1.204 activos • 48 nuevos este mes
              </p>
            </div>
            <button
              onClick={() => setClientOpen(true)}
              className="bg-primary text-on-primary px-md py-2 rounded-lg text-label-lg flex items-center gap-xs hover:opacity-90 transition-all active:scale-95"
            >
              <Icon name="add" className="!text-[18px]" /> Nuevo cliente
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-lg py-md text-label-lg text-on-surface-variant border-b border-surface-container-high">
                    Cliente
                  </th>
                  <th className="px-lg py-md text-label-lg text-on-surface-variant border-b border-surface-container-high">
                    Contacto
                  </th>
                  <th className="px-lg py-md text-label-lg text-on-surface-variant border-b border-surface-container-high text-right">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {clientes.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <td className="px-lg py-md">
                      <div className="flex flex-col">
                        <span className="text-body-md font-semibold text-on-surface">{c.name}</span>
                        <span className="text-label-md text-on-surface-variant">ID: {c.id}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-body-md text-on-surface">{c.contact}</td>
                    <td className="px-lg py-md text-right">
                      <span
                        className={`inline-flex items-center px-sm py-[2px] rounded-full text-label-md border ${
                          c.status === "Activo"
                            ? "bg-green-500/10 text-green-700 border-green-500/20"
                            : "bg-surface-container-highest text-on-surface-variant border-outline-variant"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-md border-t border-surface-container-high bg-surface-container-low flex justify-center">
            <button className="text-primary text-label-lg hover:underline">
              Ver todos los clientes
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl shadow-sm flex flex-col">
          <div className="p-lg flex justify-between items-center border-b border-surface-container-high">
            <div className="flex flex-col">
              <h3 className="text-title-md text-on-surface">Pedidos de Venta</h3>
              <p className="text-label-md text-on-surface-variant">
                Últimas transacciones registradas
              </p>
            </div>
            <div className="flex gap-md">
              <button
                onClick={() => setOrderOpen(true)}
                className="bg-primary text-on-primary px-md py-2 rounded-lg text-label-lg flex items-center gap-xs hover:opacity-90"
              >
                <Icon name="add" className="!text-[18px]" /> Nuevo pedido
              </button>
              <button className="bg-surface-container-high text-on-surface-variant p-2 rounded-lg hover:bg-surface-variant transition-colors">
                <Icon name="filter_list" />
              </button>
              <button className="bg-surface-container-high text-on-surface-variant p-2 rounded-lg hover:bg-surface-variant transition-colors">
                <Icon name="download" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  {["Pedido #", "Cliente", "Fecha", "Estado", "Total"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-lg py-md text-label-lg text-on-surface-variant border-b border-surface-container-high ${i === 4 ? "text-right" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {pedidos.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-surface-container-low transition-colors cursor-pointer ${i % 2 ? "bg-surface-container-low/50" : ""}`}
                  >
                    <td className="px-lg py-md text-body-md font-semibold text-primary">{p.id}</td>
                    <td className="px-lg py-md text-body-md text-on-surface">{p.cliente}</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">{p.fecha}</td>
                    <td className="px-lg py-md">
                      <span
                        className={`inline-flex items-center px-sm py-[2px] rounded-full text-label-md border ${estadoStyles[p.estado]}`}
                      >
                        {p.estado}
                      </span>
                    </td>
                    <td className="px-lg py-md text-right text-title-md text-on-surface">
                      {p.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-md border-t border-surface-container-high bg-surface-container-low flex justify-between items-center px-lg">
            <span className="text-label-md text-on-surface-variant">
              Mostrando 5 de 142 pedidos
            </span>
            <div className="flex gap-sm">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant">
                <Icon name="chevron_left" className="!text-[20px]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant">
                <Icon name="chevron_right" className="!text-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <FormModal
        open={clientOpen}
        onClose={() => setClientOpen(false)}
        title="Nuevo cliente"
        subtitle="Completa los datos del nuevo cliente"
        submitLabel="Crear cliente"
        onSubmit={(d) => toast.show(`Cliente "${d.name}" creado`)}
        fields={[
          {
            name: "name",
            label: "Razón social",
            required: true,
            placeholder: "Ej. TechSolutions S.A.",
          },
          { name: "contact", label: "Contacto principal", required: true },
          { name: "email", label: "Correo electrónico", type: "email", required: true },
          { name: "phone", label: "Teléfono", type: "tel" },
          { name: "address", label: "Dirección" },
          { name: "status", label: "Estado", options: ["Activo", "Inactivo"], required: true },
        ]}
      />

      <FormModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        title="Nuevo pedido de venta"
        subtitle="Registra un pedido para un cliente"
        submitLabel="Crear pedido"
        onSubmit={(d) => {
          if (role === "operario") {
            addPendingOrder({
              type: "venta",
              cliente: d.cliente || "Sin cliente",
              monto: Number(d.total) || 0,
              fecha: d.fecha || new Date().toISOString().slice(0, 10),
              createdBy: name || "Operario",
              details: d,
            });
            toast.show(`Pedido enviado para aprobación del administrador`);
          } else {
            toast.show(`Pedido para ${d.cliente} creado`);
          }
        }}
        fields={[
          {
            name: "cliente",
            label: "Cliente",
            options: clientes.map((c) => c.name),
            required: true,
          },
          { name: "fecha", label: "Fecha de entrega", type: "date", required: true },
          { name: "producto", label: "Producto / SKU", required: true },
          { name: "cantidad", label: "Cantidad", type: "number", required: true },
          { name: "total", label: "Total ($)", type: "number", required: true },
          {
            name: "estado",
            label: "Estado",
            options: ["Pendiente", "Confirmado", "Parcial"],
            required: true,
          },
        ]}
      />

      {toast.node}
    </AppLayout>
  );
}
