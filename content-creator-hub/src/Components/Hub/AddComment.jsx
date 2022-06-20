import React, { useState, useContext } from "react";
import { Textarea, Text, Box, Button } from "@chakra-ui/react";
import UserContext from "../../Context/UserContext";
import PostContext from "../../Context/PostContext";

function AddComment() {
  const [charsRemaining, setCharsRemaining] = useState(140);
  const [disabled, setDisabled] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { commentText, setCommentText } = useContext(PostContext);
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

  const ShowErrorMessage = () => {
    if (charsRemaining <= -1) {
      return (
        <Box color={"red"}>
          <Box>The tweet can't contain more than 140 characters.</Box>
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

  const handleCommentText = (event) => {
    setCommentText(event.target.value);
  };

  const handleButton = () => {
    const userId = userInfo.uid;
    if (commentText) {
      // addNewComment(commentText, userId, userInfo.photoURL);
      setCommentText("");
      setCharsRemaining(maxLength);
      setDisabled(true);
    } else {
      alert("Please add a Tweet");
      setDisabled(true);
    }
  };

  return (
    <>
      <Textarea
        mt={3}
        isInvalid={charsRemaining <= -1 ? true : false}
        placeholder="Interact with the community here..."
        bg="purple.50"
        onKeyUp={calcChars}
        value={commentText}
        onChange={handleCommentText}
      />

      <ShowErrorMessage />
      <Button
        bg={"#9F7AEA"}
        _hover={{ bg: "#824AF1" }}
        color={"white"}
        mt={2}
        onClick={handleButton}
        isDisabled={disabled ? true : false}
      >
        Post comment
      </Button>
    </>
  );
}

export default AddComment;
