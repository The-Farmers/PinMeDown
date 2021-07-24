import {
  NAME,
  MEMBERS,
  GROUP_NAME,
  DESCRIPTION,
  TITLE,
  USER_ID,
  LAT,
  LONG,
  CREATOR,
} from "../constants";

export type User = {
  [USER_ID]: string;
  [NAME]: string;
};

export type Group = {
  [MEMBERS]: User[];
  [GROUP_NAME]: string;
};

export type Pin = {
  [TITLE]: string;
  [DESCRIPTION]: string;
  [LAT]: number;
  [LONG]: number;
  [GROUP_NAME]: string;
  [CREATOR]: User;
};
