import { getApiUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

const useFetchInstances = (filter: Record<Filter, string>) => {
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(getApiUrl(filter)) // use .env to get URL
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [filter]);
  return { data, isLoading };
};

export default useFetchInstances;
