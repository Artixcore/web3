import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchData = ({ queryKey, url }) => {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(url);
      return response?.data;
    },
  });

  return { isPending, error, data };
};

export default useFetchData;
