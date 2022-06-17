import React from "react";
import { Grid, GridItem, Heading, Icon, Divider } from "@chakra-ui/react";
import Announcements from "../Hub/Announcements";
import Comments from "./Comments";
import AddComment from "./AddComment";
import AddAnnouncement from "./AddAnnouncement";
import Polls from "./Polls";
import { GrAnnounce, GrChatOption, GrCircleQuestion } from "react-icons/gr";

function HubUser() {
  return (
    <Grid
      templateAreas={`"announcements polls"
                  
                  "comments polls"
             
                  `}
      gridTemplateRows={"1fr 1fr"}
      gridTemplateColumns={"1fr 0.4fr"}
      h="400px"
      gap="3"
      m={3}
    >
      <GridItem
        pl="2"
        area={"announcements"}
        borderBottom="1px"
        borderColor="gray.200"
        paddingBottom={4}
      >
        <Heading color={"#ed8936"}>
          <Icon as={GrAnnounce} w={8} h={8} mr={3} color={"#ed8936"} />
          Announcements
        </Heading>
        <AddAnnouncement />
        <Announcements />
      </GridItem>

      <GridItem pl="2" area={"comments"} mb={"65px"}>
        <Heading color={"#9F7AEA"}>
          <Icon as={GrChatOption} w={8} h={8} mr={3} />
          Comments Feed
        </Heading>
        <AddComment />
        <Comments />
      </GridItem>
      <GridItem pl="2" bg="white" area={"polls"}>
        <Heading as="h4" size="md" color={"#4999FC"}>
          {/* <Icon as={GrCircleQuestion} w={8} h={8} mr={3} /> */}
          Poll of the day
        </Heading>
        <Polls />
      </GridItem>
    </Grid>
  );
}

export default HubUser;
