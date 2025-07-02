import React, { createContext, useContext, useState, useEffect } from "react";
import { useLoginAuthTokenPostMutation } from "../api/api";

interface AuthContextType {
  user: string | null;
  token: string | null;
  // eslint-disable-next-line no-unused-vars
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const ACCESS_TOKEN_KEY = "access_token";
export const USER_NAME_KEY = "user_name";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [loginMutation] = useLoginAuthTokenPostMutation();

  // При загрузке компонента читаем из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_NAME_KEY);
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const result = await loginMutation({
      bodyLoginAuthTokenPost: {
        username,
        password,
      },
    });

    if (result.data) {
      setTokenAndUser({ token: result.data.access_token, user: username });

      return true;
    }

    return false;
  };

  const logout = () => {
    setTokenAndUser({ token: null, user: null });
  };

  const setTokenAndUser = ({
    token,
    user,
  }: {
    token: string | null;
    user: string | null;
  }) => {
    if (token && user) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(USER_NAME_KEY, user);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_NAME_KEY);
    }
    setToken(token);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
