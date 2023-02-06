import {useState, useMemo } from "react";
import axios from "axios";

export const useAPI = (url) => {
  const [data, setData] = useState(null);

  useMemo(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [url]);
  return data;
};
