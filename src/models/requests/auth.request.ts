export type SignUpRequestDataType = {
    username: string
    email: string
    password: string
}

export type SignInRequestDataType = Omit<SignUpRequestDataType, 'email'>