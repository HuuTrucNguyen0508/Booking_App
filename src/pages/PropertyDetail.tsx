import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BookingForm from "@/components/booking/BookingForm";
import { Badge } from "@/components/ui/badge";
import { properties } from "@/data/mockData";
import { BookingFormData } from "@/types/booking";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Property Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The property you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log("Booking submitted:", {
      property: property.name,
      ...data,
    });

    toast.success("Booking submitted successfully!", {
      description: `Your booking for ${property.name} has been submitted.`,
    });

    // In a real app, you would make an API call here
    // and then potentially redirect to a confirmation page
    setTimeout(() => {
      navigate("/bookings");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Property Details Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="flex gap-6">
            <div className="relative">
              <img
                src={property.imageUrl}
                alt={property.name}
                className="w-32 h-32 rounded-lg object-cover border border-gray-200"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {property.name}
                  </h1>
                  <p className="text-gray-600 leading-relaxed max-w-3xl mb-4">
                    {property.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Badge
                  variant={
                    property.status === "Available" ? "default" : "secondary"
                  }
                  className={
                    property.status === "Available"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {property.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  {property.location}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Location
                  </h3>
                  <p className="text-gray-900">{property.location}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Price Per Night
                  </h3>
                  <p className="text-gray-900 font-semibold">
                    ${property.pricePerNight.toFixed(2)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-900">{property.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </h3>
                  <p className="text-gray-900">{property.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Image Gallery
                </h3>
                <div className="flex gap-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.name} ${index + 1}`}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator with Plus Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-orange-400"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black rounded-full p-2">
              <Plus className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-md mx-auto">
          <BookingForm onSubmit={handleBookingSubmit} />
        </div>
      </div>
    </div>
  );
}
