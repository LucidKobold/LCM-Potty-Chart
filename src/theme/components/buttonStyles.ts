/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { darken, mode, whiten } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const buttonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props: Dict<never>) => ({
      bg: "brand.primary",
      fontSize: "xl",
      py: 3,
      px: 4,
      color: "whiteAlpha",
      _hover: {
        bg: mode(
          whiten("brand.primary", 20),
          darken("brand.primary", 20)
        )(props)
      }
    }),
    secondary: (props: Dict<never>) => ({
      bg: "brand.secondary",
      fontSize: "xl",
      py: 3,
      px: 4,
      color: "whiteAlpha",
      _hover: {
        bg: mode(
          whiten("brand.secondary", 20),
          darken("brand.secondary", 20)
        )(props)
      }
    }),
    unthemed: (props: Dict<never>) => ({
      bg: "gray.600",
      fontSize: "xl",
      py: 3,
      px: 4,
      color: "whiteAlpha",
      _hover: {
        bg: mode(
          whiten("brand.primary", 20),
          darken("brand.primary", 20)
        )(props)
      }
    }),
    skip: (props: Dict<never>) => ({
      bg: "transparent",
      fontSize: "xl",
      py: 3,
      px: 4,
      color: "whiteAlpha.800",
      _hover: {
        bg: mode(whiten("brand.danger", 20), darken("brand.danger", 20))(props),
        color: "whiteAlpha.900"
      }
    }),
    stickerButton: (props: Dict<never>) => ({
      bg: "transparent",
      fontSize: "4rem",
      px: 2,
      py: 14,
      _hover: {
        bg: mode(
          whiten("brand.secondary", 20),
          darken("brand.secondary", 20)
        )(props)
      }
    }),
    nav: (props: Dict<never>) => ({
      bg: "transparent",
      fontSize: "md",
      px: 2,
      _hover: {
        bg: mode(
          whiten("brand.secondary", 20),
          darken("brand.secondary", 20)
        )(props)
      }
    }),
    submit: (props: Dict<never>) => ({
      fontSize: "lg",
      py: 2,
      px: 4,
      type: "submit",
      _hover: {
        color: "whiteAlpha.900",
        bg: mode(whiten("brand.valid", 20), darken("brand.valid", 20))(props),
        _disabled: {
          color: mode(
            whiten("brand.danger", 20),
            darken("brand.danger", 20)
          )(props),
          boxShadow:
            "rgba(252, 129, 129, .95) 0px 0px 15px, rgba(252, 129, 129, 0.75) 0px 0px 3px 1px",
          border: "1px solid #FC8181"
        }
      }
    }),
    mobileNav: (props: Dict<never>) => ({
      // bg: "transparent",
      fontSize: "md",
      px: 2,
      bg: "rgba(255, 255, 255, .15)",
      border: "1px solid #0068ff",
      boxShadow:
        "rgba(0, 134, 255, 0.30) 0px 0px 15px, rgba(0, 134, 255, 0.15) 0px 0px 3px 1px",
      _hover: {
        bg: mode(
          whiten("brand.secondary", 20),
          darken("brand.secondary", 20)
        )(props),
        boxShadow:
          "rgba(0, 134, 255, 0.5) 0px 0px 15px, rgba(0, 134, 255, 0.3) 0px 0px 3px 1px"
      },
      _expanded: {
        bg: "brand.primary",
        boxShadow:
          "rgba(0, 134, 255, 0.5) 0px 0px 15px, rgba(0, 134, 255, 0.3) 0px 0px 3px 1px",
        border: "1px solid #0068ff"
      }
    }),
    kofi: (props: Dict<never>) => ({
      bg: "brand.kofi",
      fontSize: "lg",
      p: 3,
      color: "whiteAlpha",
      _hover: {
        bg: mode(whiten("brand.kofi", 20), darken("brand.kofi", 20))(props)
      }
    }),
    twitter: (props: Dict<never>) => ({
      bg: "brand.twitter",
      fontSize: "lg",
      py: 3,
      px: 4,
      color: "whiteAlpha",
      _hover: {
        bg: mode(
          whiten("brand.twitter", 20),
          darken("brand.twitter", 20)
        )(props)
      }
    }),
    signIn: () => ({
      bg: "transparent",
      fontSize: "lg",
      py: 3,
      px: 4,
      color: "whiteAlpha",
      border: "1px solid #0068ff",
      _hover: {
        boxShadow:
          "rgba(0, 134, 255, 0.5) 0px 0px 15px, rgba(0, 134, 255, 0.3) 0px 0px 3px 1px"
      }
    })
  },
  // default values for `size` and `variant`
  defaultProps: {}
};

export default buttonStyles;
