import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const callFN = async () => {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(result.data);
    };
    callFN();
  }, []);
  
  return (
    <DataContext.Provider value={{ countries, setCountries }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
