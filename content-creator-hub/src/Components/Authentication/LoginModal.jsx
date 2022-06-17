import React, { useState } from "react";
import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { BiShow, BiHide, BiNetworkChart } from "react-icons/bi";
import { Formik, Form, Field } from "formik";
// import useAuth from "../Hooks/useAuth";

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordShown, setPasswordShown] = useState(false);

  //   const { loginUser } = useAuth();

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

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

  return (
    <>
      <Button rounded={"full"} px={6} onClick={onOpen}>
        Login
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Flex direction="column" justify="center" align="center" mt="30px">
            <Icon w={8} h={8} as={BiNetworkChart} color="#000072" />
            <Heading color="#000072" fontFamily="Concert One" mb="10px">
              Welcome back
            </Heading>
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, actions) => {
                // loginUser(values, actions, onClose);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.email && form.touched.email}
                      >
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
                            placeholder="Your Email address"
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
                            placeholder="Your password"
                            type={passwordShown ? "text" : "password"}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleShowPassword}
                            >
                              {passwordShown ? (
                                <Icon
                                  as={BiHide}
                                  color={"gray.600"}
                                  w={5}
                                  h={5}
                                />
                              ) : (
                                <Icon
                                  as={BiShow}
                                  color={"gray.600"}
                                  w={5}
                                  h={5}
                                />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
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
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
