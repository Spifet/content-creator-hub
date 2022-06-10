import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import logo from "../Images/logo.png";

const Logo = () => {
  return <Image src={logo} alt="logo" htmlWidth="120" />;
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© 2022 OhanaPixel - Spifet - Avy - ITC. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}></Stack>
      </Container>
    </Box>
  );
}
