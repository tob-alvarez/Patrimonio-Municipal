import { createContext, useState } from "react";
import axios from "../config/axios";

export const EducaContext = createContext();

// eslint-disable-next-line react/prop-types
const ProviderEducacion = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(null);
  const [selected, setSelected] = useState([]);
  const [tipologias, setTipologias] = useState([]);
  const [patrimonio, listarPatrimonio] = useState([]);

  const obtenerTipologias = async () => {
    try {
      const resultado = await axios.get(
        "/patrimonio/listarTipologiasPatrimonio"
      );
      // Actualiza los estados con las convocatorias filtradas y ordenadas
      setTipologias(resultado.data.tipologias);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return setAuthenticated(false);
      }
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/usuarios/authStatus");
      setUser(data.usuarioSinContraseña);
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
      // toast.error("Error de autenticación. Ingrese nuevamente");
    }
    setLoading(false);
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenSet");
    const url = new URL(`http://localhost:5174/`);
    url.searchParams.append("logout", true);
    window.open(url.toString(), "_self");
  };

  const actualizador = () => {
    setRefresh(!refresh);
  };

  return (
    <EducaContext.Provider
      value={{
        user,
        authenticated,
        setAuthenticated,
        loading,
        getAuth,
        setLoading,
        logout,
        selected,
        setSelected,
        actualizador,
        refresh,
        tipologias,
        obtenerTipologias,
        patrimonio,
        listarPatrimonio,
      }}
    >
      {children}
    </EducaContext.Provider>
  );
};

export default ProviderEducacion;
