import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import localforage from "localforage";
export const PostContext = React.createContext({});

//Creating a func component to return the context provider to children it's wrapping
export const PostProvider = ({ children }) => {
  const [commentText, setCommentText] = useState(undefined || "");
  const [announcementText, setAnnouncementText] = useState(undefined || "");

  return (
    <PostContext.Provider
      value={{
        commentText,
        setCommentText,
        announcementText,
        setAnnouncementText,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
