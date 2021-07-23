import {
  NAME,
  MEMBERS,
  GROUP_NAME,
  CREATOR,
  DESCRIPTION,
  X_COORD,
  Y_COORD,
  COORDINATES,
  GROUP,
} from "../constants";

export type User = {
  [NAME]: string;
};

export type Group = {
  [MEMBERS]: User[];
  [GROUP_NAME]: string;
};

export type Coordinates = {
  [X_COORD]: number;
  [Y_COORD]: number;
};

export type Pin = {
  [CREATOR]: User;
  [DESCRIPTION]: string;
  [COORDINATES]: Coordinates;
  [GROUP]: Group;
};
