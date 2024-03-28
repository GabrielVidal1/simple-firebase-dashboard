import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface Order {
  id: string,
  date: Date,
  status: 'Refunded' | 'Paid' | 'Cancelled',
  customer: {
    initial: string,
    name: string,
    email: string,
  },
}

export const orderConverter: FirestoreDataConverter<Order> = {
  toFirestore(post: Order): DocumentData {
    return {
      date: post.date.toISOString(),
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
      id: snapshot.id,
      date: new Date(data.date),
      status: data.status,
      customer: data.customer,
    }
  }
};
