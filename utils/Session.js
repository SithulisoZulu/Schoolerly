export const user = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    if(!user)
    {
        sessionStorage.clear();
        throw new Error("No User Found")
    }
    const userEmail = user.email

    return userEmail;
}
