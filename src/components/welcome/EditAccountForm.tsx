import {
  VStack,
  FormControl,
  HStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Textarea,
  Heading
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import editUserProfile from "../../../lib/api/mutation/editUserProfile";
import ImageUploadModal from "../profile/ImageUploadModal";

interface EditAccountProps {
  userId: string;
  name?: string;
  username?: string;
  image?: string;
  bio?: string;
  loading: boolean;
}

/**
 * The form for editing the user's account information.
 * @param {string} userId the user id from the session.
 * @param {string} name the user's name from the session.
 * @param {string} username the username id from the session.
 * @param {string} image the user's image id from the session.
 * @param {string} bio the user's bio from the session.
 * @param {boolean} loading is tha data being fetched from the session?
 */

const EditAccountForm = ({
  userId,
  name,
  username,
  image,
  bio,
  loading
}: EditAccountProps): JSX.Element => {
  // Form field valid statuses.
  const [validName, setValidName] = useState<boolean>(false);
  const [validUsername, setValidUsername] = useState<boolean>(false);
  const [validBio, setValidBio] = useState<boolean>(false);

  const validateName = (newName: string): string | undefined => {
    let errorMessage;

    if (!newName) {
      errorMessage = "Please enter a name.";
      setValidName(false);
    } else if (newName === "") {
      errorMessage = "Please enter a name.";
      setValidName(false);
    } else if (newName.length < 5 || newName.length > 25) {
      errorMessage = "Name must be between 5 and 25 characters.";
      setValidName(false);
    } else {
      setValidName(true);
    }
    return errorMessage;
  };

  const validateUsername = (newUsername: string): string | undefined => {
    let errorMessage;

    if (!newUsername) {
      errorMessage = "Please enter a username.";
      setValidUsername(false);
    } else if (newUsername === "") {
      errorMessage = "Please enter a username.";
      setValidUsername(false);
    } else if (newUsername.length < 5 || newUsername.length > 25) {
      errorMessage = "Username must be between 5 and 25 characters.";
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }

    return errorMessage;
  };

  const validateBio = (newBio: string): string | undefined => {
    let errorMessage;

    if (newBio.length > 250) {
      errorMessage = "Bio cannot exceed 250 characters.";
      setValidBio(false);
    } else {
      setValidBio(true);
    }

    return errorMessage;
  };

  // Entire form valid
  const [validForm, setValidForm] = useState<boolean>(false);

  // Validate the fields on change.
  useEffect(() => {
    if (!validName || !validUsername || !validBio) {
      setValidForm(false);
    }

    if (validName && validUsername && validBio) {
      setValidForm(true);
    }
  }, [validBio, validName, validUsername]);

  const [newImage, setNewImage] = useState<string>(image);

  // Field theme
  const fieldTheme = {
    width: "100%",
    bg: "gray.900",
    borderColor: "white",
    _placeholder: {
      color: "white"
    },
    _focus: {
      bg: "#000",
      color: "#FFF",
      borderColor: "#63b3ed",
      boxShadow: "0 0 0 1px #63b3ed",
      zIndex: "1"
    }
  };

  interface NewProfileInfo {
    name: string;
    username: string;
    bio: string;
    image: string;
  }

  const submitChanges = ({ name, username, bio, image }: NewProfileInfo) =>
    editUserProfile({ userId, name, username, bio, image });

  // ! Add a "preview changes" button that doesn't submit the changes.
  // ! Add a "reset preview" button that changes the profile header back to values form the session.

  return (
    <Formik
      initialValues={{
        userId,
        name,
        username,
        image,
        bio
      }}
      onSubmit={(values, actions) => {
        submitChanges({ ...values, image: newImage })
          .then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
          })
          .catch((err) => {
            actions.setSubmitting(false);
            console.warn(err);
          });
      }}
    >
      {(props) => (
        <Form
          style={{
            width: "100%",
            height: "auto",
            textAlign: "center",
            display: "contents"
          }}
        >
          <VStack
            h="auto"
            w={{ base: "100%", md: "80vw", lg: "50vw" }}
            spacing={6}
          >
            <Heading as="h1">{"Edit your profile"}</Heading>
            <ImageUploadModal
              name={name}
              image={image}
              loading={loading}
              isSubmitting={props.isSubmitting}
              formInvalid={validForm}
              newImage={newImage}
              setNewImage={setNewImage}
            />
            <Field name="name" validate={validateName}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.name && form.touched.name ? true : false
                  }
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormLabel fontSize="xl" w="6rem" htmlFor="name">
                      {"Name"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={4}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Input
                        required
                        {...fieldTheme}
                        {...field}
                        type="name"
                        id="name"
                        name="name"
                        placeholder="John Doe."
                        isDisabled={form.isSubmitting}
                        {...(!form.errors.name && form.touched.name
                          ? {
                              borderColor: "brand.valid",
                              boxShadow: "0 0 0 1px #00c17c",
                              _hover: {
                                borderColor: "brand.valid",
                                boxShadow: "0 0 0 1px #00c17c"
                              }
                            }
                          : "")}
                      />
                      <FormErrorMessage>
                        {typeof form.errors.name === "string"
                          ? form.errors.name
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <Field name="username" validate={validateUsername}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.username && form.touched.username ? true : false
                  }
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormLabel fontSize="xl" w="6rem" htmlFor="username">
                      {"Username"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={4}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Input
                        required
                        {...fieldTheme}
                        {...field}
                        type="username"
                        id="username"
                        name="username"
                        placeholder="username"
                        isDisabled={form.isSubmitting}
                        {...(!form.errors.username && form.touched.username
                          ? {
                              borderColor: "brand.valid",
                              boxShadow: "0 0 0 1px #00c17c",
                              _hover: {
                                borderColor: "brand.valid",
                                boxShadow: "0 0 0 1px #00c17c"
                              }
                            }
                          : "")}
                      />
                      <FormErrorMessage>
                        {typeof form.errors.username === "string"
                          ? form.errors.username
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <Field name="bio" validate={validateBio}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={form.errors.bio && form.touched.bio ? true : false}
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <FormLabel fontSize="xl" w="6rem" htmlFor="bio">
                      {"Bio"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={4}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Textarea
                        required
                        {...fieldTheme}
                        {...field}
                        isDisabled={form.isSubmitting}
                        id="bio"
                        rows={4}
                        placeholder="I am a furry looking to track my weekly chores and reward myself with pretty stickers and praise from friends."
                        {...(!form.errors.bio && form.touched.bio
                          ? {
                              borderColor: "brand.valid",
                              boxShadow: "0 0 0 1px #00c17c",
                              _hover: {
                                borderColor: "brand.valid",
                                boxShadow: "0 0 0 1px #00c17c"
                              }
                            }
                          : "")}
                      />
                      <FormErrorMessage>
                        {typeof form.errors.bio === "string"
                          ? form.errors.bio
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <VStack h="auto" w="100%" spacing={4}>
              <Button
                type="submit"
                variant="submit"
                isDisabled={!validForm}
                isLoading={props.isSubmitting}
              >
                {"Submit Changes"}
              </Button>
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default EditAccountForm;
