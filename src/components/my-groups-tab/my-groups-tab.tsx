import { useContext } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Placeholder,
} from "semantic-ui-react";
import { useGetUserGroups } from "../../api/methods/users";
import { GroupContext } from "../../context-provider/group-provider";
import { AuthContext } from "../../context/AuthContext";
import { Group } from "../../types";
import PlaceholderWrapper from "../placeholder-wrapper";
import styles from "./my-groups-tab.module.scss";

const data: Group[] = [
  {
    groupName: "Family",
    pins: {
      hellopin: {
        creator: { name: "max", userId: "max" },
        lat: 1.29,
        lng: 103.7717,
        description: "hello world",
      },
    },
    members: { max: { name: "max" }, jeremy: { name: "jeremy" } },
  },
  {
    groupName: "dorm friends",
    pins: {
      hellopin: {
        creator: { name: "max", userId: "max" },
        lat: 1.2958,
        lng: 103.7747,
        description: "world",
      },
    },
    members: { max: { name: "max" }, jeremy: { name: "jeremy" } },
  },
  {
    groupName: "gang gang",
    pins: {
      hellopin: {
        creator: { name: "max", userId: "max" },
        lat: 1.2948,
        lng: 103.7736,
        description: "helldasdsadasdasdao world",
      },
    },
    members: { max: { name: "max" }, jeremy: { name: "jeremy" } },
  },
  {
    groupName: "hot girl summer",
    pins: {
      hellopin: {
        creator: { name: "max", userId: "max" },
        lat: 1.2927,
        lng: 103.7758,
        description: "hellodasdjasdjalsjdaslkjdaslkjdsalkjd world",
      },
    },
    members: { max: { name: "max" }, jeremy: { name: "jeremy" } },
  },
];

function MyGroupsTab() {
  const { setSelectedGroup, selectedGroup } = useContext(GroupContext);
  const { user } = useContext(AuthContext);
  const { groups } = useGetUserGroups(user?.user.uid ?? "");
  const { groupName, pins } = selectedGroup ?? {};

  console.log(groups);

  return (
    <PlaceholderWrapper loadingMessage="Retrieving groups" placeholder>
      {selectedGroup ? (
        <>
          <Button
            icon="chevron left"
            basic
            compact
            color="grey"
            content="Back"
            onClick={() => setSelectedGroup(undefined)}
          />
          <Header as="h2" className={styles.header} textAlign="center">
            {groupName}
          </Header>
        </>
      ) : (
        <Grid centered stretched stackable columns="2">
          {data
            .concat(data)
            .concat(data)
            .concat(data)
            .map((group) => {
              const { groupName, members, pins } = group;
              return (
                <Grid.Column key={groupName}>
                  <Card fluid onClick={() => setSelectedGroup(group)} raised>
                    <Card.Content>
                      <Card.Header>{groupName}</Card.Header>

                      <Card.Description>
                        <Icon name="users" />
                        {Object.keys(members).length} friends
                      </Card.Description>
                    </Card.Content>

                    <Card.Content meta>
                      <Icon name="point" /> {Object.keys(pins).length} pins
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })}
        </Grid>
      )}
    </PlaceholderWrapper>
  );
}

export default MyGroupsTab;
