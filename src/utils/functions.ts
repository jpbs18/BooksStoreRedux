export const getUserFromCookies = () => JSON.parse(document.cookie.split("access_user=")[1]);
export const getTokenFromCookies = () => JSON.parse(document.cookie.split("access_user=")[1]).token;
export const getBooksFromStorage = () => JSON.parse(localStorage.getItem("books")!);
export const getBookId = (path: string) => parseInt(path.split("/")[2]);
