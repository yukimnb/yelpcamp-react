import { useReducer, createContext, useContext } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();
const useUser = () => useContext(UserContext);

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    // Reducer関数
    (_, { type, data }) => {
      switch (type) {
        case "SET_USER": {
          const userInfo = {
            key: data.key,
            id: data.id,
            name: data.name,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          return userInfo;
        }
        case "REMOVE_USER":
          localStorage.removeItem("userInfo");
          return {};
        default:
          return new Error("不正なtypeです");
      }
    },
    // 初期値
    {},
    // 初期化関数
    () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return userInfo !== null ? userInfo : {};
    }
  );

  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export { ContextProvider, useUser };
