export const writeAccessTokenInLS = (accessToken: string) => localStorage.setItem('accessToken', accessToken);

export const readAccessTokenInLS = () => localStorage.getItem('accessToken');

export const removeAccessTokenInLS = () => localStorage.removeItem('accessToken');