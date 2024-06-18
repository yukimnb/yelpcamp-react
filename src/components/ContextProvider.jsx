import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo !== null ? userInfo : {};
  });

  return <AppContext.Provider value={[context, setContext]}>{children}</AppContext.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
