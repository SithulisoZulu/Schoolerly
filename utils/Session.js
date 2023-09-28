export const user = () => {
    const userEmail = sessionStorage.getItem("userEmail")

    return userEmail;
}