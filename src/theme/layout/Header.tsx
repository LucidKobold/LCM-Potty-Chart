import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Heading,
  HStack,
  Box,
  IconButton,
  Menu,
  MenuButton,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  SkeletonCircle,
  Text,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverFooter
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import appLogo from "../../../public/images/logo.svg";
import Image from "next/image";
import SignOutButton from "../../components/auth/buttons/SingnOutButton";
import CustomButton from "../../components/buttons/Custom";

const Header = (): JSX.Element => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const appName = "LCM Potty Chart";
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION_HEADER || "";

  // Mobile Menu Icon && Open/Close
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const menuIcon = (): JSX.Element => {
    const iconType = {
      default: <Icon icon="bx:bx-menu-alt-right" />,
      hover: <Icon icon="bx:bx-menu" />,
      open: <Icon icon="bx:bx-x" />
    };

    if (open) {
      return iconType.open;
    } else if (hover) {
      return iconType.hover;
    } else {
      return iconType.default;
    }
  };

  // User session and profile
  const { data: session, status } = useSession();

  return (
    <Box
      zIndex={1}
      w="100%"
      pos="fixed"
      top={0}
      alignItems="center"
      boxShadow={
        open
          ? "none"
          : "rgba(0, 134, 255, 0.75) 0px 0px 15px, rgba(0, 134, 255, 0.5) 0px 0px 3px 1px"
      }
      bg={open ? "brand.main" : "rgba(49, 56, 220, 0.9)"}
      transition=".5s ease"
      borderRadius="0px 0px 10px 10px"
      _hover={{
        bg: "brand.main",
        boxShadow: open
          ? "none"
          : "rgba(0, 134, 255, 0.9) 0px 0px 15px, rgba(0, 134, 255, 0.7) 0px 0px 3px 1px"
      }}
      h={open ? "125px" : "auto"}
    >
      {/* Logo | Site Name */}
      <HStack
        display={{ base: "flex", lg: "none" }}
        position="absolute"
        width="100%"
        height={12}
        top={0}
        ml={4}
        spacing="5px"
        justifyContent={{
          base: "flex-start",
          sm: "center"
        }}
        alignItems="center"
        _hover={{
          cursor: "default"
        }}
      >
        <Image height="30px" width="30px" src={appLogo} alt="App Logo" />
        <Heading as="h1" size="md">
          {appName}
        </Heading>
        <Heading color="whiteAlpha.500" as="h2" size="sm">
          {appVersion}
        </Heading>
      </HStack>

      {/* Desktop Nav Items and Mobile Menu Button */}
      <HStack
        w="100%"
        px={4}
        h={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack
          w="100%"
          h="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w="auto" display={{ base: "flex", lg: "none " }}></Box>
          <Box w="100%" display={{ base: "none", lg: "flex" }} m="auto">
            <HStack
              width="100%"
              alignItems="center"
              height="auto"
              spacing="5px"
              _hover={{
                cursor: "default"
              }}
            >
              <Image height="30px" width="30px" src={appLogo} alt="App Logo" />
              <Heading as="h1" size="md">
                {appName}
              </Heading>
              <Heading color="whiteAlpha.500" as="h2" size="sm">
                {appVersion}
              </Heading>
            </HStack>
          </Box>
          <DesktopNav />
        </HStack>
        <Menu isLazy lazyBehavior="unmount" isOpen={open}>
          <MenuButton
            id="mobile-menu-button"
            as={IconButton}
            aria-label="Mobile Menu"
            icon={menuIcon()}
            display={{
              base: "inline-flex",
              lg: "none"
            }}
            variant="mobileNav"
            type="button"
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <MobileNav updateOpen={setOpen} />
        </Menu>
        <Box alignItems="center">
          <Popover
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => {
              if (!session) {
                router.push("/auth/signin");
                setIsOpen(false);
              }

              if (session) {
                setIsOpen(true);
              }
            }}
          >
            <PopoverTrigger>
              <Button
                rounded="full"
                variant="nav"
                cursor="pointer"
                p={0}
                m={0}
                type="button"
              >
                {session ? (
                  status === "loading" ? (
                    <SkeletonCircle size="1.5rem" />
                  ) : session.user.image ? (
                    <Avatar
                      name={session.user.name}
                      size="sm"
                      src={session.user.image}
                    />
                  ) : (
                    <Text fontSize="2rem">
                      <Icon icon="carbon:user-avatar-filled-alt" />
                    </Text>
                  )
                ) : (
                  <Text fontSize="2rem">
                    <Icon icon="carbon:user-avatar-filled-alt" />
                  </Text>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent mt={2} mr={4} textAlign="center">
              {/* <PopoverArrow /> */}
              <PopoverCloseButton />
              <PopoverHeader>{"User Actions"}</PopoverHeader>
              <PopoverBody>
                <CustomButton
                  text={"Profile"}
                  link={"/profile"}
                  type={"primary"}
                  newTab={false}
                />
              </PopoverBody>
              <PopoverFooter>
                <SignOutButton />
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
      </HStack>
    </Box>
  );
};

export default Header;
