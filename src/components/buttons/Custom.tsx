import React from "react";
import { Box, Link, Button, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CustomButtonProps {
  text: string;
  link: string;
  type: "primary" | "secondary" | "footer";
  newTab: boolean;
}

const MotionBox = motion<BoxProps>(Box);

/**
 * Used to generate custom motion buttons.
 * @param {string} text what the button will display.
 * @param {string} link where the button will take the user.
 * @param {"primary" | "secondary" | "footer"} type the type of button
 * to be used or displayed.
 * @param {boolean} newTab should the link open in a new tab?
 */

const CustomButton = ({
  text,
  link,
  type,
  newTab
}: CustomButtonProps): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href={link} target={newTab ? "_blank" : "_self"} rel="noopener">
        <Button variant={type} type="button">
          {text}
        </Button>
      </Link>
    </MotionBox>
  );
};

export default CustomButton;
