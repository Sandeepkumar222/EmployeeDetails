import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeData from "./Data";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [employee, setEmployee] = useState("");
  const [totalEmployee, setTotalEmployee] = useState([]);
  const history = useHistory();

  useEffect(() => {
   setTotalEmployee(EmployeeData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DataContext.Provider
        value={{
          employee,
          setEmployee,
          totalEmployee,
          setTotalEmployee,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export const DataState = () => {
  return useContext(DataContext);
};

export default DataProvider;