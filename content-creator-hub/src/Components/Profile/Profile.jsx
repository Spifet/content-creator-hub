import React, { useContext, useState, useRef } from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Stack,
  Button,
  AvatarBadge,
  IconButton,
  useColorModeValue,
  HStack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Textarea,
} from "@chakra-ui/react";
// import ChangePasswordModal from "./ChangePasswordModal";
import avatar from "../../img/avatar-profile.png";
import bgProfile from "../../img/bg-profile.jpg";
import { DownloadIcon } from "@chakra-ui/icons";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import UserContext from "../../Context/UserContext";
import useUsers from "../../Hooks/useUsers";

export default function Profile() {
  const { userInfo, avatarPreview, setAvatarPreview } = useContext(UserContext);
  const { updateProfile, uploadUserPicture, setFileData } = useUsers();
  const [avatarPath, setAvatarPath] = useState("");
  const inputFileRef = useRef(null);

  function validateFirstName(value) {
    let error;
    if (!value) {
      error = "First Name is required";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      error = "Please enter a valid email address.";
    }
    return error;
  }

  const onButtonAvatarClick = () => {
    inputFileRef.current.click();
  };

  return (
    <>
      <Center py={6} mb={"70px"}>
        <Box
          maxW={"470px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image h={"120px"} w={"full"} src={bgProfile} objectFit={"cover"} />
          <Flex justify={"center"} mt={-12}>
            <Avatar size="xl" src={avatarPreview || avatar}>
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="primary"
                aria-label="upload Image"
                icon={<DownloadIcon />}
                onClick={onButtonAvatarClick}
              />
            </Avatar>
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {/* {userInfo.firstname} {userInfo.lastname} */}
                Test Profile
              </Heading>
            </Stack>

            <Formik
              initialValues={{
                // firstname: userInfo.firstname || "",
                // lastname: userInfo.lastname || "",
                // phonenumber: userInfo.phonenumber || "",
                // email: userInfo.email || "",
                // shortbio: userInfo.shortbio || "",
                // password: "",
                // newpassword: "",
                // userPicture: "",
                firstname: "",
                lastname: "",
                phonenumber: "",
                email: "",
                shortbio: "",
                password: "",
                newpassword: "",
                userPicture: "",
              }}
              enableReinitialize
              onSubmit={async (values, actions) => {
                if (values.userPicture) {
                  const userPictureURL = await uploadUserPicture();
                  userPictureURL
                    ? (values.userPicture = userPictureURL)
                    : (values.userPicture = "");
                }

                console.log("values being passed ==> ", values);
                updateProfile(values, actions);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  {/* Hidden input for profile picture, using Ref */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputFileRef}
                    style={{ display: "none" }}
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];

                      setAvatarPath(event.currentTarget.value);

                      props.setFieldValue("userPicture", file);
                      const fileReader = new FileReader();
                      fileReader.readAsDataURL(file);
                      fileReader.onloadend = () => {
                        setAvatarPreview(fileReader.result);
                        setFileData(fileReader.result);
                        // }
                      };
                    }}
                    id="userPicture"
                    name="userPicture"
                  />

                  {/* Rest of the form */}
                  <HStack>
                    <Field name="firstname" validate={validateFirstName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.firstname && form.touched.firstname
                          }
                        >
                          <FormLabel htmlFor="firstname">First name</FormLabel>
                          <Input
                            {...field}
                            id="firstname"
                            value={props.values.firstname}
                            placeholder="First Name"
                          />
                          <FormErrorMessage>
                            {form.errors.firstname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastname">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.lastname && form.touched.lastname
                          }
                        >
                          <FormLabel htmlFor="lastname">Last name</FormLabel>
                          <Input
                            {...field}
                            id="lastname"
                            value={props.values.lastname}
                            placeholder="Last Name"
                          />
                          <FormErrorMessage>
                            {form.errors.lastname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel mt="10px" htmlFor="email">
                          Email address
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <Icon
                                as={BsFillEnvelopeFill}
                                color={"gray.300"}
                                w={5}
                                h={5}
                              />
                            }
                          />
                          <Input
                            {...field}
                            id="email"
                            value={props.values.email}
                            placeholder="Update your Email address"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Phone Number */}
                  <Field name="phonenumber">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.phonenumber && form.touched.phonenumber
                        }
                      >
                        <FormLabel mt="10px" htmlFor="phonenumber">
                          Phone Number
                        </FormLabel>
                        <Input
                          {...field}
                          id="phonenumber"
                          value={props.values.phonenumber}
                          placeholder="Update your Phone number"
                        />
                        <FormErrorMessage>
                          {form.errors.phonenumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="shortbio">
                    {({ field, form }) => (
                      <FormControl
                        mt="10px"
                        isInvalid={
                          form.errors.shortbio && form.touched.shortbio
                        }
                      >
                        <FormLabel mt="10px" htmlFor="shortbio">
                          Short Bio
                        </FormLabel>

                        <Textarea
                          {...field}
                          id="shortbio"
                          value={props.values.shortbio}
                          placeholder="Add a few words about yourself..."
                          size="sm"
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    variant="solid"
                    width="full"
                    rounded={"full"}
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                    colorScheme={"red"}
                    bg={"#FF960B"}
                    _hover={{ bg: "#ff790b" }}
                    mt="14px"
                    mb="11px"
                  >
                    Save changes
                  </Button>
                </Form>
              )}
            </Formik>
            {/* <ChangePasswordModal /> */}
          </Box>
        </Box>
      </Center>
    </>
  );
}
