import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Eye, EyeOff, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset:", { token, ...data });
      setIsSuccess(true);
      toast.success("Password reset successfully!");
      setIsLoading(false);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    }, 1500);
  };

  // Check if token is missing or invalid
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
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
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Invalid Reset Link
              </h1>
              <p className="text-gray-600 mb-6">
                The password reset link is invalid or has expired.
              </p>
              <div className="space-y-3">
                <Link to="/auth/forgot-password">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Request New Reset Link
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button variant="outline" className="w-full">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
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
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Password Reset Successful
                </h1>
                <p className="text-gray-600">
                  Your password has been successfully reset. You will be
                  redirected to the sign in page shortly.
                </p>
                <Link to="/auth/login">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Continue to Sign In
                  </Button>
                </Link>
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
            Reset your password
          </h1>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        {/* Reset Password Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create New Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Resetting password..." : "Reset Password"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/auth/login"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
