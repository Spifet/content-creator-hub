import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import logo from "../../img/logo.png";

const Logo = () => {
  return <Image src={logo} alt="logo" htmlWidth="120" />;
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      position="fixed"
      width="100%"
      bottom="0"
      height="65px"
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
