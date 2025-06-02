import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset request:", data);
      setEmailSent(true);
      toast.success("Password reset email sent!");
      setIsLoading(false);
    }, 1500);
  };

  const handleResendEmail = () => {
    const email = getValues("email");
    if (email) {
      onSubmit({ email });
    }
  };

  if (emailSent) {
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
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Check your email
                </h1>
                <p className="text-gray-600">
                  We've sent a password reset link to{" "}
                  <strong>{getValues("email")}</strong>
                </p>
                <Alert>
                  <AlertDescription>
                    Didn't receive the email? Check your spam folder or try
                    resending.
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Resending..." : "Resend Email"}
                  </Button>
                  <Link to="/auth/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Sign In
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {/* Forgot Password Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending reset link..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
