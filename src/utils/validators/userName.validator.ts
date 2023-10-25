
enum UserNameError {
    LONG = "Username must be between 4 and 15 long!"
}

export const usernameValidator = (username: string): string | undefined => {
    if (username.trim().length < 4 || username.trim().length > 15) return UserNameError.LONG;
};