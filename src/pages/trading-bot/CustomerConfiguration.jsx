import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, buttonVariants } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";

const CustomerConfiguration = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let symbol;

      if (data?.product_id === "BTC-USD" || "BTC-EUR") {
        symbol = "BTC";
      } else if (data?.product_id === "ETH-USD" || "ETH-EUR") {
        symbol = "ETH";
      }

      data = {
        ...data,
        symbol,
        max_sell: data?.max_buy,
        customerId: user?.uid,
        isSubmitted: true,
      };

      const updateData = {
        customerId: user?.uid,
        updateKey: "running_status",
        updateValue: "ON",
      };

      const postRes = await axios.post(
        "https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/orderConfiguration",
        data
      );

      const updateRes = await axios.patch(
        `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/validCustomer?customerId=${user?.uid}`,
        updateData
      );

      if (postRes?.data?.Message && updateRes?.data?.Message === "SUCCESS") {
        setLoading(false);
        navigate("/trading-bot");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-64px)] section-wrapper flex items-center justify-center my-10">
      <div className="p-10 rounded-md shadow-md border space-y-5 w-full sm:w-[80%] max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-1">
          <h4>Trade Strategy Setup</h4>
          <p>Configure your trade strategy</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label>How much money do you want to per trade?</label>
            <input
              type="number"
              className="outline-none border-b border-black"
              {...register("usd_size", { required: true })}
            />
            {errors.usd_size && (
              <span className="text-red-500 text-sm">
                Trade Amount is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Convert Coin</label>
            <select
              className="outline-none border-b border-black"
              {...register("product_id", { required: true })}
            >
              <option></option>
              <option value="BTC-USD">BTC-USD</option>
              <option value="ETH-USD">ETH-USD</option>
              <option value="BTC-EUR">BTC-EUR</option>
              <option value="ETH-EUR">ETH-EUR</option>
            </select>
            {errors.product_id && (
              <span className="text-red-500 text-sm">
                Convert Coin is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Buy Sell Quantity</label>
            <input
              type="number"
              className="outline-none border-b border-black"
              {...register("max_buy", { required: true })}
            />
            {errors.max_buy && (
              <span className="text-red-500 text-sm">
                Buy Sell Quantity is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>
              Want to buy at what percentage profit from the current price?
            </label>
            <select
              className="outline-none border-b border-black"
              {...register("PROFIT_PERCENTAGE", { required: true })}
            >
              <option></option>
              <option value="0.70">0.70</option>
              <option value="0.75">0.75</option>
              <option value="0.90">0.90</option>
              <option value="1.0">1.0</option>
              <option value="1.25">1.25</option>
              <option value="1.50">1.50</option>
            </select>
            {errors.PROFIT_PERCENTAGE && (
              <span className="text-red-500 text-sm">
                Profit Percentage is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>
              How much percentage less than the current price want to buy?
            </label>
            <select
              className="outline-none border-b border-black"
              {...register("LOSS_PERCENTAGE", { required: true })}
            >
              <option></option>
              <option value="0.70">0.70</option>
              <option value="0.75">0.75</option>
              <option value="0.90">0.90</option>
              <option value="1.0">1.0</option>
              <option value="1.25">1.25</option>
              <option value="1.50">1.50</option>
            </select>
            {errors.LOSS_PERCENTAGE && (
              <span className="text-red-500 text-sm">
                Loss Percentage is required
              </span>
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

export default CustomerConfiguration;
