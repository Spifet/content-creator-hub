import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import illustration from "../Images/illustration_homepage.jpg";

export default function Homepage() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 6, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Content from your favorite artists,{" "}
          <Text as={"span"} color={"orange.400"}>
            all in one place
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Never miss a content from your favorite artist, athlete, gamer,
          influencer etc. On ContentHub, you can follow the latest news from
          your favorite artists, engage with them and the community.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            I'm a Follower
          </Button>
          <Button rounded={"full"} px={6}>
            I'm an Content Creator
          </Button>
        </Stack>
        <Flex w={"full"} justify={"center"}>
          <Image src={illustration} alt="illustration homepage" maxW={700} />
        </Flex>
      </Stack>
    </Container>
  );
}
