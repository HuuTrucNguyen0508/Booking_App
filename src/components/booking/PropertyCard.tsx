import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/booking";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link to={`/property/${property.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="relative">
            <img
              src={property.imageUrl}
              alt={property.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {property.location}
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  ${property.pricePerNight.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3 ml-4">
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
