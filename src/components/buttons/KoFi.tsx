import React from "react";
import { Box, Link, Button, BoxProps } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MotionBox = motion<BoxProps>(Box);

/**
 * Reusable ko-fi button
 * @returns a reusable button component that links to the LCM ko-fi.
 */

const KoFi = (): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href="https://ko-fi.com/lucidcreationsmedia"
        target="_blank"
        rel="noopener"
      >
        <Button variant="kofi" leftIcon={<Icon icon="cib:ko-fi" />}>
          {"Fund The App"}
        </Button>
      </Link>
    </MotionBox>
  );
};

export default KoFi;
