import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import axios from "axios";
import localforage from "localforage";
import { useToast } from "@chakra-ui/react";

function useUsers() {
  const {
    userInfo,
    setUserInfo,
    setProfileUpdated,
    setAllUsers,
    setUniqueUser,
    setHasLoader,
    setOwnedPetsUser,
  } = useContext(UserContext);
  const toast = useToast();
  const [fileData, setFileData] = useState();

  const updatePassword = async (newPasswordValues, actions, onClose) => {
    const userId = userInfo._id;
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
    };

    try {
      const response = await axios.put(
        `http://localhost:4000/users/password/${userId}`,
        newPasswordValues,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        toast({
          title: "Success! 😻",
          description: "Your password has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (err) {
      console.log("password update err", err);
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

  const updateProfile = async (newUserValues, actions) => {
    const userId = userInfo._id;
    console.log("user ID ==> ", userId);
    console.log(
      "UPDATE PROFILE userUsers, New user values ==> ",
      newUserValues
    );

    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
    };

    try {
      const response = await axios.put(
        `http://localhost:4000/users/${userId}`,
        newUserValues,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success! 😻",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setUserInfo(newUserValues);
        setProfileUpdated(true);
      }

      console.log("updated user Info ==> ", response);
    } catch (err) {
      console.log("profile update err", err);
      const errMsg = JSON.stringify(err.response.data.message);
      actions.setStatus(errMsg);
      toast({
        title: "Error 😿",
        description: errMsg,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setProfileUpdated(false);
    }
  };

  const uploadUserPicture = async () => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
      "Content-type": "application/json",
    };

    const jsonData = JSON.stringify({ data: fileData });

    try {
      const responseURL = await axios({
        url: "http://localhost:4000/uploads/image/user",
        method: "POST",
        headers: headers,
        data: jsonData,
      });
      console.log("response user img upload ==>", responseURL);

      return responseURL.data;
    } catch (err) {
      console.log("img upload failed ==> ", err);
    }
  };

  const getAllUsers = async () => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
    };

    try {
      const response = await axios.get("http://localhost:4000/users/", {
        headers: headers,
      });

      // console.log("response getAllUsers ==> ", response);
      response ? setAllUsers(response.data.reverse()) : setAllUsers(null);
      return response.data;
    } catch (error) {
      console.log("err get All Users");
      const errMsg = JSON.stringify(error.response.data.message);
      toast({
        title: "Error 😿",
        description: errMsg,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return error;
    }
  };

  const getUserById = async (userId) => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
    };

    try {
      const response = await axios.get(
        `http://localhost:4000/users/${userId}`,
        {
          headers: headers,
        }
      );
      setHasLoader(false);
      response ? setUniqueUser(response.data) : setUniqueUser(null);
      return response.data;
    } catch (err) {
      console.log("get user by id err", err);
      const errMsg = JSON.stringify(err.response.data.message);

      toast({
        title: "Error 😿",
        description: errMsg,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setProfileUpdated(false);
    }
  };

  const getOwnedPetsUser = async (ownedPetsList) => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const headers = {
      Authorization: ACCESS_TOKEN,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/users/ownedPets`,
        ownedPetsList,
        {
          headers: headers,
        }
      );
      // setHasLoader(false);
      response ? setOwnedPetsUser(response.data) : setOwnedPetsUser(null);

      console.log("RESPONSE GET OWNED PETS useUsers ==> ", response.data);
      return response.data;
    } catch (err) {
      console.log("owned pets user (useUsers) => ", err);
    }
  };

  return {
    updateProfile,
    updatePassword,
    uploadUserPicture,
    setFileData,
    getAllUsers,
    getUserById,
    getOwnedPetsUser,
  };
}
export default useUsers;
