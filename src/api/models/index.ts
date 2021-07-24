import {
  NAME,
  MEMBERS,
  GROUP_NAME,
  DESCRIPTION,
  TITLE,
  USER_ID,
  LAT,
  LNG,
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
  [LNG]: number;
  [GROUP_NAME]: string;
  [CREATOR]: User;
};
