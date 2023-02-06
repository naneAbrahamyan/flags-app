import {useState, useEffect } from "react";

export const useAPI = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchApi = () => {
    fetch(url) 
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      });
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  return { data , loading };
};
