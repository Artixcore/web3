import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingSpinner = () => {
  return (
    <span className="flex items-center gap-2 text-white">
      <AiOutlineLoading3Quarters className="animate-spin" />
      Loading...
    </span>
  );
};

export default LoadingSpinner;
