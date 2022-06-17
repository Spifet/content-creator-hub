import { useContext } from "react";
import UserContext from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { useToast } from "@chakra-ui/react";

function useAuth() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
    isAdmin,
    setIsAdmin,
    setAvatarPreview,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const toast = useToast();

  const registerUser = async (values, actions, onClose) => {
    try {
      console.log("value ==> ", values);
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        values
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log("response access token ", response.data.ACCESS_TOKEN);
        localforage.setItem("ACCESS_TOKEN", response.data.ACCESS_TOKEN);
        toast({
          title: "Congratulations! 😻",
          description: "Your account has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        !isAdmin ? navigate("/") : navigate("/dashboard");
        // console.log("response ==> ", response);
      }
    } catch (err) {
      console.log("error", err);
      const errMsg = JSON.stringify(err.response.data.message);

      actions.setStatus(errMsg);
      toast({
        title: "Error 😿",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const loginUser = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        values
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        localforage.setItem("ACCESS_TOKEN", response.data);
        console.log("response access token ", response.data);
        toast({
          title: "Welcome back! 😻",
          description: "You have successfully signed in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        !isAdmin ? navigate("/") : navigate("/dashboard");
      }
    } catch (err) {
      console.log("error", err);
      const errMsg = JSON.stringify(err.response.data.message);
      actions.setStatus(errMsg);
      toast({
        title: "Error 😿",
        description: errMsg,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const loggedInCheck = async () => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
    };

    if (ACCESS_TOKEN) {
      try {
        const getMe = await axios.get("http://localhost:4000/users/getMe", {
          headers: headers,
        });
        console.log("getMe ==> ", getMe);
        await localforage.setItem("userInfo", getMe.data);

        return getMe.data;
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
        localforage.clear();
        setIsAdmin(false);
        navigate("/");
      }
    } else {
      return false;
    }
  };

  const logoutUser = () => {
    localforage.clear();
    toast({
      title: "See you soon 😻",
      description: "You have been successfully logged out",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsLoggedIn(false);
    setIsAdmin(false);
    setAvatarPreview("");
    navigate("/");
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
    registerUser,
    loggedInCheck,
    loginUser,
    logoutUser,
  };
}

export default useAuth;
