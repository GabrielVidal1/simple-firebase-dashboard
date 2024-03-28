import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface Order {
  id: string,
  firebaseId: string,
  date: Date,
  status: 'Pending' | 'Refunded' | 'Paid' | 'Cancelled',
  customer: {
    initial: string,
    name: string,
    email: string,
  },
}

export interface OrderFilters {
  id?: string;
  status?: 'Pending' | 'Refunded' | 'Paid' | 'Cancelled';
  customer?: string;
}

export const orderConverter: FirestoreDataConverter<Order> = {
  toFirestore(post: Order): DocumentData {
    return {
      invoiceId: post.id,
      date: post.date,
      status: post.status,
      customer: post.customer,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Order {
    const data = snapshot.data(options)!;
    return {
      firebaseId: snapshot.id,
      id: data.invoiceId,
      date: data.date.toDate(),
      status: data.status,
      customer: data.customer,
    }
  }
};
