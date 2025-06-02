import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Flag } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BookingFormData } from "@/types/booking";

const bookingSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
});

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [countryCode, setCountryCode] = useState("+1");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const watchedStartDate = watch("startDate");
  const watchedEndDate = watch("endDate");

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit({
      ...data,
      phone: `${countryCode}${data.phone}`,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Book submission
        </h2>
        <p className="text-sm text-gray-500">Add required information</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <Label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone *
          </Label>
          <div className="flex">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-24 rounded-r-none border-r-0">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4" />
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                <SelectItem value="+33">🇫🇷 +33</SelectItem>
                <SelectItem value="+49">🇩🇪 +49</SelectItem>
              </SelectContent>
            </Select>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="555-0123"
              className="rounded-l-none flex-1"
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Start Date *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setValue("startDate", date!);
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && (
            <p className="text-sm text-red-600 mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Booking End Date *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setValue("endDate", date!);
                }}
                disabled={(date) => date < (startDate || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.endDate && (
            <p className="text-sm text-red-600 mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
          size="lg"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
