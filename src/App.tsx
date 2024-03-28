import { useState, useEffect } from "react";
import "./App.css";
import OrderDashboard from "./order-dashboard";
import { Order, OrderFilters } from "./order";
import { getAllOrders } from "./utils";
import EditOrderModal from "./order-dashboard/components/EditOrderModal";

// If you are using date-fns v3.x, please import the v3 adapter
import { Providers } from "./Providers";
import { db } from "./config/firebase";
import { doc, setDoc } from "firebase/firestore";

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<OrderFilters>({});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async (filters: OrderFilters) => {
    setOrders(await getAllOrders(filters));
  };

  const handleEditOrder = async (id: string, changes: Partial<Order>) => {
    try {
      setLoading(true);

      // Update the order document with new changes
      const orderDoc = doc(db, "orders", id);
      console.log("Updating document ", id, changes);
      await setDoc(orderDoc, changes, { merge: true });

      // Update the orders list
      await fetchOrders(filters);
    } catch (error) {
      console.error(`Error updating document ${id} `, error);
    }
  };

  useEffect(() => {
    fetchOrders(filters);
  }, [filters]);

  useEffect(() => {
    setLoading(false);
  }, [selectedOrder]);

  return (
    <Providers>
      <OrderDashboard
        orders={orders}
        onFiltersChange={setFilters}
        filters={filters}
        editOrder={(order) => {
          setSelectedOrder(orders.find((o) => o.id === order.id) || null);
          setEditModalOpen(true);
        }}
      ></OrderDashboard>
      <EditOrderModal
        loading={loading}
        open={editModalOpen}
        order={selectedOrder as Order}
        setOpen={setEditModalOpen}
        submit={handleEditOrder}
      />
    </Providers>
  );
}

export default App;
