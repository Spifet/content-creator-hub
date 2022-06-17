import React, { useState, useContext } from "react";
import { Textarea, Text, Box, Button } from "@chakra-ui/react";
import PostContext from "../../Context/PostContext";
import UserContext from "../../Context/UserContext";

function AddAnnouncement() {
  const [charsRemaining, setCharsRemaining] = useState(140);
  const [disabled, setDisabled] = useState(false);
  const { setAnnouncementText, announcementText } = useContext(PostContext);
  const { userInfo } = useContext(UserContext);
  const maxLength = 140;

  const calcChars = (e) => {
    const userText = e.target.value;
    if (userText) {
      const textLength = userText.length;
      const calcRemaining = maxLength - textLength;
      setCharsRemaining(calcRemaining);

      if (calcRemaining <= -1) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
      setCharsRemaining(140);
    }
  };

  const handleAnnouncementText = (event) => {
    setAnnouncementText(event.target.value);
  };

  const handleButton = () => {
    const userId = userInfo.uid;
    if (announcementText) {
      // addNewComment(announcementText, userId, userInfo.photoURL);
      setAnnouncementText("");
      setCharsRemaining(maxLength);
      setDisabled(true);
    } else {
      alert("Please add a Tweet");
      setDisabled(true);
    }
  };

  const ShowErrorMessage = () => {
    if (charsRemaining <= -1) {
      return (
        <Box color={"red"}>
          <Box>The announcement can't contain more than 140 characters.</Box>
          <Text>{charsRemaining}</Text>
        </Box>
      );
    } else {
      return (
        <Text className="chars-remaining">
          {charsRemaining} characters remaining
        </Text>
      );
    }
  };

  return (
    <>
      <Textarea
        mt={3}
        isInvalid={charsRemaining <= -1 ? true : false}
        placeholder="Add an announcement here..."
        bg="#FFF4E9"
        onKeyUp={calcChars}
        value={announcementText}
        onChange={handleAnnouncementText}
      />
      <ShowErrorMessage />
      <Button
        bg={"#FF960B"}
        _hover={{ bg: "#ff790b" }}
        color={"white"}
        mt={2}
        onClick={handleButton}
        isDisabled={disabled ? true : false}
      >
        Post announcement
      </Button>
    </>
  );
}

export default AddAnnouncement;
