import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types/booking";

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative">
            <img
              src={property.imageUrl}
              alt={property.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {property.name}
                </h1>
                <p className="text-gray-600 leading-relaxed max-w-3xl">
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
              <span className="text-sm text-gray-500">{property.location}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            <div className="mt-8">
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
      </CardContent>
    </Card>
  );
}
