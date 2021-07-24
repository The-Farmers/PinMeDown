export type Group = {
  groupName: string;
  members: Record<string, { name: string }>;
  pins: Record<
    string,
    {
      creator: { name: string; userId: string };
      lat: number;
      lng: number;
      description: string;
    }
  >;
};
