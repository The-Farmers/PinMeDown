export type Group = {
  groupName: string,
  pins?: Pin[],
  members: string[]
};

export type Pin = {
  title: string,
  description: string,
};
