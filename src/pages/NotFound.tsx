import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, Search, HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-indigo-600 text-white rounded-lg p-2">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">
              BookPro
            </span>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-gray-600">404</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Page Not Found
              </h1>

              <p className="text-gray-600 leading-relaxed">
                Sorry, we couldn't find the page you're looking for. The page
                might have been moved, deleted, or you entered an incorrect URL.
              </p>

              <div className="text-left bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    Check the URL for any typos
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    The page may have been moved or deleted
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    You might not have permission to view this page
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link to="/">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Home Page
                  </Button>
                </Link>

                <Link to="/bookings">
                  <Button variant="outline" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Properties
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">
                  Need help finding what you're looking for?
                </p>
                <Link to="/contact">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
