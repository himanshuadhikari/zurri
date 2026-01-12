export const setAuthHeaders = (userId: string) => {
    const myheaders = new Headers();
    // Adding headers to the Headers object
    myheaders.append('x-user-id', userId);
    return myheaders;
}