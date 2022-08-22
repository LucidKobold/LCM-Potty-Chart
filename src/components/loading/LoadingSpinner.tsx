import React from "react";
import { Spinner } from "@chakra-ui/react";

/**
 * Loading spinner to be used throughout the app.
 */

const LoadingSpinner = (): JSX.Element => {
  return (
    <Spinner
      thickness="4px"
      speed="0.50s"
      emptyColor="loading.spinnerEmptySpace"
      color="loading.spinnerColor"
      size="xl"
    />
  );
};

export default LoadingSpinner;
