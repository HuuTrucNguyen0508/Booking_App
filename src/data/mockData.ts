import { Property, Booking } from "@/types/booking";

export const properties: Property[] = [
  {
    id: "1",
    name: "The Enchanted Treehouse",
    description:
      "Nestled high in the trees, this magical treehouse offers a unique escape with its rustic charm and breathtaking views of the forest canopy.",
    location: "Whimsical Woods, Fairyland",
    pricePerNight: 150.0,
    status: "Available",
    email: "alice@example10e.com",
    phone: "555-0123",
    imageUrl: "/placeholder.svg",
    images: ["/placeholder.svg"],
  },
  {
    id: "2",
    name: "The Galactic Pod",
    description:
      "Experience the cosmos in this futuristic pod with panoramic views of the night sky.",
    location: "Orbiting Earth, Space",
    pricePerNight: 300.0,
    status: "Available",
    email: "space@galactic.com",
    phone: "555-0124",
    imageUrl: "/placeholder.svg",
    images: ["/placeholder.svg"],
  },
  {
    id: "3",
    name: "The Pirate's Cove",
    description:
      "Ahoy! Set sail for adventure in this nautical-themed hideaway with ocean views.",
    location: "Treasure Island, Caribbean",
    pricePerNight: 200.0,
    status: "Available",
    email: "captain@pirates.com",
    phone: "555-0125",
    imageUrl: "/placeholder.svg",
    images: ["/placeholder.svg"],
  },
  {
    id: "4",
    name: "The Wizard's Keep",
    description:
      "Cast your own spells in this mystical tower filled with ancient magic and wonder.",
    location: "Mystic Mountain, Avalon",
    pricePerNight: 175.0,
    status: "Unavailable",
    email: "wizard@magic.com",
    phone: "555-0126",
    imageUrl: "/placeholder.svg",
    images: ["/placeholder.svg"],
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    propertyId: "1",
    property: properties[0],
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-01-18"),
    phone: "+1-555-1234",
    status: "confirmed",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "b2",
    propertyId: "2",
    property: properties[1],
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-02-15"),
    phone: "+1-555-5678",
    status: "pending",
    createdAt: new Date("2024-01-02"),
  },
];
