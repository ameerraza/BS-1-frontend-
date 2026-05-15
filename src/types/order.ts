export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
}

export interface Order {
  _id: string;
  userId: User;
  vendorId: User;
  productId: Product;
  type: "rent" | "buy";
  fullName: string;
  email: string;
  phoneNumber: string;
  cnicNumber: string;
  cnicFrontImage: string;
  cnicBackImage: string;
  address: string;
  city: string;
  transactionId: string;
  receiptImage: string;
  startDate?: string;
  endDate?: string;
  productPrice: number;
  deliveryCharges: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}
