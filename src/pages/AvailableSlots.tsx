import Header from "@/components/layout/Header";
import PropertyCard from "@/components/booking/PropertyCard";
import { properties } from "@/data/mockData";

export default function AvailableSlots() {
  const availableProperties = properties.filter(
    (property) => property.status === "Available",
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Slots
          </h1>
          <p className="text-gray-600">Properties available for booking</p>
        </div>

        <div className="space-y-4">
          {availableProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {availableProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No available slots at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
