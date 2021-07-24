import {
  Dispatch,
  useState,
  createContext,
  ReactNode,
  SetStateAction,
} from "react";
import { Group } from "../types";

type GroupContextType = {
  selectedGroup?: Group;
  setSelectedGroup: Dispatch<SetStateAction<GroupContextType["selectedGroup"]>>;
};

export const GroupContext = createContext<GroupContextType>({
  setSelectedGroup: () => {
    throw new Error("setSelectedGroup is not defined.");
  },
});

type Props = {
  children: ReactNode;
};

function GroupProvider({ children }: Props) {
  const [selectedGroup, setSelectedGroup] =
    useState<GroupContextType["selectedGroup"]>();

  return (
    <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

export default GroupProvider;
