import { useState } from "react";
import Header from "@/components/layout/Header";
import PropertyCard from "@/components/booking/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { properties } from "@/data/mockData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
          <div className="absolute top-40 right-40 w-12 h-12 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 right-32 w-8 h-8 bg-pink-400 rounded-full opacity-70 animate-bounce"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Simplify Your Bookings with Airtable
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Effortless booking, real-time updates, and easy management in
                one place
              </p>
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
              >
                Book Now
              </Button>
            </div>

            <div className="relative">
              {/* Illustration placeholder - can be replaced with actual illustrations */}
              <div className="relative w-full h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Animated character placeholders */}
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full animate-pulse"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full animate-pulse delay-200"></div>
                    <div className="col-span-3 h-8 bg-white/20 rounded-lg animate-pulse delay-300"></div>
                    <div className="col-span-2 h-6 bg-white/20 rounded animate-pulse delay-400"></div>
                    <div className="h-6 bg-white/20 rounded animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Welcome back,{" "}
            <span className="text-indigo-400">{"{LOGGED_IN_USER:NAME}!"}</span>
          </h2>
          <p className="text-xl text-gray-300">
            Effortless booking, real-time updates, and easy management in one
            place
          </p>
        </div>
      </section>

      {/* Bookings Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bookings</h2>
            <p className="text-gray-600">
              Searchable information about Bookings
            </p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No properties found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
