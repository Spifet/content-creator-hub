import React, { useState } from "react";
import { Radio, Stack, RadioGroup, Text, Button } from "@chakra-ui/react";

function Polls() {
  const [value, setValue] = useState("1");
  return (
    <>
      <Text mt={3} mb={2} fontWeight={"semibold"}>
        What's your favorite song?
      </Text>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="column" alignItems={"center"}>
          <Radio value="1">Song 1</Radio>
          <Radio value="2">Song 2</Radio>
          <Radio value="3">Song 3</Radio>
        </Stack>
        <Button mt={2}>Submit</Button>
      </RadioGroup>
    </>
  );
}

export default Polls;
