import { isBefore } from "date-fns";

interface Token {
  id: string;
  userId: string;
  token: string;
  validated: boolean;
  validatedAt?: Date;
  expires: Date;
}

interface ValidateTokenProps extends Token {
  sessionUserId: string;
}

const validateToken = ({
  validated,
  userId,
  validatedAt,
  expires,
  sessionUserId
}: ValidateTokenProps): { status: boolean | null; message: string } => {
  let flag = false;
  let message =
    "An error ocurred when checking if your account was activated. Please try again.";

  if (
    validated === undefined ||
    validatedAt === undefined ||
    expires === undefined ||
    userId === undefined
  ) {
    message =
      "Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists.";
    flag = null;
  }

  if (!validated || validatedAt === null) {
    message =
      "Account not activated. Please check your email for the activation link.";
  }

  if (userId !== sessionUserId) {
    message =
      "An error occurred when fetching your activation status. Please try again. Contact support if this issue persists.";
  }

  if (!isBefore(new Date(validatedAt), new Date(expires))) {
    message =
      "Your activation status is not valid. Please activate your account again by generating a new activation token.";
  }

  if (
    validated &&
    userId === sessionUserId &&
    isBefore(new Date(validatedAt), new Date(expires))
  ) {
    message = "Your account is activated.";
    flag = true;
  }

  return { status: flag, message: message };
};

export default validateToken;
