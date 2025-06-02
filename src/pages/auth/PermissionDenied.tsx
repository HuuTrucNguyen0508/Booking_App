import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Home, HelpCircle, ArrowLeft } from "lucide-react";

export default function PermissionDenied() {
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Access Denied
              </h1>

              <p className="text-gray-600 leading-relaxed">
                You don't have permission to access this page or resource. This
                might be because:
              </p>

              <div className="text-left bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    You're not signed in to your account
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    Your account doesn't have the required permissions
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    The page is restricted to certain user roles
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link to="/auth/login">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Sign In to Your Account
                  </Button>
                </Link>

                <Link to="/">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Home Page
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
                  Think this is a mistake?
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
