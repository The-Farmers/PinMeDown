import {
  useEffect,
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import firebase from "firebase/app";
import { auth } from "../authentication/firebaseConfig";

type AuthContextType = {
  user: firebase.User | null;
  setUser: Dispatch<SetStateAction<firebase.User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser is not defined.");
  },
});

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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
