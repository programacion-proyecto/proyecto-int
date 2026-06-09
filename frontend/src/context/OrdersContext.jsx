import { createContext, useContext, useEffect, useState } from "react";

const KEY = "logistics_pending_orders";
const OrdersContext = createContext(null);

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(read());
    const refresh = () => setOrders(read());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const persist = (next) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setOrders(next);
  };

  const addPendingOrder = (o) => {
    const next = [
      { ...o, id: `${o.type.toUpperCase()}-${Date.now()}`, status: "pendiente" },
      ...orders,
    ];
    persist(next);
  };

  const setOrderStatus = (id, status) => {
    persist(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <OrdersContext.Provider value={{ orders, addPendingOrder, setOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}