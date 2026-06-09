import { useEffect } from "react";
import { AppLayout, Icon } from "@/components/AppLayout";

const productos = [
  {
    name: "Microprocesador X1",
    sku: "MP-X1-2024",
    icon: "package_2",
    cat: "Electrónica",
    actual: "2,450",
    res: "300",
    pte: "50",
    disp: "2,100",
    dispCls: "text-green-700 bg-green-50",
    mov: "Hoy, 10:45 AM",
  },
  {
    name: "Módulo Memoria 16GB",
    sku: "RAM-16G-D5",
    icon: "memory",
    cat: "Hardware",
    actual: "1,200",
    res: "150",
    pte: "20",
    disp: "1,030",
    dispCls: "text-green-700 bg-green-50",
    mov: "Ayer, 16:20 PM",
  },
  {
    name: "Router Industrial G5",
    sku: "NET-G5-IND",
    icon: "router",
    cat: "Redes",
    actual: "150",
    res: "140",
    pte: "0",
    disp: "10",
    dispCls: "text-amber-700 bg-amber-50",
    mov: "24 May 2024",
  },
  {
    name: "Cable Fibra 10m",
    sku: "CAB-FIB-10",
    icon: "cable",
    cat: "Accesorios",
    actual: "5,000",
    res: "2,000",
    pte: "1,500",
    disp: "1,500",
    dispCls: "text-green-700 bg-green-50",
    mov: "23 May 2024",
  },
  {
    name: "Sensor Temperatura S1",
    sku: "SEN-T1-PRO",
    icon: "sensors",
    cat: "Sensores",
    actual: "20",
    res: "18",
    pte: "5",
    disp: "-3",
    dispCls: "text-red-700 bg-red-50",
    mov: "22 May 2024",
  },
];

export default function StockPage() {
  useEffect(() => {
    document.title = "Stock — Logistics Ops";
  }, []);
  return (
    <AppLayout title="Stock" subtitle="Inventario de productos">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-lg">
          <h1 className="text-headline-lg text-on-surface">Stock</h1>
          <p className="text-body-md text-on-surface-variant">Inventario de productos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
          {[
            {
              icon: "inventory",
              bg: "bg-primary/10",
              color: "text-primary",
              label: "Cantidad actual de productos",
              value: "12,450",
              trend: "text-green-600",
              trendIcon: "trending_up",
              trendText: "+2.4% vs mes anterior",
            },
            {
              icon: "bookmark_added",
              bg: "bg-secondary-container/40",
              color: "text-secondary",
              label: "Cantidad reservada de productos",
              value: "1,208",
              trend: "text-amber-600",
              trendIcon: "pending_actions",
              trendText: "Comprometido en pedidos",
            },
            {
              icon: "assignment_late",
              bg: "bg-tertiary-fixed",
              color: "text-tertiary",
              label: "Cantidad con aprobación pendiente",
              value: "432",
              trend: "text-blue-600",
              trendIcon: "info",
              trendText: "Verificación de control de calidad",
            },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-lg shadow-sm"
            >
              <div className="flex justify-between items-start mb-md">
                <div className={`w-12 h-12 rounded-lg ${k.bg} flex items-center justify-center`}>
                  <Icon name={k.icon} className={k.color} />
                </div>
                <Icon name="more_vert" className="text-on-surface-variant cursor-pointer" />
              </div>
              <p className="text-label-md text-on-surface-variant mb-xs">{k.label}</p>
              <h3 className="text-headline-sm text-on-surface">{k.value}</h3>
              <div className={`mt-md flex items-center gap-xs text-xs ${k.trend}`}>
                <Icon name={k.trendIcon} className="!text-[16px]" />
                <span>{k.trendText}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden shadow-sm">
          <div className="p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md border-b border-outline-variant">
            <div>
              <h2 className="text-title-lg text-on-surface">Resumen por producto</h2>
              <p className="text-body-md text-on-surface-variant">
                Estado detallado de inventario activo
              </p>
            </div>
            <div className="flex items-center gap-md w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant !text-[20px]"
                />
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Buscar producto"
                  type="text"
                />
              </div>
              <button className="flex items-center gap-xs px-md py-2 border border-outline-variant rounded-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <Icon name="filter_list" className="!text-[20px]" /> Filtrar
              </button>
              <button className="bg-primary text-on-primary px-lg py-2 rounded-lg text-label-lg hover:shadow-md active:opacity-90 transition-all">
                Exportar
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  {[
                    "Producto",
                    "Categoría",
                    "Cant. Actual",
                    "Reservada",
                    "Pte. Aprobación",
                    "Disponible",
                    "Último movimiento",
                    "",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`px-lg py-md text-label-md text-on-surface-variant uppercase tracking-wider ${i >= 2 && i <= 5 ? "text-right" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {productos.map((p, i) => (
                  <tr
                    key={p.sku}
                    className={`hover:bg-surface-container-low transition-colors group ${i % 2 ? "bg-surface-container-low/30" : ""}`}
                  >
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded bg-secondary-container/30 flex items-center justify-center text-primary">
                          <Icon name={p.icon} />
                        </div>
                        <div>
                          <div className="text-title-md text-on-surface">{p.name}</div>
                          <div className="text-xs text-on-surface-variant">SKU: {p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <span className="bg-secondary-container/40 text-on-secondary-container px-2 py-1 rounded text-xs font-medium">
                        {p.cat}
                      </span>
                    </td>
                    <td className="px-lg py-md text-right font-medium">{p.actual}</td>
                    <td className="px-lg py-md text-right text-on-surface-variant">{p.res}</td>
                    <td className="px-lg py-md text-right text-on-surface-variant">{p.pte}</td>
                    <td className="px-lg py-md text-right">
                      <span className={`px-2 py-1 rounded text-sm font-bold ${p.dispCls}`}>
                        {p.disp}
                      </span>
                    </td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">{p.mov}</td>
                    <td className="px-lg py-md">
                      <Icon
                        name="visibility"
                        className="text-on-surface-variant opacity-0 group-hover:opacity-100 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-lg bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
            <span className="text-label-md text-on-surface-variant">
              Mostrando 1 a 5 de 1,240 productos
            </span>
            <div className="flex items-center gap-base">
              <button
                disabled
                className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30"
              >
                <Icon name="chevron_left" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-label-md font-bold">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-label-md font-bold">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-label-md font-bold">
                3
              </button>
              <span className="text-on-surface-variant">...</span>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-label-md font-bold">
                248
              </button>
              <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant">
                <Icon name="chevron_right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed right-xl bottom-xl w-14 h-14 bg-primary text-on-primary rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-50">
        <Icon name="add" className="!text-[28px]" />
      </button>
    </AppLayout>
  );
}
