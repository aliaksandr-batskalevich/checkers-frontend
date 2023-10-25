import {
    lowerUpperCaseRegEx,
    passwordDigitSymbolContainRegEx,
    passwordLengthRegEx,
    whiteSpaceRegEx
} from "../regEx/password.regex";

enum PasswordError {
    CASES = "Must be uppercase and lowercase letters.",
    CONTAIN = "Must be latin letter, number and symbol.",
    WHITE_SPACE = "Password must not contain whitespaces.",
    LENGTH = "Password must be between 6 and 10 long.",
    QWERTY = "Can't have a qwerty with a length of 5.",
    ALPHABET = "Can't have an alph with a length of 5.",
    NUMBERS = "Can't have a numeric with a length of 5.",
}

const customSerialTest = (serial: string, long: number, str: string): boolean => {
    for (let i = 0; i < serial.length - long; i++) {
        const regExStr = serial.slice(i, i + long);
        const match = str.match(new RegExp(regExStr, 'gi'));
        if (match) return true;
    }
    return false;
};

export const passwordValidator = (password: string): string | undefined => {
    if (!passwordLengthRegEx.test(password)) return PasswordError.LENGTH;

    if (!lowerUpperCaseRegEx.test(password)) return PasswordError.CASES;

    if (!passwordDigitSymbolContainRegEx.test(password)) return PasswordError.CONTAIN;

    if (whiteSpaceRegEx.test(password)) return PasswordError.WHITE_SPACE;

    const qwertyError = customSerialTest('qwertyuiopasdfghjklzxcvbnm', 5, password);
    if (qwertyError) return PasswordError.QWERTY;

    const alphabetError = customSerialTest('abcdefghijklmnopqratuvwxyz', 5, password)
    if (alphabetError) return PasswordError.ALPHABET;

    const numbersError = customSerialTest('0123456789', 5, password)
    if (numbersError) return PasswordError.NUMBERS;
};