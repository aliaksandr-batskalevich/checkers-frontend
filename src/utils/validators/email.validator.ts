import {emailRegex} from "../regEx/email.regex";

enum EmailError {
    INCORRECT = "Incorrect email!"
}

export const emailValidator = (email: string): string | undefined => {
    if (!emailRegex.test(email)) return EmailError.INCORRECT;
};