import { route } from "../routers/router.js";
export const user = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    if(!user)
    {
        sessionStorage.clear();
        window.location.href = route.loginPageUrl;
        throw new Error("No User Found");
    };
    const userEmail = user.email;

    return userEmail;
};