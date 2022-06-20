import React from "react";
import { Button } from "@chakra-ui/react";
// import useAuth from "../Hooks/useAuth";

function Logout() {
  //   const { logoutUser } = useAuth();

  //   const handleLogOut = () => {
  //     logoutUser();
  //   };

  return (
    <>
      <Button mr="4" onClick={handleLogOut}>
        Log out
      </Button>
    </>
  );
}

export default Logout;
