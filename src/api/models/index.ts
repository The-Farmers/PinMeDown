import {
  NAME,
  MEMBERS,
  GROUP_NAME,
  DESCRIPTION,
  GROUP,
  TITLE,
  USER_ID,
  LATITUDE,
  LONGITUDE,
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
  [LATITUDE]: number;
  [LONGITUDE]: number;
  [GROUP_NAME]: string;
  [CREATOR]: User;
};
