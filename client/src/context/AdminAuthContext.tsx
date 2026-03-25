import { createContext, useContext, useMemo, useState } from "react";

interface AdminAuthContextValue {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const STORAGE_KEY = "buildmart_admin_token";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

  const value = useMemo(
    () => ({
      token,
      isLoggedIn: Boolean(token),
      login: (newToken: string) => {
        localStorage.setItem(STORAGE_KEY, newToken);
        setToken(newToken);
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
      },
    }),
    [token]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
