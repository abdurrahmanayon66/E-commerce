"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface LoginFormProps {
  onRegisterClick: (userType: "seller" | "customer") => void;
}

interface LoginFormData {
  email: string;
  password: string;
  userType: "seller" | "customer";
}

const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      userType: "seller",
    },
  });

  const userType = watch("userType");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/api/session/login`,
        { email: data.email, password: data.password, userType: data.userType },
        { withCredentials: true }
      );

      const { accessToken, user } = res.data;
      sessionStorage.setItem("accessToken", accessToken);
      setUser({
        userType: data.userType,
        name:
          data.userType === "seller"
            ? user?.name || "Seller"
            : `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      });
      router.push(`/${data.userType}/overview`);
    } catch (err: any) {
      if (err.status === 401)
        toast.error("Email or Password is incorrect! Please try again.");
      else {
        toast.error(
          err.response?.data?.error || "Login failed. Please try again."
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold mb-4 text-center text-button-primary">
            Login
          </h1>

          <div className="mb-4">
            <label className="block mb-1.5 text-xl text-text-primary">
              User Type
            </label>
            <Select
              value={userType}
              onValueChange={(value) => {
                setValue("userType", value as "seller" | "customer");
              }}
            >
              <SelectTrigger className="w-full border [&>svg]:w-6 [&>svg]:h-6 text-text-secondary focus:ring-0 border-border-primary focus:outline-none px-5 min-h-13 rounded-md text-base text-primary placeholder:text-secondary">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-base">
                <SelectItem value="seller" className="text-base">
                  Seller
                </SelectItem>
                <SelectItem value="customer" className="text-base">
                  Customer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block mb-1.5 text-xl text-text-primary">
              Email
            </label>
            <input
              type="email"
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6 relative">
            <label className="block mb-1.5 text-xl text-text-primary">
              Password
            </label>
            <input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className={`w-full border border-border-primary rounded-md px-5 pr-12 min-h-13 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-15 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              tabIndex={-1} 
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-button-primary text-white rounded-md px-4 py-2 text-base flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-6 w-6" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-base">
          <p className="text-base text-text-primary">Don't have an account?</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => onRegisterClick("seller")}
              className="text-button-primary cursor-pointer"
            >
              Register as a Seller
            </button>
            <span className=" text-text-primary">OR</span>
            <button
              type="button"
              onClick={() => onRegisterClick("customer")}
              className="text-button-primary cursor-pointer"
            >
              Register as a Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
