import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type StateContextType = {
  state: string | null;
  setState: Dispatch<SetStateAction<string>>;
};

export const StateContext = createContext<StateContextType>({
  state: null,
  setState: () => {
    throw new Error("setState is not defined.");
  },
});

type Props = {
  children: ReactNode;
};

export function StateProvider({ children }: Props) {
  const [state, setState] = useState<string>("loggedOut");

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}
