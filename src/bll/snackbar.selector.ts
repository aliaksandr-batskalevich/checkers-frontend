import {RootStateType} from "./store";
import {SnackbarMessageType} from "./snackbar.reducer";


export const getSnackbarMessages = (state: RootStateType): Array<SnackbarMessageType> => state.snackbar.snackbarMessages;
