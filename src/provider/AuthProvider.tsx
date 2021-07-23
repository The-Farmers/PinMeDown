import { useEffect, useState, ReactNode } from "react";
import firebase from "firebase/app";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../authentication/firebaseConfig";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
