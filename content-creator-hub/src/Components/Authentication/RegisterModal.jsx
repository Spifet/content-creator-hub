import React, { useState } from "react";
import {
  HStack,
  useDisclosure,
  Button,
  Flex,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { BiShow, BiHide, BiNetworkChart } from "react-icons/bi";
import { Formik, Form, Field } from "formik";

// import useAuth from "../Hooks/useAuth";

function RegisterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordRepeatShown, setPasswordRepeatShown] = useState(false);
  //   const { registerUser } = useAuth();

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleShowRePassword = () => {
    setPasswordRepeatShown(!passwordRepeatShown);
  };

  function validateFirstName(value) {
    let error;
    if (!value) {
      error = "First Name is required";
    }
    return error;
  }

  function validateLastName(value) {
    let error;
    if (!value) {
      error = "Last Name is required";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "An email address is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      error = "Please enter a valid email address.";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "A password is required";
    }
    return error;
  }

  function validateRepassword(repasswordvalue, passwordvalue) {
    let error;
    if (!repasswordvalue) {
      error = "A password is required";
    } else if (repasswordvalue !== passwordvalue) {
      error = "Passwords don't match.";
    }
    return error;
  }

  return (
    <>
      <Button
        rounded={"full"}
        px={6}
        colorScheme={"orange"}
        bg={"orange.400"}
        _hover={{ bg: "orange.500" }}
        onClick={onOpen}
      >
        Register
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Flex direction="column" justify="center" align="center" mt="30px">
            <Icon w={8} h={8} as={BiNetworkChart} color="#000072" />
            <Heading color="#000072" fontFamily="Concert One">
              Create account
            </Heading>
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                phonenumber: "",
                email: "",
                password: "",
                repassword: "",
              }}
              onSubmit={(values, actions) => {
                // console.log(registerUser);
                // registerUser(values, actions, onClose);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <HStack>
                    <Field name="firstname" validate={validateFirstName}>
                      {({ field, form }) => (
                        <FormControl
                          isRequired
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
                            onKeyUp={() => props.setStatus(false)}
                          />
                          <FormErrorMessage>
                            {form.errors.firstname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastname" validate={validateLastName}>
                      {({ field, form }) => (
                        <FormControl
                          isRequired
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
                            onKeyUp={() => props.setStatus(false)}
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
                        isRequired
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
                            placeholder="Enter your Email address"
                            onKeyUp={() => props.setStatus(false)}
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        mt="10px"
                        isRequired
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={
                              <Icon
                                as={BsLockFill}
                                color={"gray.300"}
                                w={5}
                                h={5}
                              />
                            }
                          />
                          <Input
                            {...field}
                            id="password"
                            value={props.values.password}
                            placeholder="Create a password"
                            type={passwordShown ? "text" : "password"}
                            onKeyUp={() => props.setStatus(false)}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleShowPassword}
                            >
                              <Icon
                                as={passwordShown ? BiHide : BiShow}
                                color={"gray.600"}
                                w={5}
                                h={5}
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field
                    name="repassword"
                    validate={(value) =>
                      validateRepassword(value, props.values.password)
                    }
                  >
                    {({ field, form }) => (
                      <FormControl
                        mt="10px"
                        isRequired
                        isInvalid={
                          form.errors.repassword && form.touched.repassword
                        }
                      >
                        <FormLabel htmlFor="repassword">
                          Re-enter your password
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={
                              <Icon
                                as={BsLockFill}
                                color={"gray.300"}
                                w={5}
                                h={5}
                              />
                            }
                          />
                          <Input
                            {...field}
                            id="repassword"
                            type={passwordRepeatShown ? "text" : "password"}
                            value={props.values.repassword}
                            placeholder="Re-enter the same password"
                            onKeyUp={() => props.setStatus(false)}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleShowRePassword}
                            >
                              <Icon
                                as={passwordRepeatShown ? BiHide : BiShow}
                                color={"gray.600"}
                                w={5}
                                h={5}
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.repassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

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
                          placeholder="Enter a Phone number"
                          onKeyUp={() => props.setStatus(false)}
                        />
                        <FormErrorMessage>
                          {form.errors.phonenumber}
                        </FormErrorMessage>
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
                    Sign up
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterModal;
