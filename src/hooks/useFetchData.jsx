import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

const useFetchData = ({ queryKey, url, refetchInterval = false }) => {
  const { user } = useContext(AuthContext);

  const { isLoading, data, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(url);
      return response?.data;
    },
    refetchInterval,
    enabled: !!user,
  });

  return { isLoading, data, error };
};

export default useFetchData;
