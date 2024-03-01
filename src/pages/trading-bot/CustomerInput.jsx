import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";
import useToast from "@/hooks/useToast";

const CustomerInput = () => {
  const { showToast } = useToast();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data = {
        ...data,
        userName: user?.displayName,
        emailId: user?.email,
        customerId: user?.uid,
        running_status: "ON",
        isSubmitted: true,
      };

      const res = await axios.post(
        "https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/customer",
        data
      );

      if (res?.data?.Message === "SUCCESS") {
        setLoading(false);
        navigate("/trading-bot/customer-configuration");
      }
    } catch (error) {
      setLoading(false);
      showToast("Invalid Api secret or key!");
      reset();
      console.log(error);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-64px)] section-wrapper flex items-center justify-center">
      <div className="p-10 rounded-md shadow-md border space-y-5 w-full sm:w-[80%] max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-1">
          <h4>Trading Bot</h4>
          <p>Enter your coinbase credentials</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="font-medium">Api Secret</label>
            <input
              type="text"
              className="outline-none border-b border-black"
              {...register("apiSecret", { required: true })}
            />

            {errors.apiSecret && (
              <span className="text-red-500  text-sm">
                Api Secret is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Api Key</label>
            <input
              type="text"
              className="outline-none border-b border-black"
              {...register("apiKey", { required: true })}
            />

            {errors.apiKey && (
              <span className="text-red-500  text-sm">Api Key is required</span>
            )}
          </div>

          <Button
            type="submit"
            className={cn(
              "w-full rounded-full",
              loading && buttonVariants({ variant: "loading" })
            )}
          >
            {loading ? <LoadingSpinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CustomerInput;
