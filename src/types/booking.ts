export interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  status: "Available" | "Unavailable";
  email: string;
  phone: string;
  imageUrl: string;
  images: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  startDate: Date;
  endDate: Date;
  phone: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: Date;
}

export interface BookingFormData {
  phone: string;
  startDate: Date;
  endDate: Date;
}
