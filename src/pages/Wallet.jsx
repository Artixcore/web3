import { useConnect, useAccount, useBalance, useSendTransaction } from "wagmi";
import { injected } from "wagmi/connectors";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/utils/shortenAddress";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";

const Wallet = () => {
  const { connect } = useConnect();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: hash, sendTransaction } = useSendTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Destructure address and value from the form data
    const { address, value } = data;
    sendTransaction({ to: address, value: parseEther(value) });
  };

  const features = [
    "Reliability",
    "Security",
    "Ethereum",
    "Web 3.0",
    "Low Fees",
    "Blockchain",
  ];

  return (
    <main className="section-wrapper min-h-[calc(100dvh-64px)] flex flex-col lg:flex-row justify-between items-center py-10 lg:py-0 gap-10">
      {/* left side */}
      <div className="flex-1 w-full">
        {/* first row */}
        <div className="flex flex-col space-y-2 mb-5">
          <h1>
            Send Crypto <br /> across the world
          </h1>
          <p>
            Explore the crypto world. <br /> Buy and sell cryptocurrencies
            easily on Wealth Free Life.
          </p>
        </div>

        {/* second row */}
        {!address && (
          <Button
            onClick={() => connect({ connector: injected() })}
            className="flex items-center gap-1"
          >
            <AiFillPlayCircle />
            Connect Wallet
          </Button>
        )}

        {/* third row */}
        <div className="grid grid-cols-2 md:grid-cols-3 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="min-h-[70px] flex justify-center items-center border rounded "
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* right side */}
      <div className="flex-1 w-full flex flex-col justify-end items-end gap-10">
        {/* first row */}
        <div className="w-[70%] sm:w-1/2 flex flex-col justify-between eth-card white-glassmorphism h-40 p-2">
          {/* first row */}
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={20} color="#fff" />
            </div>
            <BsInfoCircle fontSize={18} color="#fff" />
          </div>

          {/* second row */}
          <div className="flex justify-between items-center">
            <div>
              {address && (
                <p className="font-normal text-sm">{shortenAddress(address)}</p>
              )}
              <p className="font-semibold text-lg">Ethereum</p>
            </div>

            <div className="text-right">
              {address && (
                <p className="font-semibold text-lg">
                  {parseFloat(balance?.formatted).toFixed(4)}
                </p>
              )}
              <p className="font-normal text-sm">Balance</p>
            </div>
          </div>
        </div>

        {/* second row */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-[70%] p-5 flex flex-col items-center shadow-md rounded-md border space-y-3"
        >
          <input
            name="address"
            type="text"
            placeholder="Address To"
            className="w-full rounded-md px-3 py-1 outline-none border"
            {...register("address", { required: "Address is required" })}
          />
          {errors?.address && (
            <span className="text-red-500 text-sm">
              {errors?.address?.message}
            </span>
          )}

          <input
            name="value"
            type="number"
            step="0.0001"
            placeholder="Amount (ETH)"
            className="w-full rounded-md px-3 py-1 outline-none border"
            {...register("value", { required: "Value is required" })}
          />
          {errors?.value && (
            <span className="text-red-500 text-sm">
              {errors?.value?.message}
            </span>
          )}

          <Button type="submit" className="w-full rounded-full">
            Send now
          </Button>

          {hash && <div>Transaction Hash: {hash}</div>}
        </form>
      </div>
    </main>
  );
};

export default Wallet;
