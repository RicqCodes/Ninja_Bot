"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabseClient";
import { Session } from "@supabase/supabase-js";

const SessionContext = createContext<{ session: Session | null }>({
  session: null,
});

// Custom hook to access the wallet context
export const useSession = () => useContext(SessionContext);

export const SesssionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ session: session }}>
      {children}
    </SessionContext.Provider>
  );
};
