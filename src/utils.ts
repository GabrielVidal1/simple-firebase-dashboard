import { QueryFieldFilterConstraint, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config/firebase";
import { OrderFilters, orderConverter } from "./order";

export async function getAllOrders(filters: OrderFilters) {
  const orderCollection = collection(db, 'orders').withConverter(orderConverter)

  // Server Side filtering for status
  const conditions = [
    !!filters?.status && where('status', '==', filters?.status),
  ].filter(Boolean) as QueryFieldFilterConstraint[]

  const snapshot = await getDocs(query(orderCollection, ...conditions));
  let orders = snapshot.docs.map(doc => doc.data());

  // Client Side filtering for id
  if (filters?.id) {
    orders = orders.filter(order => order.id.includes(filters.id ?? ''));
  }

  return orders;
}