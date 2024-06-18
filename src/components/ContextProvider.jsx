import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const TokenContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  return <TokenContext.Provider value={[token, setToken]}>{children}</TokenContext.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
