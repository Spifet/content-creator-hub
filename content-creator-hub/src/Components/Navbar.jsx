import React, { useContext } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Spacer,
  Center,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import logo from "../Images/logo.png";
// import UserContext from "../Context/UserContext";
import avatar from "../Images/avatar-profile.png";
// import useAuth from "../Hooks/useAuth";
// import LoginModal from "./LoginModal";
// import SignupModal from "./SignupModal";
// import Logout from "./Logout";

function Navbar({ onOpen, onClose, ...rest }) {
  //   const { userInfo, avatarPreview } = useContext(UserContext);
  //   const { logoutUser } = useAuth();
  //   const { isLoggedIn, isAdmin } = useContext(UserContext);

  const handleLogOut = () => {
    // logoutUser();
  };
  return (
    <>
      <Flex
        ml={{ base: 0 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between" }}
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <NavLink to="/" className="logo">
            <Image src={logo} alt="logo" htmlWidth="200" />
          </NavLink>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          <NavLink to="home" className="logo">
            <Image src={logo} alt="logo" htmlWidth="200" />
          </NavLink>
        </Text>

        <Spacer />
        <Box display="flex" align="center" justify="center">
          <Center mr="7">
            <NavLink to="home" className="nav-link">
              Home
            </NavLink>
          </Center>
          <Center mr="7">
            <NavLink to="about" className="nav-link">
              About us
            </NavLink>
          </Center>

          <Center mr="7">
            <NavLink to="profile" className="nav-link">
              My profile
            </NavLink>
          </Center>
        </Box>
        <Spacer />

        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  {/* <Avatar size={"sm"} src={avatarPreview || avatar} /> */}
                  <Avatar size={"sm"} src={avatar} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {/* {userInfo.firstname} {userInfo.lastname} */}
                      Léa Ohana
                    </Text>
                    {/* {isLoggedIn && isAdmin && ( */}
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                    {/* )} */}
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                {/* {isLoggedIn && isAdmin && ( */}
                <MenuItem>
                  <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
                </MenuItem>
                {/* )} */}
                <MenuItem>
                  <NavLink to="/profile">Profile</NavLink>
                </MenuItem>
                <MenuDivider />
                {/* <MenuItem onClick={handleLogOut}>Log out</MenuItem> */}
                <MenuItem>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
        {/* ) : ( */}
        <Box>
          {/* {!isLoggedIn && <SignupModal />}
            {!isLoggedIn ? <LoginModal /> : <Logout />} */}
        </Box>
        {/* )} */}
      </Flex>
    </>
  );
}

export default Navbar;
