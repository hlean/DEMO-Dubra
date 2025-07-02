import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verificarAutenticacion = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verificarAutenticacion();
  }, []);

  const logout = async () => {
    try{
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'Post',
        credentials: 'include',
      });
      if(res.ok){
        setUser(null);
      }
    } catch (err){
        setLoading(false);
    }
    
    
  };


  return (
    <AuthContext.Provider value={{ user, loading, logout, verificarAutenticacion }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
