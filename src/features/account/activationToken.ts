import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tokenReadyToActivate from "../../../lib/activation/tokenReadyToActivate";
import fetchActivationStatus from "../../../lib/api/query/fetchActivationStatus";

interface AccountActivationToken {
  id: string;
  userId: string;
  token: string;
  validated: boolean;
  validatedAt?: Date;
  expires: Date;
}

interface ActivationTokenSlice {
  token: AccountActivationToken;
  fetching: boolean;
  fetchingErrors: {
    error: boolean;
    errorMessage: string;
    needsGen: true;
  };
  activatingToken: boolean;
  activatingErrors: {
    error: boolean;
    errorMessage: string;
    canRegn: boolean;
  };
  regeneratingToken: boolean;
  regenErrors: {
    error: boolean;
    errorMessage: string;
  };
}

const initialState: ActivationTokenSlice = {} as ActivationTokenSlice;

const accountActivationStatusSlice = createSlice({
  name: "Activation Token",
  initialState,
  reducers: {
    fetchToken(state: ActivationTokenSlice, actions: PayloadAction<string>) {
      state.fetching = true;

      const id = actions.payload;

      fetchActivationStatus
        .withUserId(id)
        .then((res) => {
          const token: AccountActivationToken =
            res.data.getVerificationWithUserId;

          state.token = token;

          state.fetching = false;
        })
        .catch((err) => {
          state.fetching = false;
          state.fetchingErrors.error = true;
          state.fetchingErrors.errorMessage = err;
          console.error(err);
        });
    },
    activateToken(state: ActivationTokenSlice, actions: PayloadAction<string>) {
      const { userId, providedToken } = JSON.parse(actions.payload);

      if (state.token.id !== "") {
        state.activatingToken = true;

        const status = tokenReadyToActivate(userId, state.token, providedToken);

        if (status.ready) {
          // TODO: Activate token here.
          state.activatingToken = false;
        } else if (!status.ready && status.error.validated) {
          state.activatingToken = false;
        } else {
          state.activatingToken = false;
          state.activatingErrors.error = status.error.error;
          state.activatingErrors.errorMessage = status.error.errorMessage;
          state.activatingErrors.canRegn = status.error.needRegenerate;
        }
      }
    },
    regenToken(state: ActivationTokenSlice, actions: PayloadAction<string>) {
      //
    },
    genToken(state: ActivationTokenSlice, actions: PayloadAction<string>) {
      //
    }
  }
});

export const { fetchToken, activateToken, regenToken, genToken } =
  accountActivationStatusSlice.actions;
export default accountActivationStatusSlice.reducer;
