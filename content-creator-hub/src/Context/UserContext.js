import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import localforage from "localforage";
export const UserContext = React.createContext({});

//Creating a func component to return the context provider to children it's wrapping
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const { loggedInCheck } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [path, setPath] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [uniqueUser, setUniqueUser] = useState(null);
  const [hasLoader, setHasLoader] = useState(null);
  //   const [ownedPetsUser, setOwnedPetsUser] = useState([]);
  //   const { petInfo } = useContext(PetContext);

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    async function checkLoggedIn() {
      setIsLoading(true);
      const user = await loggedInCheck();

      if (user) {
        setIsLoggedIn(true);
        setIsLoading(false);
        if (user.userPicture !== "") {
          setAvatarPreview(user.userPicture);
        }
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    }
    checkLoggedIn();
    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn, profileUpdated]);

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    const getUserInfo = async () => {
      setIsLoading(true);
      const user = await localforage.getItem("userInfo");
      if (user) {
        setUserInfo(user);
        console.log("use effect 2 user ==> ", user);
        user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
      } else {
        setUserInfo({});
      }
    };

    getUserInfo();
    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn]);

  const pathname = window.location.pathname;

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    async function updatePath() {
      setPath(pathname);
    }

    updatePath();
    return () => {
      subscription.unsubscribe();
    };
  }, [path, pathname]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        isAdmin,
        setIsAdmin,
        path,
        setPath,
        setIsLoading,
        isLoading,
        setProfileUpdated,
        avatarPreview,
        setAvatarPreview,
        allUsers,
        setAllUsers,
        uniqueUser,
        setUniqueUser,
        hasLoader,
        setHasLoader,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
