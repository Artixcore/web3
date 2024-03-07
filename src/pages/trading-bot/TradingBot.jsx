import useFetchData from "@/hooks/useFetchData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import DisplayTradingData from "@/components/DisplayTradingData";
import { Button, buttonVariants } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import useToast from "@/hooks/useToast";
import notificationSound from "../../assets/audio/notification.mp3";

const TradingBot = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const { showToast } = useToast();

  // get request for bot running status
  const {
    isLoading: botRunningStatusLoading,
    data: botRunningStatus,
    error: botRunningStatusError,
  } = useFetchData({
    queryKey: "runningStatus",
    url: `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/validCustomer/validCustomerItem?customerId=${user?.uid}&attributeToSearch=running_status`,
  });

  // get request for bot output
  const {
    isLoading: botOutputLoading,
    error: botOutputError,
    data: botOutputData,
  } = useFetchData({
    queryKey: "botOutput",
    url: `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/botOutput?display_id=${user?.uid}`,
    refetchInterval: botRunningStatus === "ON" ? 1000 : false,
  });

  // get request for bot counter
  const {
    data: botCounterData,
    isLoading: botCounterLoading,
    error: botCounterError,
  } = useFetchData({
    queryKey: "botCounter",
    url: `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/botCounter?counter_id=${user?.uid}`,
    refetchInterval: botRunningStatus === "ON" ? 1000 : false,
  });

  const hanldeStartBot = async () => {
    setLoading(true);
    try {
      const data = {
        customerId: user?.uid,
        updateKey: "running_status",
        updateValue: "ON",
      };

      const res = await axios.patch(
        `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/validCustomer?customerId=${user?.uid}`,
        data
      );
      if (res?.data?.Message === "SUCCESS") {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleStopBot = async () => {
    setLoading(true);
    try {
      const data = {
        customerId: user?.uid,
        updateKey: "running_status",
        updateValue: "OFF",
      };

      const res = await axios.patch(
        `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/validCustomer?customerId=${user?.uid}`,
        data
      );
      if (res?.data?.Message === "SUCCESS") {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Function to handle showing the popup message and playing the sound
  const handleBuyStatus = () => {
    if (botCounterData?.last_buySell_status === "Buy") {
      // Show toast notification
      showToast("Buy Sell Status Detected!");

      // Play sound
      const audio = new Audio(notificationSound);
      audio.play();
    }
  };

  // Call handleBuyStatus whenever botCounterData updates
  useEffect(() => {
    handleBuyStatus();
  }, [botCounterData]);

  // for showing error whenever api request got failed
  if (botRunningStatusError || botOutputError || botCounterError) {
    return (
      <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center">
        <p>
          An error has occurred:{" "}
          {botRunningStatusError?.message ||
            botOutputError?.message ||
            botCounterError?.message}
        </p>
      </div>
    );
  }

  return (
    <main className="section-wrapper">
      <div className="my-5 lg:my-10 text-center space-y-2">
        <h3>Bot Running Status</h3>

        <p>
          This section displays the current status of the bot. <br />
          Check here for updates on its activity and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">
        {botOutputLoading || isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="shadow-md rounded-md border p-5">
              <Skeleton />
              <Skeleton height={25} />
            </div>
          ))
        ) : (
          <>
            <DisplayTradingData
              title="Closing Price"
              value={botOutputData?.closing_price_result}
            />

            <DisplayTradingData
              title="Update Price"
              value={botOutputData?.update_price_result}
            />

            <DisplayTradingData
              title="Average Price"
              value={botOutputData?.moving_average_price}
            />

            <DisplayTradingData
              title="Trade Sell Amount"
              value={botOutputData?.trade_sell_amount}
            />

            <DisplayTradingData
              title="Trade Buy Amount"
              value={botOutputData?.trade_buy_amount}
            />

            <DisplayTradingData
              title="RSI Value"
              value={botOutputData?.rsi_value}
            />
          </>
        )}
      </div>

      <div className="mt-5">
        {botRunningStatusLoading || isLoading ? (
          <div className="shadow-md rounded-md border p-5">
            <Skeleton />
          </div>
        ) : (
          <div className="flex items-center gap-5">
            {botRunningStatus === "ON" ? (
              <Button
                onClick={handleStopBot}
                className={cn(
                  isLoading && buttonVariants({ variant: "loading" })
                )}
              >
                {isLoading ? <LoadingSpinner /> : "Stop Bot"}
              </Button>
            ) : (
              <Button
                onClick={hanldeStartBot}
                className={cn(
                  isLoading && buttonVariants({ variant: "loading" })
                )}
              >
                {isLoading ? <LoadingSpinner /> : "Start Bot"}
              </Button>
            )}

            {botRunningStatus !== "ON" && (
              <Link
                to="/trading-bot/customer-configuration"
                className={buttonVariants()}
              >
                Config Page
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="mt-5">
        {botCounterLoading || botOutputLoading || isLoading ? (
          <div className="shadow-md rounded-md border p-5">
            <Skeleton count={4} />
          </div>
        ) : (
          <div className="p-5 rounded-md shadow-md border w-fit">
            <p>
              <span className="font-semibold">Symbol:</span>{" "}
              {botOutputData?.symbol}
            </p>
            <p>
              <span className="font-semibold">Total Buy:</span>{" "}
              {botCounterData?.total_buy}
            </p>
            <p>
              <span className="font-semibold">Total Sell:</span>{" "}
              {botCounterData?.total_sell}
            </p>
            <p>
              <span className="font-semibold">Buy Sell Status:</span>{" "}
              {botCounterData?.last_buySell_status}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default TradingBot;
