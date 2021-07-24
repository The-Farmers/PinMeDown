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
  user: { user: firebase.User; name: string } | null;
  setUser: Dispatch<SetStateAction<AuthContextType["user"] | null>>;
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
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser((previousUser) => {
        if (firebaseUser === null) {
          return null;
        }

        return {
          user: firebaseUser,
          name: previousUser === null ? "" : previousUser.name,
        };
      });
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
